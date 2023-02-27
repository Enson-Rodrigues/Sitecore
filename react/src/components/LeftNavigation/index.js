import React from 'react';
import { useLocation } from 'react-router-dom';
import './index.css';

const LeftNavigation = (props) => {
  const location = useLocation();
  const isSuperUser =
    localStorage.getItem('userData') &&
    JSON.parse(localStorage.getItem('userData'))[0]?.isSuperUser;

  return (
    <>
      {document.cookie.split('=')[1] === 'true' && (
        <div className="leftNavigation">
          {!isSuperUser && <h4 className="cantAccess">Can&apos;t Access</h4>}
          {props.fields.data.item.children.results
            .filter(function (target) {
              return target?.showInNavigation?.value === true;
            })
            .map(function (target) {
              return (
                <>
                  <p
                    className={
                      ('/' + target.name === location.pathname ? 'selected' : '') +
                      (!isSuperUser ? ' noClick' : '')
                    }
                  >
                    <a href={'/' + target.name}>{target.name}</a>
                  </p>
                </>
              );
            })}
        </div>
      )}
    </>
  );
};

export default LeftNavigation;
