import { useParams } from 'react-router-dom';

const Person = () => {
    const { id } = useParams(); // Access the ID from the URL

    return (
        <div>
            <h1>Person ID: {id}</h1>
            {/* Fetch and display person details using the ID */}
        </div>
    );
};

export default Person;
