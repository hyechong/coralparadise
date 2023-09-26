import React from 'react';
import { GoogleLogin } from 'react-google-login';

const clientId = process.env.REACT_APP_CLIENT_ID;

const Login = () => {
  const onSuccess = (res) => {
    console.log('[Login Success] currentUser:', res.profileObj);
    // setProfileObj(res.profileObj);
  };

  const onFailure = (res) => {
    console.log('[Login Failed] res:', res);
  };

  return (
    <div id='signInButton'>
      <GoogleLogin
        clientId={clientId}
        buttonText='로그인'
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </div>
  );
};

export default Login;
