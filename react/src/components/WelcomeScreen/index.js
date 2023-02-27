import React from 'react';
import parse from 'html-react-parser';
import { useHistory, useLocation } from 'react-router-dom';

const WelcomeScreen = (props) => {
  console.log(props);
  let newHeader;
  const { Header, Description } = props.fields;
  const history = useHistory();
  const location = useLocation();
  if (location?.state) {
    const { firstName, lastName, isSuperUser } = location?.state?.userData[0];
    newHeader = Header.value.replace(/{username}/g, firstName + ' ' + lastName);
  }

  const redirect = () => {
    history.push('/');
  };

  return (
    <>
      {document.cookie.split('=')[1] === 'true' || document.cookie.split('=')[1] !== 'false' ? (
        <div>
          <div className="background">
            <div className="shape"></div>
            <div className="shape"></div>
          </div>
          <div className="custom-card">
            <h3 className="text-left">{newHeader}</h3>
            <p className="text-left">{parse(Description.value)}</p>
          </div>
        </div>
      ) : (
        redirect()
      )}
    </>
  );
};

export default WelcomeScreen;
