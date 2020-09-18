import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
// import Join from './Join';
// import Chat from './Chat/Chat';
import { useInjectReducer } from 'redux-injectors';
import { sliceKey as KeyMess, reducer as MessReducer } from '../store/slice/messages';
import Login from './Login';
import PublicRoute from '../components/PublicRouter';
import PrivateRouter from '../components/PriveRouter';
import { sliceKey as authKey, reducer as AuthReducer } from '../store/slice/auth';
import history from '../utils/history';
import { RoutersAuth, NoAuth } from '../constants/router';
import { useSelector } from 'react-redux';
import { actions } from '../store/slice/socket';
import { checkAuth } from '../store/seletor/authSelector';
import { sliceKey as socketKey, reducer as socketReducer } from '../store/slice/socket';

const components = {}
for (const c of RoutersAuth) {
  components[c.component] = React.lazy(() => import(`../pages/${c.component}`))
}
for (const c of NoAuth) {
  components[c.component] = React.lazy(() => import(`../pages/${c.component}`))
}

function AppComponents() {
  useInjectReducer({ key: KeyMess, reducer: MessReducer })
  // useInjectReducer({ key: socketKey, reducer: socketReducer })
  useInjectReducer({ key: authKey, reducer: AuthReducer })
  const auth = useSelector(checkAuth)
  return (

    <Router history={history}>

      <Switch>
        {NoAuth.map((route, idx) => (
          <Route
            key={idx}
            exact={route.exact}
            path={route.path}
            render={() => {
              const Component = components[route.component]
              return (
                <React.Suspense fallback={null}>
                  {auth ? <Redirect to='/' /> : <Component />}
                </React.Suspense>
              )
            }}
          />
        ))}
        {auth ? (
          RoutersAuth.map((route, idx) => (
            <Route
              key={idx}
              exact={route.exact}
              path={route.path}
              render={() => {
                const Component = components[route.component]
                return (
                  <React.Suspense fallback={null}>
                    <Component
                      history={history}
                    />
                  </React.Suspense>
                )
              }}
            />
          ))
          // </div>
        ) : (
            <Redirect to='/login' />
          )}
        <Redirect to='/' />
      </Switch>
      {/* </React.Suspense> */}
    </Router >
  );
}

export default AppComponents
