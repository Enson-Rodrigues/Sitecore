import React from 'react';
import parse from 'html-react-parser';
import { useHistory, useLocation } from 'react-router-dom';

const ManageUsers = (props) => {
  const { Header, Description } = props.fields;
  const history = useHistory();
  const redirect = () => {
    history.push('/');
  };

  return (
    <>
      {document.cookie.split('=')[1] === 'true' || document.cookie.split('=')[1] !== 'false' ? (
        <>
          <div className="background">
            <div className="shape"></div>
            <div className="shape"></div>
          </div>
          <div className="custom-card">
            <h3 className="text-left">{Header.value}</h3>
            <p className="text-left">{parse(Description.value)}</p>
          </div>
        </>
      ) : (
        redirect()
      )}
    </>
  );
};

export default ManageUsers;
