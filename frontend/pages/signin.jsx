import { useState } from 'react';
import styled from 'styled-components';
import RequestReset from '../components/RequestReset';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

const GridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

const SignInPage = () => {
  const [showReset, setShowReset] = useState(false);
  return (
    <GridStyles>
      {showReset ? <RequestReset /> : <SignIn setShowReset={setShowReset} />}
      <SignUp />
    </GridStyles>
  );
};

export default SignInPage;
