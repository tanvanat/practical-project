import React, { useState } from 'react';

export default function Docnote() {
  const [note, setNote] = useState('This is a sample note. You can edit this text.'); // Default note text
  const [isEditing, setIsEditing] = useState(false); // State to track if the note is in editing mode
  const [isRecording, setIsRecording] = useState(false); // State to track if recording is active

  const handleEdit = () => {
    setIsEditing(!isEditing); // Toggle editing mode
  };

  const handleRecord = () => {
    setIsRecording(!isRecording); // Toggle recording state
    // Here you would implement the actual recording logic
    if (!isRecording) {
      console.log("Recording..."); // Placeholder for actual recording logic
    } else {
      console.log("Recording stopped."); // Placeholder for stopping recording
    }
  };

  const handleComplete = () => {
    alert('Everything is marked as complete!'); // Placeholder for completing the note
    // You might want to handle the completion logic here (e.g., save the note)
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Doctor's Notes</h1>
      <div className="border p-4 rounded-lg">
        {isEditing ? (
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)} // Update note text
            rows="6"
            className="w-full border rounded-md p-2"
          />
        ) : (
          <p className="text-gray-800">{note}</p> // Display note text
        )}
        <div className="mt-4">
          <button
            onClick={handleEdit}
            className="mr-2 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>
          <button
            onClick={handleRecord}
            className={`mr-2 px-4 py-2 ${isRecording ? 'bg-red-500' : 'bg-green-500'} text-white rounded-md`}
          >
            {isRecording ? 'Stop Recording' : 'Record Voice'}
          </button>
          <button
            onClick={handleComplete}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md"
          >
            Mark Complete
          </button>
        </div>
      </div>
    </div>
  );
}
