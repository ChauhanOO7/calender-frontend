import React from 'react';

const GoogleSignIn = ({ setAccessToken }) => {
  const handleSignIn = () => {
    const CLIENT_ID = "990326492176-54dccm0d9dsnv9oh377tphrs4ebe2st6.apps.googleusercontent.com";
    const REDIRECT_URI = "http://localhost:5000/auth/google/callback";
    const SCOPE = 'https://www.googleapis.com/auth/calendar.events + https://www.googleapis.com/auth/calendar';

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&access_type=offline&include_granted_scopes=true&response_type=code&scope=${SCOPE}`;
    window.location.href = authUrl;
  };

  return (
    <div className="signin-container">
      <button className="google-signin-button" onClick={handleSignIn}>
        Sign in with Google
      </button>
    </div>
  );
};

export default GoogleSignIn;
