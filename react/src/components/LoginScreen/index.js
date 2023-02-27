import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './index.css';

const LoginScreen = (props) => {
  const {
    Header,
    Description,
    EmailLabel,
    EmailPlaceholder,
    PasswordLabel,
    PasswordPlaceholder,
    LoginCTA,
    EmailRegex,
  } = props.fields;
  const history = useHistory();
  const [emailError, setEmailError] = useState('');
  const [emailErrorFlag, setEmailErrorFlag] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordErrorFlag, setPasswordErrorFlag] = useState(false);
  const [apiError, setApiError] = useState('');

  function emailValidation(target) {
    if (target.value === '') {
      setEmailError('Please enter the email address');
      setEmailErrorFlag(false);
    } else if (!target.value.match(EmailRegex)) {
      setEmailError('Enter email id doesnot matches the required regex');
      setEmailErrorFlag(false);
    } else {
      setEmailError('');
      setEmailErrorFlag(true);
    }
  }

  function passwordValidation(target) {
    if (target.value === '') {
      setPasswordError('Please enter the password');
      setPasswordErrorFlag(false);
    } else {
      setPasswordError('');
      setPasswordErrorFlag(true);
    }
  }

  const submitAPI = async (username, password) => {
    try {
      const response = await axios.get(
        'https://run.mocky.io/v3/0eae6936-e61c-4894-a3e5-7a01d737123d'
      );

      const filteredUsers = response.data.filter(
        (user) =>
          user.email.toLowerCase() === username.toLowerCase() &&
          user.password.toLowerCase() === password.toLowerCase()
      );

      if (filteredUsers.length !== 0) {
        history.push('/WelcomeScreen', { userData: filteredUsers });
        setApiError('');
        localStorage.setItem('userData', JSON.stringify(filteredUsers));
        document.cookie = 'loginState=true';
      } else {
        setApiError('The login credentionals are not matching with our database');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onBlurHandler = (e) => {
    e.preventDefault();
    if (e.target.id === 'username') {
      emailValidation(e.target);
    }

    if (e.target.id === 'password') {
      passwordValidation(e.target);
    }
  };

  const onChangeHandler = (e) => {
    e.preventDefault();
    emailValidation(e.target);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    emailValidation(document.getElementById('username'));
    passwordValidation(document.getElementById('password'));

    if (emailErrorFlag && passwordErrorFlag) {
      submitAPI(
        document.getElementById('username').value,
        document.getElementById('password').value
      );
    }
  };

  useEffect(() => {
    localStorage.clear();
    document.cookie = 'loginState=false';
  }, []);

  return (
    <React.Fragment>
      {console.log(props.fields)}
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form onSubmit={onSubmitHandler} noValidate>
        <h3 className="text-left">{Header.value}</h3>
        <p className="text-left">{parse(Description.value)}</p>

        <label htmlFor="username">{EmailLabel.value}</label>
        <input
          type="text"
          placeholder={EmailPlaceholder.value}
          onBlur={onBlurHandler}
          onChange={onChangeHandler}
          id="username"
          autoComplete="off"
        />
        {!!emailError && <p className="error">{emailError}</p>}

        <label htmlFor="password">{PasswordLabel.value}</label>
        <input
          type="password"
          placeholder={PasswordPlaceholder.value}
          id="password"
          onBlur={onBlurHandler}
          autoComplete="off"
        />
        {!!passwordError && <p className="error">{passwordError}</p>}

        <button className="margin-top-60" onClick={onSubmitHandler}>
          {LoginCTA.value}
        </button>
        {!!apiError && <p className="error">{apiError}</p>}
      </form>
    </React.Fragment>
  );
};

export default LoginScreen;
