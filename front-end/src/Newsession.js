import { PhotoIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Newsession() {
    const location = useLocation();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        country: '',
        streetAddress: '',
        phone: '',
        congenital: '',
        allergy: '',
        weight: '',
        height: '',
        presentingConcern: '',
    });

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPatientData = async () => {
            if (location.state && location.state.patientId) {
                try {
                    const response = await fetch(`/api/person/${location.state.patientId}`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    setFormData({
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        country: data.country,
                        streetAddress: data.streetAddress,
                        phone: data.emergencyContact, // Assuming emergency contact is stored as phone
                        congenital: data.congenital,
                        allergy: data.allergy,
                        weight: data.weight,
                        height: data.height,
                        presentingConcern: data.presentingConcern,
                    });
                } catch (error) {
                    console.error('Error fetching patient data:', error);
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false); // No patient ID, stop loading
            }
        };

        fetchPatientData();
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const isValid = Object.values(formData).every((value) => value.trim() !== '');
    
        if (!isValid) {
            alert("Please fill in all fields before submitting.");
            setLoading(false);
            return;
        }
    
        try {
            // Include the phone number as the emergency contact
            const response = await axios.post('/api/newsession/upload', {
                ...formData,
                emergencyContact: formData.phone, // Add this line to assign phone as emergency contact
            });
            console.log('Upload Success:', response.data);
            navigate('/home/upload');
        } catch (error) {
            console.error('Error submitting form:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">New Session</h1>
                </div>
            </header>
            <main className="flex justify-center items-center min-h-screen">
                <form onSubmit={handleSubmit} className="max-w-lg w-full mt-7">
                    <div className="space-y-1">
                        <div className="border-gray-900/10">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">OPD CARD</h2>
                            <p className="my-8 mt-1 text-sm leading-6 text-gray-600">
                                Last edit 17/1/46
                            </p>
                            <div className="border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    {/* Input fields */}
                                    <div className="sm:col-span-3">
                                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                            First name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="first-name"
                                                name="firstName"
                                                type="text"
                                                autoComplete="given-name"
                                                value={formData.firstName} // Set value from state
                                                onChange={handleChange}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                            Last name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="last-name"
                                                name="lastName"
                                                type="text"
                                                autoComplete="family-name"
                                                value={formData.lastName} // Set value from state
                                                onChange={handleChange}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    {/* Additional input fields follow the same pattern as above, using formData for values */}
                                    {/* Email */}
                                    <div className="sm:col-span-4">
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                            Email address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    {/* Continue adding the remaining fields similarly */}
                                    {/* Country */}
                                    <div className="sm:col-span-3">
                                        <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                            Country
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                id="country"
                                                name="country"
                                                autoComplete="country-name"
                                                value={formData.country}
                                                onChange={handleChange}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                            >
                                                <option value="">Select a country</option>
                                                <option value="United States">United States</option>
                                                <option value="Canada">Canada</option>
                                                <option value="Mexico">Mexico</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Street Address */}
                                    <div className="col-span-full">
                                        <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                            Street address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="street-address"
                                                name="streetAddress"
                                                type="text"
                                                autoComplete="street-address"
                                                value={formData.streetAddress}
                                                onChange={handleChange}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    {/* Phone Number */}
                                    <div className="sm:col-span-2 sm:col-start-1">
                                        <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                            Phone number
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                autoComplete="tel"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    {/* Congenital */}
                                    <div className="sm:col-span-2">
                                        <label htmlFor="congenital" className="block text-sm font-medium leading-6 text-gray-900">
                                            Congenital
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="congenital"
                                                name="congenital"
                                                type="text"
                                                value={formData.congenital}
                                                onChange={handleChange}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    {/* Allergy */}
                                    <div className="sm:col-span-2">
                                        <label htmlFor="allergy" className="block text-sm font-medium leading-6 text-gray-900">
                                            Allergy
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="allergy"
                                                name="allergy"
                                                type="text"
                                                value={formData.allergy}
                                                onChange={handleChange}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    {/* Weight */}
                                    <div className="sm:col-span-2">
                                        <label htmlFor="weight" className="block text-sm font-medium leading-6 text-gray-900">
                                            Weight
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="weight"
                                                name="weight"
                                                type="text"
                                                value={formData.weight}
                                                onChange={handleChange}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    {/* Height */}
                                    <div className="sm:col-span-2">
                                        <label htmlFor="height" className="block text-sm font-medium leading-6 text-gray-900">
                                            Height
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="height"
                                                name="height"
                                                type="text"
                                                value={formData.height}
                                                onChange={handleChange}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    {/* Presenting Concern */}
                                    <div className="col-span-full">
                                        <label htmlFor="presentingConcern" className="block text-sm font-medium leading-6 text-gray-900">
                                            Presenting Concern
                                        </label>
                                        <div className="mt-2">
                                            <textarea
                                                id="presentingConcern"
                                                name="presentingConcern"
                                                rows={3}
                                                value={formData.presentingConcern}
                                                onChange={handleChange}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        <p className="mt-2 text-sm leading-6 text-gray-600">
                                            Brief description for your concern.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center justify-end gap-x-6">
                                    <button
                                        type="button"
                                        className="text-sm font-semibold leading-6 text-gray-900"
                                        onClick={() => navigate(-1)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="inline-block rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </main>
        </>
    );
}
