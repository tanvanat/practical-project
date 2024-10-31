import { CheckIcon } from '@heroicons/react/20/solid';
import './style.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const tiers = [
    {
        name: 'Leslie Alexander',
        id: 'Leslie',
        href: '#',
        imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        description: "I am experiencing frequent urination, especially at night. My energy levels seem low, and I've noticed more thirst than usual. Please help me manage these symptoms.",
        features: ['Thirsty', 'Genital itching or thrush', 'Blurred eyesight', 'Cuts and wounds take longer to heal'],
        emergencyContact: '(123) 456-7890',
        featured: false,
    },
    {
        name: 'Michael Foster',
        id: 'Michael',
        href: '#',
        imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        description: "My hands, ankles, and feet are swelling more than usual. I often feel short of breath, and it's affecting my daily activities. I would like to explore ways to manage these symptoms.",
        features: [
            'Chest pain',
            'Shortness of breath',
            'Pain in the neck, jaw, throat',
            'Coughing or Wheezing',
            'Poor blood supply to extremities',
            'Numbness',
        ],
        emergencyContact: '(987) 654-3210',
        featured: true,
    },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Today() {
    const [jump, setJump] = useState(false);

    // Toggle jump every few seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setJump((prev) => !prev);
        }, 1000); // Change every 1 second

        return () => clearInterval(interval);
    }, []);

    return (
        <>
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

                    <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
                        {tiers.map((tier, tierIdx) => (
                            <div
                                key={tier.id}
                                className={classNames(
                                    tier.featured ? 'relative bg-gray-900 shadow-2xl' : 'bg-white/60 sm:mx-8 lg:mx-0',
                                    tierIdx === 0 && jump ? 'jumping-first' : '',
                                    tierIdx === 1 && jump ? 'jumping-second' : '',
                                    tier.featured
                                        ? ''
                                        : tierIdx === 0
                                            ? 'rounded-t-3xl sm:rounded-b-none lg:rounded-bl-3xl lg:rounded-tr-none'
                                            : 'sm:rounded-t-none lg:rounded-bl-none lg:rounded-tr-3xl',
                                    'rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10'
                                )}
                            >
                                <h3
                                    id={tier.id}
                                    className={classNames(
                                        tier.featured ? 'text-indigo-400' : 'text-indigo-600',
                                        'text-base font-semibold leading-7 text-center', // Center name text
                                    )}
                                >
                                    {tier.name}
                                </h3>

                                <div className="mt-4 flex justify-center">
                                    <img
                                        alt={`${tier.name}'s avatar`}
                                        src={tier.imageUrl}
                                        className="h-12 w-12 flex-none rounded-full bg-gray-50"
                                    />
                                </div>

                                <p className={classNames(tier.featured ? 'text-gray-300' : 'text-gray-600', 'mt-6 text-base leading-7 text-center')}>
                                    {tier.description}
                                </p>

                                <ul
                                    role="list"
                                    className={classNames(
                                        tier.featured ? 'text-gray-300' : 'text-gray-600',
                                        'mt-8 space-y-3 text-sm leading-6 sm:mt-10',
                                    )}
                                >
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex gap-x-3">
                                            <CheckIcon
                                                aria-hidden="true"
                                                className={classNames(tier.featured ? 'text-indigo-400' : 'text-indigo-600', 'h-6 w-5 flex-none')}
                                            />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                
                                {/* Emergency Contact Section */}
                                <p className={classNames(tier.featured ? 'text-gray-300' : 'text-gray-600', 'mt-6 text-base leading-7 text-center')}>
                                    Emergency Contact: {tier.emergencyContact}
                                </p>

                                <Link
                                    to={`/home/person/${tier.id}`} // Updated to use URL parameter
                                    aria-describedby={tier.id}
                                    className={classNames(
                                        tier.featured
                                            ? 'bg-indigo-500 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline-indigo-500'
                                            : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300 focus-visible:outline-indigo-600',
                                        'mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10',
                                    )}
                                >
                                    Diagnose
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}
