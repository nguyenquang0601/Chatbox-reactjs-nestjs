import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { sliceKey as KeyMess, actions as actionsMess, reducer as MessReducer } from '../store/slice/messages';
import { sliceKey as authKey, reducer as AuthReducer, actions } from '../store/slice/auth';
import history from '../utils/history';
import { RoutersAuth, NoAuth } from '../constants/router';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuth } from '../store/seletor/authSelector';
import { authSaga } from '../store/saga/authSaga';
import { selectSocket } from '../store/seletor/socketSeletor';
import { messageSaga } from '../store/saga/messageSaga';

const components = {}
for (const c of RoutersAuth) {
  components[c.component] = React.lazy(() => import(`../pages/${c.component}`))
}
for (const c of NoAuth) {
  components[c.component] = React.lazy(() => import(`../pages/${c.component}`))
}

function AppComponents() {
  useInjectReducer({ key: KeyMess, reducer: MessReducer })
  useInjectReducer({ key: authKey, reducer: AuthReducer })
  useInjectSaga({ key: authKey, saga: authSaga })
  useInjectSaga({ key: KeyMess, saga: messageSaga })
  const dispatch = useDispatch()
  const auth = useSelector(checkAuth)
  const socket = useSelector(selectSocket)
  useEffect(() => {
    if (auth) {
      dispatch(actions.loadPage(null))
    }
    // eslint-disable-next-line
  }, [auth])
  useEffect(() => {
    socket.on('loadingMessages', messagesInRoom => {
      dispatch(actionsMess.loadingMessages({
        id: messagesInRoom.idRoom,
        messages: [...messagesInRoom.messages]
      }))
    })
    // eslint-disable-next-line
  }, [])
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
                  {/* <Component /> */}
                </React.Suspense>
              )
            }}
          />
        ))}
        {auth ? (RoutersAuth.map((route, idx) => (
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
        ) : (
            <Redirect to='/login' />
          )
        }
        <Redirect to='/' />
      </Switch>
      * </Router >
  );
}

export default AppComponents
