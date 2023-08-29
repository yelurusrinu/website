import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../lib/UserContext';
import { useRouter } from 'next/router';
import { magic } from '../../lib/magic';
import { RPCError, RPCErrorCode } from 'magic-sdk';
import { Box, Button, Divider, Grid, Input, Typography } from '@mui/material';

export default function Login() {
    const [user, setUser] = useContext(UserContext);
    const [email, setEmail] = useState('');
    // Create our router
    const router = useRouter();

    // Make sure to add useEffect to your imports at the top
    useEffect(() => {
        // Check for an issuer on our user object. If it exists, route them to the dashboard.
        user?.issuer && router.push('/');
    }, [user]);

    const handleLogin = async (e) => {
        e.preventDefault();

        // Log in using our email with Magic and store the returned DID token in a variable
        try {

            magic?.preload().then(() => console.log('Magic <iframe> loaded.', magic));
            //loginWithMagicLink
            // const didToken = await magic.auth.loginWithMagicLink({
            //     email: email, showUI: false
            // });
            // console.log(didToken);

            const didToken = await magic.auth.loginWithEmailOTP({ email: email });
            console.log(didToken);

            // Send this token to our validation endpoint
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${didToken}`,
                },
            });

            // If successful, update our user state with their metadata and route to the dashboard
            if (res.ok) {
                const userMetadata = await magic.user.getMetadata();
                setUser(userMetadata);
                router.push('/');
            }
        } catch (err) {
            console.error(err);
            if (err instanceof RPCError) {
                switch (err.code) {
                    case RPCErrorCode.MagicLinkFailedVerification:
                    case RPCErrorCode.MagicLinkExpired:
                    case RPCErrorCode.MagicLinkRateLimited:
                    case RPCErrorCode.UserAlreadyLoggedIn:
                        console.error('switch error ', err);
                        break;
                }
            }
        }
    };

    return (

        <div style={{
            width: '100%',
            height: '100vh',
            background: '#fff',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden'
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                width: '100%',
                color: '#000'
            }}>


                <form onSubmit={handleLogin} style={{
                    margin: '0 auto',
                    display: 'flex',
                    width: '370px',
                    flexDirection: 'column',
                    padding: '30px',
                    textAlign: 'center',
                    background: 'transparent',
                    zIndex: 1
                }}>
                    <h1 style={{ margin: '12px 0px 40px' }}>Welcome Calender Schuduler</h1>

                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1 },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <Input placeholder="Email" name="email" type="email" fullWidth color="secondary"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </Box>
                    <Button type="submit" variant="outlined" style={{margin: "30px"}}>Send Magic Otp</Button>
                </form>


            </div>
        </div>
    );
}