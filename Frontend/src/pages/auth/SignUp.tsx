import { Button } from 'flowbite-react';
import React, { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthHeader from '../../components/auth/header';

const SignUp = () => {
    const navigate = useNavigate();
    const goto = useCallback((path: string) => navigate(path), [navigate]);
    return (
        <div className="w-96 px-6 py-12 flex flex-col space-y-4">
            <AuthHeader prompt="Sign up" />
            <div>
                <Button
                    color="info"
                    onClick={() => goto('client')}
                    className="w-full text-white">
                    Sign up as a client
                </Button>
            </div>
            <div>
                <Button
                    color="info"
                    onClick={() => goto('clinic')}
                    className="w-full text-white">
                    Sign up as a clinic
                </Button>
            </div>
            <div>
                <p className="text-xs text-gray-500">
                    Already have an Account?
                </p>
                <Link to={'../login'} replace>
                    <p className="text-xs text-primary">
                        Sign in to your Account
                    </p>
                </Link>
            </div>
        </div>
    );
};

export default SignUp;
