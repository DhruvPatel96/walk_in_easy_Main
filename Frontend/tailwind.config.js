/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        colors: {
            primary: '#0089ED',
        },
        extend: {
            spacing: {
                120: '40rem',
            },
        },
    },
    plugins: [require('flowbite/plugin')],
};
