# check-phase0-branch.ps1
# Checks whether agent/adopt-source-archive was repaired correctly after the
# "unrelated histories" PR creation failure.

$ErrorActionPreference = "Stop"

$Repo = "keepithandy/DungeonDex3D"
$Branch = "agent/adopt-source-archive"
$Base = "origin/main"
$RemoteBranch = "origin/$Branch"

function Step($msg) {
  Write-Host ""
  Write-Host "== $msg ==" -ForegroundColor Cyan
}

function Pass($msg) {
  Write-Host "PASS: $msg" -ForegroundColor Green
}

function Warn($msg) {
  Write-Host "WARN: $msg" -ForegroundColor Yellow
}

function Fail($msg) {
  Write-Host "FAIL: $msg" -ForegroundColor Red
  $script:Failed = $true
}

$Failed = $false

Step "Repo check"
try {
  git rev-parse --is-inside-work-tree | Out-Null
  Pass "Inside a git repo"
} catch {
  Fail "Not inside a git repo. Run this from C:\Users\quali\Documents\DungeonDex3D"
  exit 1
}

$Top = git rev-parse --show-toplevel
Write-Host "Repo root: $Top"

Step "Remote check"
$RemoteUrl = git remote get-url origin
Write-Host "origin: $RemoteUrl"

if ($RemoteUrl -match "DungeonDex3D") {
  Pass "origin appears to be DungeonDex3D"
} else {
  Warn "origin does not obviously look like DungeonDex3D"
}

Step "Fetch latest refs"
git fetch origin --prune

Step "Branch existence"
$LocalBranchExists = git show-ref --verify --quiet "refs/heads/$Branch"; $LocalBranchExit = $LASTEXITCODE
$RemoteBranchExists = git show-ref --verify --quiet "refs/remotes/origin/$Branch"; $RemoteBranchExit = $LASTEXITCODE

if ($LocalBranchExit -eq 0) {
  Pass "Local branch exists: $Branch"
} else {
  Fail "Missing local branch: $Branch"
}

if ($RemoteBranchExit -eq 0) {
  Pass "Remote branch exists: $RemoteBranch"
} else {
  Fail "Missing remote branch: $RemoteBranch. Push with: git push -u origin $Branch"
}

Step "Current branch"
$CurrentBranch = git branch --show-current
Write-Host "Current branch: $CurrentBranch"

if ($CurrentBranch -eq $Branch) {
  Pass "Currently on $Branch"
} else {
  Warn "You are not on $Branch. That is okay for inspection, but switch there before fixing/pushing."
}

Step "Working tree cleanliness"
$Status = git status --porcelain
if ([string]::IsNullOrWhiteSpace($Status)) {
  Pass "Working tree is clean"
} else {
  Warn "Working tree has uncommitted changes:"
  git status -sb
}

Step "Common history check"
git merge-base --is-ancestor $Base $Branch
$AncestorExit = $LASTEXITCODE

if ($AncestorExit -eq 0) {
  Pass "$Branch contains $Base history. PR should no longer fail with unrelated histories."
} else {
  Fail "$Branch does not contain $Base history. Run: git switch $Branch; git merge origin/main --allow-unrelated-histories"
}

Step "Merge-base visibility"
$MergeBase = git merge-base $Base $Branch
if ($LASTEXITCODE -eq 0 -and $MergeBase) {
  Pass "Common ancestor exists: $MergeBase"
} else {
  Fail "No common ancestor found between $Base and $Branch"
}

Step "Ahead/behind check"
$Counts = git rev-list --left-right --count "$Base...$Branch"
Write-Host "$Base...$Branch = $Counts"
$Parts = $Counts -split "\s+"
$BehindBase = [int]$Parts[0]
$AheadBase = [int]$Parts[1]

Write-Host "$Branch is ahead of $Base by $AheadBase commit(s)"
Write-Host "$Branch is behind $Base by $BehindBase commit(s)"

if ($AheadBase -gt 0) {
  Pass "$Branch has changes to PR into main"
} else {
  Fail "$Branch has no changes ahead of main"
}

if ($BehindBase -eq 0) {
  Pass "$Branch includes latest origin/main"
} else {
  Warn "$Branch is behind origin/main by $BehindBase commit(s). Consider merging origin/main again before PR."
}

Step "Expected commit check"
$ContainsPhase0 = git branch --contains 726f49a --format "%(refname:short)"
if ($ContainsPhase0 -match $Branch) {
  Pass "$Branch contains Phase 0 commit 726f49a"
} else {
  Fail "$Branch does not contain Phase 0 commit 726f49a"
}

Step "Expected files check"
$ExpectedFiles = @(
  "package.json",
  "src",
  "public",
  "README.md",
  ".gitignore",
  "docs/source-adoption-checklist.md"
)

foreach ($Path in $ExpectedFiles) {
  if (Test-Path $Path) {
    Pass "Found $Path"
  } else {
    Fail "Missing expected path: $Path"
  }
}

Step "Forbidden files/folders check"
$ForbiddenPaths = @(
  "node_modules",
  "dist",
  "build",
  ".vite",
  "extracted-archive"
)

foreach ($Path in $ForbiddenPaths) {
  if (Test-Path $Path) {
    Warn "Local path exists: $Path. This is okay locally only if not tracked."
    $Tracked = git ls-files $Path
    if ([string]::IsNullOrWhiteSpace($Tracked)) {
      Pass "$Path is not tracked"
    } else {
      Fail "$Path appears to be tracked:"
      Write-Host $Tracked
    }
  } else {
    Pass "$Path not present locally"
  }
}

Step "Archive tracking check"
$ArchiveTracked = git ls-files "dungeonDex-3D.tar.gz"
if ([string]::IsNullOrWhiteSpace($ArchiveTracked)) {
  Pass "Archive is not tracked in this branch"
} else {
  Warn "Archive is tracked: $ArchiveTracked"
  Write-Host "This may be okay only if it was already intentionally tracked. Do not delete it in Phase 0 unless verified."
}

Step "Diff summary versus main"
git diff --stat "$Base...$Branch"

Step "Files changed versus main"
git diff --name-status "$Base...$Branch"

Step "PR readiness verdict"
if ($Failed) {
  Write-Host ""
  Write-Host "RESULT: NOT READY" -ForegroundColor Red
  Write-Host "Fix the failures above before creating the PR."
  exit 1
} else {
  Write-Host ""
  Write-Host "RESULT: READY FOR PR REVIEW" -ForegroundColor Green
  Write-Host "The branch has common history with origin/main and contains Phase 0 changes."
  Write-Host ""
  Write-Host "Next command if you want to push repaired branch:"
  Write-Host "git push origin $Branch"
}