import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Label, TextInput } from 'flowbite-react';

import { clientSignupFields } from '../../constants/formFields';
import AuthHeader from '../../components/auth/header';
import { useFormik } from 'formik';
import * as yup from 'yup';

const fields = clientSignupFields;

const clientSignupSchema = clientSignupFields.reduce((result: any, field) => {
    result[field.id] = field.validation;
    return result;
}, {});

const SignUpClient = () => {
    const formik = useFormik({
        initialValues: clientSignupFields.reduce((result: any, field) => {
            result[field.id] = '';
            return result;
        }, {}),
        validationSchema: yup.object().shape(clientSignupSchema),
        onSubmit: values => {
            console.log(values);
            values['age'] = 30;
            values['city'] = "Anytown";
            values['province'] = "State";
            values['zipCode'] = "12345";
            values['country'] = "USA";
            values['gender'] = "Male";
            values['dateOfBirth'] = "1992-01-01";
            const bodyValues = JSON.stringify(values, (key, value) => {
                // Check if key matches the string "pin" or "mob"
                // if matched return value "undefined"
                if (key == "email-address" || key == "confirm-password" || key == "address") {
                  return undefined;
                }
                
                // else return the value itself
                return value;
              });
              console.log(bodyValues);
              

            fetch("http://localhost:3000/signupPatient",{ 
                method:"POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: bodyValues,
            }).then(response => {
                // if (response.ok) {
                //     return response.json();
                // }
                console.log(response);
            })
        },
    });

    return (
        <div className="w-96 px-6 py-12 flex flex-col space-y-4">
            <AuthHeader prompt="Sign up client" />
            <form action="" onSubmit={formik.handleSubmit}>
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
                    <Button type='submit' color="info" className="w-full text-white">
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
            </form>
        </div>
    );
};

export default SignUpClient;
