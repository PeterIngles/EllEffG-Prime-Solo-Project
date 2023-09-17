import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import LoginForm from '../LoginForm/LoginForm';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Looking for group, when the group is always busy');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h2>{heading}</h2>

      <div className="grid">
        <div className="grid-col grid-col_8">
        <img
  src="/images/eLL-eFF-G.png"
  alt="Description of the image"
/>
        </div>
        <div className="grid-col grid-col_3">
          <LoginForm />

          <center>
            <button
              type="button"
              className="btn btn_asLink"
              onClick={() => {
                history.push('/registration');
              }}
            >
              Register
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;