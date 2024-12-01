const isLoggedIn = true;

function LoginMessage() {
    return (
        <div>
            {isLoggedIn ? <p>Welcome</p> : <p>Please sign in.</p>}
        </div>
    );
}