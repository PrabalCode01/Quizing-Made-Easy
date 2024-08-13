import { GoogleLogin } from '@leecheuk/react-google-login'


const clientId = "1028790661771-bqdid78iblvjuu5ikrul2h6d411ukh3k.apps.googleusercontent.com";

function Login() {


    const onSuccess = (res) => {
        console.log("Login Success", res.profileObj);
    }

    const onFailure = (res) => {
        console.log("Login Failed", res);
    }

    return (

        <div id='signInButton'>

            <GoogleLogin
                clientId={clientId}
                buttonText={"Login"}
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy='single_host_origin'
                isSignedIn={true}

            />

        </div>


    )

}


export default Login;