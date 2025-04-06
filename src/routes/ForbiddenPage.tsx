import React from 'react';
import { useNavigate } from 'react-router';

const ForbiddenPage: React.FC = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate('/');
        }
    };

    return (
        <div>
            <h1>403</h1>
            <p>You do not have permission to access this page.</p>
            <button onClick={handleGoBack}>Go Back</button>
        </div>
    );
};

export default ForbiddenPage;
