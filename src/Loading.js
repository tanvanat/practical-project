import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import loadingSvg from './loading.svg';

export default function Loading() {
    const navigate = useNavigate();
    const location = useLocation();
    const url = location.state?.url;

    useEffect(() => {
        // Simulate loading time
        const timer = setTimeout(() => {
            navigate('/output', { state: { url } });
        }, 3000); // 3 seconds delay

        return () => clearTimeout(timer);
    }, [navigate, url]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
           <img src={loadingSvg} alt="Loading..." className="animate-spin w-16 h-16" />
            <p className="mt-4 text-xl font-semibold">Scanning the website...</p>
        </div>
    );
}
