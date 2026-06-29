import React from "react";

/**
 * App-wide error boundary.
 *
 * Without one, any render-time exception unmounts the whole React tree and
 * leaves the user staring at the app's black background — exactly the
 * "shows the teams for a second then turns black" bug reported via Feedback,
 * which reproduced on one device but not another (i.e. a browser-specific
 * throw with no safety net). Catching it here turns a dead black screen into
 * a recoverable message + reset button instead.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Surface it in the console / Vercel logs for debugging. Kept lightweight
    // on purpose — no external error service wired up yet.
    console.error("Draft crashed:", error, info?.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-full w-full flex flex-col items-center justify-center text-white text-center p-8 gap-4">
          <h1 className="text-4xl font-serif">Something went wrong</h1>
          <p className="max-w-md opacity-80">
            The draft hit a snag on this device. Your picks weren&apos;t saved —
            start a fresh one.
          </p>
          <a
            href="/qplay"
            onClick={this.handleReset}
            className="bg-white text-black rounded-2xl p-4 px-8 text-xl mt-2"
          >
            START OVER
          </a>
        </div>
      );
    }

    return this.props.children;
  }
}
