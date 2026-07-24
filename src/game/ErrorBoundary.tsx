import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("DungeonDex3D scene error", error, info.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div style={{ position: "fixed", inset: 0, display: "grid", placeItems: "center", background: "#08000f", color: "#ffbbcc", fontFamily: "'Courier New', monospace", padding: 24, textAlign: "center" }}>
        <div>
          <h1 style={{ margin: "0 0 12px" }}>SCENE COULD NOT LOAD</h1>
          <p style={{ maxWidth: 720, overflowWrap: "anywhere" }}>{this.state.error.message || "Unknown scene resource failure"}</p>
          <button onClick={() => window.location.reload()} style={{ marginTop: 16, padding: "10px 18px", cursor: "pointer" }}>RELOAD ALPHA</button>
        </div>
      </div>
    );
  }
}
