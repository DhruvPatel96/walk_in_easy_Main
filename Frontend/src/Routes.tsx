import { Navigate, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/auth/AuthPage';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import SignUpClient from './pages/auth/SignUpClient';
import SignUpClinic from './pages/auth/SignUpClinic';

const Views = () => {
    return (
        <Routes>
            <Route path="auth" element={<AuthPage />}>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="signup/client" element={<SignUpClient />} />
                <Route path="signup/clinic" element={<SignUpClinic />} />
                <Route index element={<Navigate to="login" />} />
            </Route>
            <Route path="/" element={<Navigate to="/auth" />} />
        </Routes>
    );
};

export default Views;
