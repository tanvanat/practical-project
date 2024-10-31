import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Sessions() {
    const [people, setPeople] = useState([]);

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const response = await axios.get('/api/sessions');
                setPeople(response.data);
            } catch (error) {
                console.error('Error fetching sessions:', error);
            }
        };

        // Fetch data initially and set up polling
        fetchSessions();
        const intervalId = setInterval(fetchSessions, 5000); // Fetch every 5 seconds

        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Sessions</h1>
                </div>
            </header>
            <main>
                <div className="min-h-screen max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-7">
                    <ul>
                        {people.map((person) => (
                            <li key={person.id} className="mb-4">
                                <Link to={`/home/person/${person.id}`}>
                                    <button className="w-full bg-custom-green hover:bg-[#B0BD9C] text-white font-bold py-2 px-4 border-b-4 border-custom-green hover:border-[#B0BD9C] rounded flex justify-between items-center">
                                        <div className="flex items-center min-w-0 gap-x-4">
                                            <img alt="" src={person.imageUrl} className="h-12 w-12 flex-none rounded-full bg-gray-50" />
                                            <div className="min-w-0 flex-auto">
                                                <p className="text-sm font-semibold leading-6 text-gray-900">{person.firstName + ' '+ person.lastName}</p>
                                            </div>
                                        </div>
                                        <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
                                            {person.lastSeen ? (
                                                <p className="mt-1 text-xs leading-5 text-gray-500">
                                                    <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
                                                </p>
                                            ) : (
                                                <div className="mt-1 flex items-center gap-x-1.5">
                                                    <p className="mt-1 text-xs leading-5 text-gray-500">now</p>
                                                </div>
                                            )}
                                        </div>
                                    </button>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </>
    );
}
