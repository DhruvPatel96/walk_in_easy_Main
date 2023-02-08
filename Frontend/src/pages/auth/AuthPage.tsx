import { Card } from 'flowbite-react';
import React from 'react';
import { Outlet } from 'react-router-dom';
const AuthPage = () => {
    return (
        <div className="flex flex-col h-full w-full sm:items-end justify-center">
            <div className="z-10 sm:mr-32">
                <Card>
                    <Outlet />
                </Card>
            </div>
            <div className="h-1/2 w-full bg-primary absolute top-0 z-0 flex items-center sm:pl-32">
                <div className="hidden flex-col items-end sm:flex">
                    <h1 className="text-8xl text-white mb-8">Walk in Easy</h1>
                    <h6 className="text-2xl text-white">
                        "Know before you go..."
                    </h6>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
