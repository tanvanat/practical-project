import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Sessions() {
    const [people, setPeople] = useState([]);
    const [error, setError] = useState(null);
    const [currentEditingId, setCurrentEditingId] = useState(null); // State to track the currently edited person ID
    const navigate = useNavigate(); // Hook to navigate programmatically

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const response = await axios.get('/api/sessions');
                setPeople(response.data);
            } catch (error) {
                console.error('Error fetching sessions:', error);
                setError(error.message); // Set error message to state
            }
        };

        // Fetch data initially and set up polling
        fetchSessions();
        const intervalId = setInterval(fetchSessions, 5000); // Fetch every 5 seconds

        return () => clearInterval(intervalId);
    }, []);

    const handleEdit = async (id) => {
        if (currentEditingId === id) {
            // If the same ID is selected, trigger the update logic
            try {
                const response = await axios.put(`/api/person/${id}`, {
                    // Here, you would send the updated data
                    // For example, assuming you want to update some data fields
                    // name: "Updated Name",
                    // Other fields to update...
                });
                console.log('Person updated:', response.data);
                // Optionally, you can refresh the list or handle UI updates after the update
                // For now, just log the response or show a success message
            } catch (error) {
                console.error('Error updating person data:', error);
                setError(error.message); // Handle error for updating person data
            }
        } else {
            // If a different ID is selected, fetch the details and navigate to Newsession
            try {
                const response = await axios.get(`/api/person/${id}`);
                const person = response.data;

                // Navigate to Newsession.js with the person's data
                navigate('/home/newsession', { state: { person } });
                setCurrentEditingId(id); // Update the currently edited person ID
            } catch (error) {
                console.error('Error fetching person data:', error);
                setError(error.message); // Handle error for fetching person data
            }
        }
    };

    return (
        <>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Sessions</h1>
                </div>
            </header>
            <main>
                <div className="min-h-screen max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-7">
                    {error && <p className="text-red-600 text-center">Error: {error}</p>} {/* Display error if any */}
                    <ul>
                        {people.map((person) => (
                            <li key={person.id} className="mb-4">
                                <Link
                                    to={`/home/newsession`}
                                    state={{ patientId: person.id }} // Pass the patient's ID to the Newsession component
                                    className="w-full bg-custom-green hover:bg-[#B0BD9C] text-white font-bold py-2 px-4 border-b-4 border-custom-green hover:border-[#B0BD9C] rounded flex justify-between items-center"
                                    onClick={() => handleEdit(person.id)} // Call handleEdit on click
                                >
                                    <div className="flex items-center min-w-0 gap-x-4">
                                        <div className="min-w-0 flex-auto">
                                            <p className="text-sm font-semibold leading-6 text-gray-900">{person.firstName + ' ' + person.lastName}</p>
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
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </>
    );
}
