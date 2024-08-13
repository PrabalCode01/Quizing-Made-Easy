import React from 'react'
import Login from './Login';
import Logout from './Logout';
import {gapi} from 'gapi-script'

const Auth = () => {
  return (
    <div className='text-center'>

       <Login/>
       <br />
       <Logout/>
       {/* <h1>hello</h1> */}

      
    </div>
  )
}

export default Auth
