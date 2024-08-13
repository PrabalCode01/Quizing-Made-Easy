import { GoogleLogout } from '@leecheuk/react-google-login';

const clientId = "1028790661771-bqdid78iblvjuu5ikrul2h6d411ukh3k.apps.googleusercontent.com";

function Logout({ onLogout }) {

    const onSuccess = () => {
        console.log("Logout Success");
        const auth2 = window.gapi.auth2.getAuthInstance();
        auth2.disconnect(); // Revoke the token
        onLogout(); // Custom function to handle state reset
    }

    return (
        <div id='signOutButton'>
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
            />
        </div>
    )
}

export default Logout;
