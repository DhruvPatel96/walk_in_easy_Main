import { Flowbite, ThemeProps } from 'flowbite-react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Views from './Routes';

const theme: ThemeProps = {
    theme: {
        button: {
            color: {
                info: 'bg-primary hover:bg-blue-700',
            },
        },
    },
};

const App = () => {
    return (
        <Flowbite theme={theme}>
            <div className="min-h-full h-screen w-screen flex items-center justify center">
                <BrowserRouter>
                    <Views />
                </BrowserRouter>
            </div>
        </Flowbite>
    );
};

export default App;
