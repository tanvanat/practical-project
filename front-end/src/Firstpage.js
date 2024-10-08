import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FirstPage() {
    const [url, setUrl] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Navigate to loading page after submit
        navigate('/loading', { state: { url } });
    };

    return (
        <section className="flex flex-col items-center p-6">
            {/* Header Section */}
            <div className="flex flex-col items-center text-center mb-8">
                <h1 className="text-3xl font-bold mb-4">Free Website Malware and Security Checker</h1>
                <h2 className="text-lg max-w-xl mb-6">
                    Enter a URL like example.com and I will scan for known malware, viruses, blacklisting status,
                    website errors, out-of-date software, and malicious code.
                </h2>
            </div>

            {/* URL Input Form */}
            <form onSubmit={handleSubmit} className="flex items-center space-x-4">
                <input
                    type="text"
                    placeholder="Enter URL here"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-64 p-2 border border-gray-300 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <button
                    type="submit"
                    className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 shadow-md rounded"
                >
                    Submit
                </button>
            </form>
        </section>
    );
}
