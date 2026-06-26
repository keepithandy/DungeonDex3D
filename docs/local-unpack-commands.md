# Local Archive Unpack Commands

Use this when extracting `dungeonDex-3D.tar.gz` from a local clone on Windows PowerShell.

## From the repo root

```powershell
# Create a temporary extraction folder
New-Item -ItemType Directory -Force -Path .\extracted-archive

# Extract the archive
tar -xzf .\dungeonDex-3D.tar.gz -C .\extracted-archive

# Show the top-level extracted files
Get-ChildItem .\extracted-archive

# Show the full extracted tree
Get-ChildItem .\extracted-archive -Recurse | Select-Object FullName
```

## What to look for

```powershell
Get-ChildItem .\extracted-archive -Recurse -Filter package.json
Get-ChildItem .\extracted-archive -Recurse -Filter index.html
Get-ChildItem .\extracted-archive -Recurse -Directory -Filter src
Get-ChildItem .\extracted-archive -Recurse -Directory -Filter public
```

## If the extracted app has package.json

Move into the folder containing `package.json`, then try:

```powershell
npm install
npm run dev
npm run build
```

Only commit the extracted source after confirming where the real app root is.
