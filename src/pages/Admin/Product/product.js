import { NavLink } from 'react-router-dom';

export const Product = () => (
  <React.Fragment >
    <p>Account was successfully created.</p>
    <p>Now you can use your email and password to login into profile.</p>
    <NavLink to="/login" className="" >
        Go to Login Page
      </NavLink>
  </React.Fragment>
);

