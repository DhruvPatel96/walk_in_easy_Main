import * as yup from 'yup';

const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const emailValidation = yup
    .string()
    .email('Please enter a valid email!')
    .required('Email is required!');
const passwordValidation = yup
    .string()
    .min(8, "Passwords can't be smaller than 8 characters!")
    .required('Password is required!');
const phoneValidation = yup
    .string()
    .matches(phoneRegExp, {
        message: 'Please enter a valid phone number.',
        excludeEmptyString: false,
    })
    .required('Phone number is required!');
const websiteValidation = yup
    .string()
    .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        'Enter a correct url!'
    );

const loginFields = [
    {
        labelText: 'Email address',
        labelFor: 'email',
        id: 'email',
        name: 'email',
        type: 'email',
        autoComplete: 'email',
        isRequired: true,
        placeholder: 'abc@xyz.com',
        validation: emailValidation,
    },
    {
        labelText: 'Password',
        labelFor: 'password',
        id: 'password',
        name: 'password',
        type: 'password',
        autoComplete: 'current-password',
        isRequired: true,
        placeholder: '***********',
        validation: passwordValidation,
    },
];

const clientSignupFields = [
    {
        labelText: 'Full Name',
        labelFor: 'fullName',
        id: 'fullName',
        name: 'fullName',
        type: 'text',
        autoComplete: 'name',
        isRequired: true,
        placeholder: 'John Doe',
        validation: yup.string().required('Name is required!'),
    },
    {
        labelText: 'Email address',
        labelFor: 'email',
        id: 'email',
        name: 'email',
        type: 'email',
        autoComplete: 'email',
        isRequired: true,
        placeholder: 'Email address',
        validation: emailValidation,
    },
    {
        labelText: 'Address',
        labelFor: 'streetAddress',
        id: 'streetAddress',
        name: 'streetAddress',
        type: 'text',
        autoComplete: 'address',
        isRequired: true,
        placeholder: 'Address',
        validation: yup.string().required('Address is required!'),
    },
    {
        labelText: 'Phone number',
        labelFor: 'phoneNumber',
        id: 'phoneNumber',
        name: 'phoneNumber',
        type: 'tel',
        autoComplete: 'phone',
        isRequired: true,
        placeholder: 'Phone number',
        validation: phoneValidation,
    },
    {
        labelText: 'Password',
        labelFor: 'password',
        id: 'password',
        name: 'password',
        type: 'password',
        autoComplete: 'current-password',
        isRequired: true,
        placeholder: 'Password',
        validation: passwordValidation,
    },
    {
        labelText: 'Confirm Password',
        labelFor: 'confirm-password',
        id: 'confirm-password',
        name: 'confirm-password',
        type: 'password',
        autoComplete: 'confirm-password',
        isRequired: true,
        placeholder: 'Confirm Password',
        validation: passwordValidation.required(
            'Password confirmation is required!'
        ),
    },
];

const clinicSignupFields = [
    {
        labelText: 'Clinic Name',
        labelFor: 'name',
        id: 'clinicName',
        name: 'name',
        type: 'text',
        autoComplete: 'name',
        isRequired: true,
        placeholder: 'Clinic Name',
        validation: yup.string().required('Clinic name is required!'),
    },
    {
        labelText: 'Phone number',
        labelFor: 'phone',
        id: 'phoneNumber',
        name: 'phone',
        type: 'tel',
        autoComplete: 'phone',
        isRequired: true,
        placeholder: 'Phone number',
        validation: phoneValidation,
    },
    {
        labelText: 'Email address',
        labelFor: 'email-address',
        id: 'email-address',
        name: 'email',
        type: 'email',
        autoComplete: 'email',
        isRequired: true,
        placeholder: 'Email address',
        validation: emailValidation,
    },
    {
        labelText: 'Website',
        labelFor: 'website',
        id: 'website',
        name: 'website',
        type: 'url',
        autoComplete: 'url',
        isRequired: false,
        placeholder: 'Website',
        validation: websiteValidation,
    },
    {
        labelText: 'Address',
        labelFor: 'address',
        id: 'streetAddress',
        name: 'address',
        type: 'text',
        autoComplete: 'address',
        isRequired: true,
        placeholder: 'Address',
        validation: yup.string().required('Address is required!'),
    },
    {
        labelText: 'Password',
        labelFor: 'password',
        id: 'password',
        name: 'password',
        type: 'password',
        autoComplete: 'current-password',
        isRequired: true,
        placeholder: 'Password',
        validation: passwordValidation,
    },
    {
        labelText: 'Confirm Password',
        labelFor: 'confirm-password',
        id: 'confirm-password',
        name: 'confirm-password',
        type: 'password',
        autoComplete: 'confirm-password',
        isRequired: true,
        placeholder: 'Confirm Password',
        validation: passwordValidation.required(
            'Password confirmation is required!'
        ),
    },
];

export { loginFields, clientSignupFields, clinicSignupFields };
