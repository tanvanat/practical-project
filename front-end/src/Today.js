import { CheckIcon } from '@heroicons/react/20/solid';
import './style.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Today() {
    const [patients, setPatients] = useState([]);
    const [error, setError] = useState(null);

    const fetchPatients = async () => {
        try {
            const response = await fetch('/api/sessions'); // Replace with your actual endpoint
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            const limitedData = data.slice(0, 2).map(patient => ({
                name: patient.firstName + ' ' + patient.lastName,
                id: patient.id,
                href: patient.href,
                description: patient.presentingConcern, // updated field for session concern
                features: Array.isArray(patient.congenital) ? patient.congenital : [], // Ensure features is an array
                emergencyContact: patient.emergencyContact, // array for emergency contact
                featured: true
            }));



            setPatients(limitedData);
        } catch (error) {
            console.error('Error fetching patient data:', error);
            setError(error.message); // Set error message to state
        }
    };

    useEffect(() => {
        fetchPatients(); // Initial fetch

        // Set up polling every 5 seconds (5000 milliseconds)
        const interval = setInterval(fetchPatients, 5000);

        return () => clearInterval(interval); // Clean up interval on unmount
    }, []);

    return (
        <main>
            <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-base font-semibold leading-7 text-indigo-600">
                        Waiting patients
                    </h2>
                    <p className="mt-2 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
                        Choose the patient you want to diagnose and investigate
                    </p>
                </div>
                <p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg font-medium text-gray-600 sm:text-xl/8">
                    Choosing the appropriate test requires understanding the patient's history and current signs and symptoms, as well as having
                    a sufficient suspicion or pre-test probability of a disease or condition.
                </p>

                {error && <p className="text-red-600 text-center">Error: {error}</p>} {/* Display error if any */}

                <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
                    {patients.map((patient, index) => (
                        <div
                            key={patient.id}
                            className={`rounded-3xl p-8 ring-1 ring-gray-900/10 ${patient.featured ? 'bg-gray-900 shadow-2xl' : 'bg-white/60 sm:mx-8 lg:mx-0'} mx-2`} // Add horizontal margin for spacing
                            style={{ transform: index % 2 === 0 ? 'translateX(-10px)' : 'translateX(10px)' }} // Shift boxes left/right
                        >
                            <h3 className={`text-base font-semibold leading-7 text-center ${patient.featured ? 'text-indigo-400' : 'text-indigo-600'}`}>
                                {patient.name}
                            </h3>
                            <p className={`mt-6 text-base leading-7 text-center ${patient.featured ? 'text-gray-300' : 'text-gray-600'}`}>
                                {patient.description}
                            </p>
                            <ul role="list" className={`mt-8 space-y-3 text-sm leading-6 ${patient.featured ? 'text-gray-300' : 'text-gray-600'}`}>
                                {patient.features.map((feature) => (
                                    <li key={feature} className="flex gap-x-3">
                                        <CheckIcon aria-hidden="true" className={`h-6 w-5 flex-none ${patient.featured ? 'text-indigo-400' : 'text-indigo-600'}`} />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <p className={`mt-6 text-base leading-7 text-center ${patient.featured ? 'text-gray-300' : 'text-gray-600'}`}>
                                Emergency Contact: {patient.emergencyContact}
                            </p>
                            <Link
                                to={`/home/person/${patient.id}`}
                                aria-describedby={patient.id}
                                className={`mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold ${patient.featured ? 'bg-indigo-500 text-white' : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300'}`}
                            >
                                Diagnose
                            </Link>
                        </div>
                    ))}
                </div>


            </div>
        </main>
    );
}
