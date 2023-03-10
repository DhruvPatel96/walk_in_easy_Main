import { Button, Label, TextInput } from 'flowbite-react';
import { Formik, useFormik } from 'formik';
import React from 'react';
import { Link } from 'react-router-dom';
import AuthHeader from '../../components/auth/header';
import { loginFields } from '../../constants/formFields';
import * as yup from 'yup';

const fields = loginFields;

const loginSchema = loginFields.reduce((result: any, field) => {
    result[field.id] = field.validation;
    return result;
}, {});

const Login = () => {
    console.log(loginSchema);
    const formik = useFormik({
        initialValues: loginFields.reduce((result: any, field) => {
            result[field.id] = '';
            return result;
        }, {}),
        validationSchema: yup.object().shape(loginSchema),
        onSubmit: values => {
            console.log(values);
            fetch('http://localhost:3000/signinPatient', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            console.log("login successful"); // redirect to dashboard on successful login
          } else {
            // setError(data.message); // set error message if login fails
            console.log("error");
          }
        })
        .catch(error => {
          console.error('Error:', error);
        //   setError('Something went wrong. Please try again.'); // set error message if there's an unexpected error
        });
        },
    });
    return (
        <div className="w-full md:w-96 px-6 py-12 flex flex-col space-y-4">
            <AuthHeader prompt="Sign in" />
            {fields.map(field => (
                <div key={field.id}>
                    <div className="block">
                        <Label
                            htmlFor={field.labelFor}
                            value={field.labelText}
                        />
                    </div>
                    <TextInput
                        id={field.id}
                        type={field.type}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values[field.id]}
                        placeholder={field.placeholder}
                        color={
                            formik.touched[field.id] &&
                            !!formik.errors[field.id]
                                ? 'failure'
                                : 'primary'
                        }
                        required={field.isRequired}
                        helperText={
                            formik.touched[field.id] &&
                            !!formik.errors[field.id]
                                ? formik.errors[field.id]?.toLocaleString()
                                : ''
                        }
                    />
                </div>
            ))}
            <div>
                <Button
                    color="info"
                    onClick={() => formik.handleSubmit()}
                    className="w-full text-white">
                    Sign in
                </Button>
            </div>
            <div>
                <p className="text-xs text-gray-500">No Account?</p>
                <Link to={'../signup'} replace>
                    <p className="text-xs text-primary">
                        Sign up for a new Account
                    </p>
                </Link>
            </div>
        </div>
    );
};

export default Login;
