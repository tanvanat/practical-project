// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());

// Sample data (could be imported from a separate module/file in a real app)
const tiers = [
    {
        name: 'Leslie Alexander',
        id: 'Leslie',
        imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        description: "I am experiencing frequent urination, especially at night. My energy levels seem low, and I've noticed more thirst than usual. Please help me manage these symptoms.",
        features: ['Thirsty', 'Genital itching or thrush', 'Blurred eyesight', 'Cuts and wounds take longer to heal'],
        featured: false,
    },
    {
        name: 'Michael Foster',
        id: 'Michael',
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
        featured: true,
    },
];

// Define route to get data by person ID
app.get('/api/person/:id', (req, res) => {
    const personId = req.params.id;
    const person = tiers.find((tier) => tier.id === personId);

    if (person) {
        res.json(person);
    } else {
        res.status(404).json({ error: 'Person not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
