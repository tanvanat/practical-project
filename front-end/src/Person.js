import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
        <div className="person-details">
            <h2>{personData.name}</h2>
            <img src={personData.imageUrl} alt={`${personData.name}'s avatar`} />
            <p>{personData.description}</p>
            <ul>
                {personData.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                ))}
            </ul>
        </div>
    );
}
