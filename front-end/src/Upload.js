import { useState, useEffect } from 'react';

export default function Upload() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Set a timeout to hide the loading icon after 3 seconds
        const timer = setTimeout(() => setIsLoading(false), 3000);

        // Clean up the timer when the component unmounts
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen">
            {isLoading ? (
                <div className="flex flex-col items-center">
                    {/* Loading icon (simple spinner example) */}
                    <svg
                        className="animate-spin h-10 w-10 text-blue-500 mb-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                    <p className="text-lg font-semibold text-gray-600">Loading...</p>
                </div>
            ) : (
                <h2 className="text-2xl font-bold text-green-500">Upload Complete!</h2>
            )}
        </div>
    );
}
