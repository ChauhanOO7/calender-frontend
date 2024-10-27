import React, { useEffect, useState } from 'react';
import GoogleSignIn from './components/GoogleSignIn';
import EventCreation from './components/EventCreation';
import './App.css';

const App = () => {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('token');
    if (accessToken) {
      setAccessToken(accessToken);
    }
  }, []);

  return (
    <div className="app-container">
      <h1>Google Calendar Integration</h1>
      {!accessToken ? (
        <GoogleSignIn setAccessToken={setAccessToken} />
      ) : (
        <EventCreation accessToken={accessToken} />
      )}
    </div>
  );
};

export default App;
