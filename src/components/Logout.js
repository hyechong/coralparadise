import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId = process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID;

const Logout = () => {
  const onSuccess = () => {
    console.log('Logout made successfully');
    // alert('로그아웃 되었습니다.');
    window.location.reload();
  };

  return (
    <div id='signOutButton'>
      <GoogleLogout
        clientId={clientId}
        buttonText={'로그아웃'}
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
};

export default Logout;
