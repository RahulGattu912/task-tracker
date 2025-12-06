import React from "react";

/**
 * LoginCard: modern card with Cognito login redirect.
 * Replace env variables in .env (Vite: VITE_ prefixed variables)
 *
 * VITE_COGNITO_DOMAIN: e.g. your-domain.auth.region.amazoncognito.com
 * VITE_COGNITO_CLIENT_ID: your App client id
 * VITE_REDIRECT_URI: your S3 site (or http://localhost:5173 for dev)
 */

const COGNITO_DOMAIN = import.meta.env.VITE_COGNITO_DOMAIN;
const CLIENT_ID = import.meta.env.VITE_COGNITO_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

function buildLoginUrl() {
  const domain = COGNITO_DOMAIN.replace(/^https?:\/\//, "");
  const base = `https://${domain}/login`;
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: "token", // implicit; for production prefer authorization code flow with backend
    redirect_uri: REDIRECT_URI,
  });
  return `${base}?${params.toString()}`;
}

export default function LoginCard() {
  const login = () => {
    window.location.href = buildLoginUrl();
  };

  return (
    <div className="card login-card">
      <div className="card-left">
        <h2>Welcome</h2>
        <p className="muted">
          Sign in to manage your tasks. We use AWS Cognito Hosted UI for
          authentication.
        </p>

        <div className="login-actions">
          <button className="primary" onClick={login}>
            Login with Cognito
          </button>
        </div>

        <p className="caption">
          For local dev set <code>VITE_REDIRECT_URI=http://localhost:5173</code>
        </p>
      </div>

      <div className="card-right">
        <svg width="140" viewBox="0 0 64 64" aria-hidden>
          <rect
            x="2"
            y="10"
            width="60"
            height="44"
            rx="6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="16" cy="24" r="2" fill="currentColor" />
          <path
            d="M20 28h24M20 34h24M20 40h12"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
