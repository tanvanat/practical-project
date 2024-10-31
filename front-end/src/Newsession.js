import { PhotoIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CameraIcon } from '@heroicons/react/24/outline';

export default function Newsession({ tier }) { // Ensure tier is passed as a prop
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
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading state

        // Validate that all fields are filled out
        const isValid = Object.values(formData).every((value) => value.trim() !== '');

        if (!isValid) {
            alert("Please fill in all fields before submitting.");
            setLoading(false); // End loading state if validation fails
            return;
        }

        try {
            // Send data to the new API endpoint
            const response = await axios.post('/api/newsession/upload', formData);
            console.log('Upload Success:', response.data);

            // Navigate to the Upload.js component after successful upload
            navigate('/home/upload');
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setLoading(false); // End loading state
        }
    };

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
                        <div className=" border-gray-900/10">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">OPD CARD</h2>
                            <p className="my-8 mt-1 text-sm leading-6 text-gray-600">
                                Last edit 17/1/46
                            </p>
                            <div className=" border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                                <div className="mt-4 col-span-full">
                                    <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                                        Profile Photo
                                    </label>
                                    <div className="mt-2 flex justify-start">
                                        <div className="flex flex-col items-center rounded-lg border border-dashed border-gray-900/25 p-4 w-32 h-30">
                                            <CameraIcon aria-hidden="true" className="h-8 w-8 text-gray-300" />
                                            <div className="mt-2 flex text-sm leading-6 text-gray-600">
                                                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                                    <span>Upload</span>
                                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                                                onChange={handleChange}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

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
                                                onChange={handleChange}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                            Country
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                id="country"
                                                name="country"
                                                autoComplete="country-name"
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
                                                onChange={handleChange}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2 sm:col-start-1">
                                        <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                            Phone number
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="phone"
                                                name="phone"
                                                type="text"
                                                autoComplete="phone-number"
                                                onChange={handleChange}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="congenital" className="block text-sm font-medium leading-6 text-gray-900">
                                            Congenital disease
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="congenital"
                                                name="congenital"
                                                type="text"
                                                autoComplete="congenital disease"
                                                onChange={handleChange}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="allergy" className="block text-sm font-medium leading-6 text-gray-900">
                                            Allergy
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="allergy"
                                                name="allergy"
                                                type="text"
                                                autoComplete="allergy"
                                                onChange={handleChange}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="weight" className="block text-sm font-medium leading-6 text-gray-900">
                                            Weight (kg)
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="weight"
                                                name="weight"
                                                type="number"
                                                min="1"  // Minimum value for weight
                                                max="500"  // Maximum value for weight
                                                step="0.1"  // Allow up to one decimal place, if needed
                                                autoComplete="weight"
                                                onChange={handleChange}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="height" className="block text-sm font-medium leading-6 text-gray-900">
                                            Height (cm)
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="height"
                                                name="height"
                                                type="number"
                                                min="30"  // Minimum value for height
                                                max="300"  // Maximum value for height
                                                step="1"  // Whole numbers only
                                                autoComplete="height"
                                                onChange={handleChange}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="presentingConcern" className="block text-sm font-medium leading-6 text-gray-900">
                                            Presenting Concern
                                        </label>
                                        <div className="mt-2">
                                            <textarea
                                                id="presentingConcern"
                                                name="presentingConcern"
                                                rows={3}
                                                onChange={handleChange}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                defaultValue={''}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                                            Photo
                                        </label>
                                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                            <div className="text-center">
                                                <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
                                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                                        <span>Upload a file</span>
                                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                                    </label>
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>
                                                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button
                                type="submit"
                                disabled={Object.values(formData).some((value) => value.trim() === '')} // Disable if any field is empty
                                className={`rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ${Object.values(formData).some((value) => value.trim() === '') ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500'}`}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </main>
        </>
    );
}
