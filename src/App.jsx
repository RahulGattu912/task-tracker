import React, { useEffect, useState } from "react";
import LoginCard from "./components/LoginCard";
import TaskList from "./components/TaskList";

/**
 * If the app is opened with a hash token from Cognito (implicit flow),
 * you could parse it here and set an "authenticated" flag.
 */

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simple check for presence of an access_token in hash (after redirect)
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.includes("access_token")) {
      // Example: parse token (not secure handling; for demo only)
      setIsAuthenticated(true);
      // Optionally clear hash
      // window.location.hash = "";
    }
  }, []);

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Task Tracker</h1>
      </header>

      <main className="app-main">
        {!isAuthenticated && <LoginCard />}

        {/* If authenticated, show task list */}
        {isAuthenticated && <TaskList />}
      </main>

      <footer className="app-footer">
        <p>Built with React</p>
      </footer>
    </div>
  );
}
