import { Navigate } from "react-router-dom";
import { isUserLoggedIn } from '../utils/AuthenticationService';

export const ProtectedRoute = ({ children }) => {

    if (!isUserLoggedIn()) {
        // user is not authenticated
        return <Navigate to="/" />;
    }

    return children;
};
