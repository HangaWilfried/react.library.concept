import React from 'react';
import { useAuth } from '../../context/auth.context';
import { Navigate } from 'react-router';

interface ComponentGuardProps {
    requiredScope: string;
    children: React.ReactNode;
}

const ComponentGuard: React.FC<ComponentGuardProps> = ({ requiredScope, children }) => {
    const { user } = useAuth();
    const hasAccess = user.privileges.some((it) => it.includes(requiredScope));

    if (!hasAccess) {
        return <Navigate to="/403" />;
    }

    return children;
};

export default ComponentGuard;