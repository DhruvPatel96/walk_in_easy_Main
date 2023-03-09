import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Label, TextInput } from 'flowbite-react';

import { clinicSignupFields } from '../../constants/formFields';
import AuthHeader from '../../components/auth/header';
import { useFormik } from 'formik';
import * as yup from 'yup';

const fields = clinicSignupFields;
const clinicSignupSchema = clinicSignupFields.reduce((result: any, field) => {
    result[field.id] = field.validation;
    return result;
}, {});

const SignUpClinic = () => {
    const formik = useFormik({
        initialValues: clinicSignupFields.reduce((result: any, field) => {
            result[field.id] = '';
            return result;
        }, {}),
        validationSchema: yup.object().shape(clinicSignupSchema),
        onSubmit: values => {
            console.log(values);
        },
    });
    return (
        <div className="w-96 px-6 py-6 flex flex-col space-y-2">
            <AuthHeader prompt="Sign up clinic" />
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

export default SignUpClinic;
