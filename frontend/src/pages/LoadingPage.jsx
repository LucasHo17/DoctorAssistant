import "./LoadingPage.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoadingPage = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        const timer = setTimeout(() => {
        navigate("/");
        }, 2000); // Redirect after 2 seconds
    
        return () => clearTimeout(timer); // Cleanup on unmount
    }, [navigate]);
    
    return (
        <div className="loading-container">
        <div className="spinner"></div>
        </div>
    );
}

export default LoadingPage;