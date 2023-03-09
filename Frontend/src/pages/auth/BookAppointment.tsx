import { Button } from 'flowbite-react';
import React from 'react';
import './BookAppointment.css';

const BookAppointment: React.FC = () => {
    const users = [
        {
            Name: 'Windsor West Clinic',
            Address: '20 Techumseh Road N9B2L1',
        },
        {
            Name: 'Sakib',
            Address: '25 Ouellette Road N9B3L2',
        },
        {
            Name: 'Jamy',
            Address: '25 Ouellette Road N9B3L2',
        },
        {
            Name: 'Hanif',
            Address: '25 Ouellette Road N9B3L2',
        },
    ];
    const [userList, setUserList] = React.useState<
        { Name: string; Address: string }[] | undefined
    >(users);
    const [text, setText] = React.useState<string>('');

    const handleOnClick = () => {
        const findUsers =
            userList && userList?.length > 0
                ? userList?.filter(u => u?.Name === text)
                : undefined;

        console.log(findUsers);

        setUserList(findUsers);
    };

    return (
        <div className="main-center">
            <div className="title">
                <h1>Find Clinic</h1>
            </div>
            <div className="input__wrapper">
                <input
                    type="text"
                    placeholder="Type of care or Symptom"
                    value={text}
                    onChange={e => {
                        setText(e.target.value);
                        setUserList(users);
                    }}
                />
                <button
                    className="srch"
                    disabled={!text}
                    onClick={handleOnClick}>
                    Search
                </button>
                {/* <Button
                    color="info"
                    className="w-full align-content: center text-white">
                    Book Appointment
                </Button> */}
            </div>

            <div className="body">
                {userList && userList?.length === 0 && (
                    <div className="notFound">No User Found</div>
                )}

                {userList &&
                    userList?.length > 0 &&
                    userList?.map(users => {
                        return (
                            <div className="body__item">
                                <h3>Clinic Name: {users?.Name}</h3>
                                <p>Address: {users?.Address}</p>

                                <Button
                                    color="info"
                                    className="w-full align-content: center text-white">
                                    Book Appointment
                                </Button>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default BookAppointment;
