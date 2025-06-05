import "./LoadingPage.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoadingPage = ({ redirectPath = "/" }) => {
    const navigate = useNavigate();
    
    useEffect(() => {
        const timer = setTimeout(() => {
        navigate(redirectPath);
        }, 2000); // Redirect after 2 seconds
    
        return () => clearTimeout(timer); // Cleanup on unmount
    }, [navigate, redirectPath]);
    
    return (
        <div className="loading-container">
        <div className="spinner"></div>
        </div>
    );
}

export default LoadingPage;