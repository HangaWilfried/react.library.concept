import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../../context/auth.context';

interface PageAccessGuardProps {
    permission: string;
    children: React.ReactNode;
}

const PageAccessGuard: React.FC<PageAccessGuardProps> = ({ permission, children }) => {
    const { user } = useAuth();

    const permissions = user.privileges.map(privilege => {
        const [permission] = privilege.split(":");
        return permission;
    })
    
    const hasAccess = permissions.includes(permission);

    if (!hasAccess) {
        return <Navigate to="/403" />;
    }

    return children;
};

export default PageAccessGuard;