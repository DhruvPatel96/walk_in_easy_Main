import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import 'firebase/firestore';
import 'C:/Users/simra/Desktop/MAC/ADT/walk_in_easy_Main/Frontend/src/otp.css';
import React, { useEffect } from 'react';
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
            window.location.href = './';
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
                    <button id="send" value="send" onClick={phoneAuth}>
                        Send
                    </button>
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
    apiKey: 'AIzaSyD8oB-2aJleoJQTvy-_yDs4UJzEILieSUk',
    authDomain: 'otpauth-fce0a.firebaseapp.com',
    projectId: 'otpauth-fce0a',
    storageBucket: 'otpauth-fce0a.appspot.com',
    messagingSenderId: '1069424128369',
    appId: '1:1069424128369:web:bb1d57791a988b966c46d0',
    measurementId: 'G-S2ZK35FV2P',
};

firebase.initializeApp(firebaseConfig);
export default OTPAuth;
