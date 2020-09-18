import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { selectAuthToken } from 'app/containers/client/LoginPage/selectors';
function PublicRoute(props) {
  // const auth = useSelector(selectAuthToken);
  // const token = auth.authToken.accessToken;
  const auth = localStorage.getItem('access-token')
  console.log(props)
  console.log(auth)
  return (
    <>
      <Route
        // {...rest}
        exact
        path={props.path}
        component={prop =>
          auth ? (
            <>
              <Redirect to="/" />
            </>
          ) : (
              <props.Component {...prop} />
            )
        }
      />
    </>
  );
}

export default PublicRoute;