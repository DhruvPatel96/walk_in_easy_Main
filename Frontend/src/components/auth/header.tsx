import React from 'react';

type Props = {
    prompt: string;
};

const AuthHeader = ({ prompt }: Props) => {
    return (
        <div>
            <span className="flex">
                Welcome to &nbsp;
                <p className="text-primary font-semibold">Walk In Easy</p>
            </span>
            <h2 className="text-5xl">{prompt}</h2>
        </div>
    );
};

export default AuthHeader;
