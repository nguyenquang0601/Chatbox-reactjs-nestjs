import React, { useRef } from 'react'
import '../Join/join.css'
import { GoogleLogin } from 'react-google-login'
// import FacebookLogin from 'react-facebook-login'
import { Link, withRouter, useHistory } from 'react-router-dom'
import axios from 'axios'
// import { stringify } from 'query-string'
// import { createBrowserHistory } from "history";
import { actions } from '../../store/slice/auth'
import { useDispatch } from 'react-redux'
// import history from '../../utils/history'
const Login = () => {
  const history = useHistory()
  const usernameRef = useRef()
  const passwordRef = useRef()
  const dispatch = useDispatch()
  const handleLogin = (e) => {
    e.preventDefault()
    let input = {
      username: usernameRef.current.value,
      password: passwordRef.current.value
    }
    axios.post('http://localhost:3000/login', input).then(res => {
      localStorage.setItem('access-token', res.data)
      dispatch(actions.Login(input.username))
      history.push('/room')
    })
  }
  const handleRegister = (e) => {
    let input = {
      username: usernameRef.current.value,
      password: passwordRef.current.value
    }
    e.preventDefault()
    axios.post('http://localhost:3000/register', input).then(res => {
      console.log(res)
    })
  }
  const loginwithGoogle = (res) => {
    console.log(res)
    const input = {
      email: res.profileObj.email
    }
    axios.post('http://localhost:3000/loginGoogle', input).then(res => {
      localStorage.setItem('access-token', res.data)
      dispatch(actions.Login(input.email))
      history.push('/room')
    })

  }
  return (
    <>
      <div className="joinOuterContainer">
        <div className="joinInner">
          <h1 className="heading">Login</h1>
          <div><input placeholder="Username" className="joinInput" ref={usernameRef} type="text" /></div>
          <div><input placeholder="Password" className="joinInput mt-20" ref={passwordRef} type="password" /></div>
          <Link onClick={(e) => handleLogin(e)} to={`chat?name=$&room=$`}>
            <button className="button2 mt-20" type="submit">Sing In</button></Link>
          <Link onClick={(e) => handleRegister(e)} to={`chat?name=$&room=$`}>
            <button className="button2 mt-20" type="submit">register</button></Link>

          <div style={{ margin: '20px' }}>
            <div style={{ margin: '20px' }} >
              <GoogleLogin
                clientId="578146149385-2dppsmneu3q8sdgi1qhdv2u36s56of8m.apps.googleusercontent.com"
                buttonText="Sing in with Google"
                onSuccess={(res) => loginwithGoogle(res)}
                onFailure={(res) => console.log(res)}
                // isSignedIn={true}
                cookiePolicy={'single_host_origin'}
              />
            </div>
            <div>
              {/* <FacebookLogin
                appId="267947134184871"
                // autoLoad={false}
                fields="name,email,picture"
              // callback={(res) => setFacebook(JSON.stringify(res))}
              /> */}
            </div>
          </div>
        </div>

      </div>


      {/* </div> */}
    </>
  )

}
export default withRouter(Login)
