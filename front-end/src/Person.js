import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ClipboardDocumentListIcon, PhoneIcon } from '@heroicons/react/24/outline';

export default function Person() {
    const { id } = useParams();
    const [personData, setPersonData] = useState(null);

    useEffect(() => {
        // Fetch person data from the backend
        const fetchPersonData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/person/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setPersonData(data);
                } else {
                    console.error('Person not found');
                }
            } catch (error) {
                console.error('Error fetching person data:', error);
            }
        };

        fetchPersonData();
    }, [id]);

    if (!personData) {
        return <p>Loading...</p>;
    }

    return (
        <div className="relative isolate overflow-hidden bg-gray-900 h-screen flex items-center">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                    <div className="max-w-xl lg:max-w-lg">
                        <h2 className="text-4xl font-semibold tracking-tight text-white">{personData.firstName + ' ' + personData.lastName}</h2>
                        <p className="mt-4 text-lg text-gray-300">
                            {personData.description}
                        </p>
                        <div className="mt-6 flex max-w-md gap-x-4">
                            <label htmlFor="diagnose" className="sr-only">
                                Diagnose
                            </label>
                            <input
                                id="diagnose"
                                name="diagnose"
                                type="text" // Changed to text for diagnosing
                                required
                                placeholder="Diagnose"
                                autoComplete="off"
                                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm"
                            />
                            <button
                                type="submit"
                                className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            >
                                Diagnose
                            </button>
                        </div>
                    </div>
                    <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
                        <div className="flex flex-col items-start">
                            <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                                <ClipboardDocumentListIcon aria-hidden="true" className="h-6 w-6 text-white" /> {/* Clipboard icon */}
                            </div>
                            <dt className="mt-4 text-base font-semibold text-white">Symptoms</dt>
                            <dd className="mt-2 text-base text-gray-400">
                                <ul>
                                    {personData.features.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                            </dd>
                        </div>
                        <div className="flex flex-col items-start">
                            <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                                <PhoneIcon aria-hidden="true" className="h-6 w-6 text-white" /> {/* Phone icon */}
                            </div>
                            <dt className="mt-4 text-base font-semibold text-white">Emergency Contact</dt>
                            <dd className="mt-2 text-base text-gray-400">
                                <ul>
                                    {personData.emergencyContact.map((contact, index) => (
                                        <li key={index}>{contact}</li>
                                    ))}
                                </ul>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
            <div aria-hidden="true" className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6">
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
                />
            </div>
        </div>
    );
}
