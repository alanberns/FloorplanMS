import { Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button variant="secondary" className="ms-auto" onClick={() => loginWithRedirect()}>Log In</Button>;
};

export default LoginButton;

const LogoutButton = () => {
  const { logout } = useAuth0();

  return <Button variant="secondary" className="mx-2" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log Out</Button>;
};

export { LoginButton, LogoutButton };
