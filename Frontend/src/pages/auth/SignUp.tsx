import { Button, Label, TextInput } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { signupFields } from '../../constants/formFields';

const fields = signupFields;

const SignUp = () => {
    return (
        <div className="w-96 px-6 py-12 flex flex-col space-y-4">
            <span className="flex">
                Welcome to &nbsp;
                <p className="text-primary font-semibold">Walk In Easy</p>
            </span>
            <h2 className="text-5xl">Sign up</h2>
            {fields.map(field => (
                <div>
                    <div className="block">
                        <Label
                            htmlFor={field.labelFor}
                            value={field.labelText}
                        />
                    </div>
                    <TextInput
                        id={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        color="primary"
                        required={field.isRequired}
                    />
                </div>
            ))}
            <div>
                <Button color="info" className="w-full text-white">
                    Sign up
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
