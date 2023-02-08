import { Navigate, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/auth/AuthPage';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';

const Views = () => {
    return (
        <Routes>
            <Route path="auth" element={<AuthPage />}>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
                <Route index element={<Navigate to="login" />} />
            </Route>
            <Route path="/" element={<Navigate to="/auth" />} />
        </Routes>
    );
};

export default Views;
