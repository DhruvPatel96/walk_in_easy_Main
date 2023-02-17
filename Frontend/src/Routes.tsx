import { Navigate, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/auth/AuthPage';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import SignUpClient from './pages/auth/SignUpClient';
import SignUpClinic from './pages/auth/SignUpClinic';
import OTPAuth from './pages/auth/OtpAuth';
import BookAppointment from './pages/auth/BookAppointment';

const Views = () => {
    return (
        <Routes>
            <Route path="auth" element={<AuthPage />}>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="signup/client" element={<SignUpClient />} />
                <Route path="signup/clinic" element={<SignUpClinic />} />
                <Route path="login/otpAuth" element={<OTPAuth />} />
                <Route index element={<Navigate to="login" />} />
            </Route>
            <Route path="/" element={<Navigate to="/auth" />} />
            <Route
                path="auth/login/BookAppointment"
                element={<BookAppointment />}
            />
        </Routes>
    );
};

export default Views;
