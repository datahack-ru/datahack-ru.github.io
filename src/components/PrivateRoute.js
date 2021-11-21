import React from 'react';
import { Redirect, Route } from 'react-router';
import { useSelector } from 'react-redux';
import * as S from '../store/selectors';



function PrivateRoute({ children, ...rest }) {
  const isAuthenticated = useSelector((state) => S.profile.isAuthenticated(state));

  return (
    <Route
      {...rest}
      render={({ location, }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location, },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
