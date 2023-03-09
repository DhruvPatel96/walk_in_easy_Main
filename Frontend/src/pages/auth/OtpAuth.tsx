import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import 'firebase/firestore';
import '../../otp.css';
import React, { useEffect } from 'react';
import { Button } from 'flowbite-react';
declare global {
    interface Window {
        recaptchaVerifier: firebase.auth.RecaptchaVerifier | undefined;
        confirmationResult: firebase.auth.ConfirmationResult | undefined;
    }
}

function OTPAuth() {
    useEffect(() => {
        const renderRecaptcha = async () => {
            const recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
                'recaptcha-container',
                {
                    size: 'normal',
                }
            );
            window.recaptchaVerifier = recaptchaVerifier;
            await recaptchaVerifier.render();
        };
        renderRecaptcha();
    }, []);

    const phoneAuth = async (): Promise<void> => {
        const number: string = (
            document.getElementById('number') as HTMLInputElement
        ).value;
        console.log(number);

        try {
            const confirmationResult = await firebase
                .auth()
                .signInWithPhoneNumber(number, window.recaptchaVerifier!);
            window.confirmationResult = confirmationResult;
            console.log(window.confirmationResult);
            document.getElementById('sender')!.style.display = 'none';
            document.getElementById('verifier')!.style.display = 'block';
        } catch (error) {
            alert(error);
        }
    };

    const codeverify = async (): Promise<void> => {
        const code: string = (
            document.getElementById('verificationcode') as HTMLInputElement
        ).value;
        console.log(code);

        try {
            await window.confirmationResult?.confirm(code);
            console.log('otp verified');
            (
                document.getElementsByClassName('p-conf')[0] as HTMLElement
            ).style.display = 'block';
            (
                document.getElementsByClassName('n-conf')[0] as HTMLElement
            ).style.display = 'none';

            window.location.href = './bookAppointment';
        } catch (error) {
            console.log('otp verification failed', error);
            (
                document.getElementsByClassName('p-conf')[0] as HTMLElement
            ).style.display = 'none';
            (
                document.getElementsByClassName('n-conf')[0] as HTMLElement
            ).style.display = 'block';
        }
    };

    return (
        <div>
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            />
            <title>OTP Authentication</title>
            <div className="container">
                <div id="sender">
                    <input type="text" id="number" placeholder="+982..." />
                    <div id="recaptcha-container" />
                    <Button
                        id="send"
                        className="text-white"
                        value="send"
                        onClick={phoneAuth}>
                        Send
                    </Button>
                </div>
                <div id="verifier" style={{ display: 'none' }}>
                    <input
                        type="text"
                        id="verificationcode"
                        placeholder="OTP Code"
                    />
                    <input
                        type="button"
                        id="verify"
                        value="Verify"
                        onClick={codeverify}
                    />
                    <div className="p-conf">Number Verified</div>
                    <div className="n-conf">OTP Error</div>
                </div>
            </div>
        </div>
    );
}
const firebaseConfig = {
    apiKey: 'AIzaSyAkPGLb0hk49_ltqnuzyx76506YZ1A7xL4',
    authDomain: 'walk-in-easy.firebaseapp.com',
    projectId: 'walk-in-easy',
    storageBucket: 'walk-in-easy.appspot.com',
    messagingSenderId: '824505522690',
    appId: '1:824505522690:web:2c1e27ec3198f32942a51b',
    measurementId: 'G-BXJFLW2E2S',
};

firebase.initializeApp(firebaseConfig);
export default OTPAuth;
