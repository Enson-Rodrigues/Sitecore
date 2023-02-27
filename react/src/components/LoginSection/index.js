import React from 'react';
import { Text } from '@sitecore-jss/sitecore-jss-react';

const LoginSection = (props) => (
  <div>
    <p>LoginSection Component</p>
    <Text field={props.fields.heading} />
  </div>
);

export default LoginSection;
