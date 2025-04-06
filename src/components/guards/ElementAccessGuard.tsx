import React from 'react';
import { useAuth } from '../../context/auth.context';

interface ElementAccessGuardProps {
    scope: string;
    children: React.ReactNode;
}

const ElementAccessGuard: React.FC<ElementAccessGuardProps> = ({ scope, children }) => {
    const { user } = useAuth();
    const scopes = user.privileges.map((privilege) => {
        const [, ...scopes] = privilege.split(":");
        return scopes.join(":");
    })
    
    return scopes.includes(scope) ? <>{children}</> : null;
};

export default ElementAccessGuard;