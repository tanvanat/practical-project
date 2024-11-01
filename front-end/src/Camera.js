import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import imageCompression from 'browser-image-compression'; // Import the image compression library

const Camera = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error("Error accessing the camera:", error);
                alert("Unable to access the camera. Please check permissions.");
            }
        };

        startCamera();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = videoRef.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

    const takePicture = () => {
        if (canvasRef.current && videoRef.current) {
            const context = canvasRef.current.getContext('2d');
            context.drawImage(videoRef.current, 0, 0, 640, 480);
            const imageData = canvasRef.current.toDataURL('image/png');
            setCapturedImage(imageData);
        }
    };

    const saveImage = async () => {
        if (capturedImage) {
            try {
                // Compress the image before uploading
                const compressedFile = await imageCompression(capturedImage, {
                    maxSizeMB: 1, // Set max size to 1MB
                    useWebWorker: true,
                });

                const formData = new FormData();
                formData.append('image', compressedFile);

                // Upload the compressed image to your API
                const response = await axios.post('/api/camera/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log('Image saved successfully:', response.data);

                // Navigate to /home/upload first
                console.log('Navigating to /home/upload...');
                navigate('/home/upload');

                // After navigating, retrieve profile data
                const profileResponse = await axios.get(`/api/profile/${response.data.imageId}`);
                console.log('Profile image data:', profileResponse.data);

                // Navigate to /home/newsession
                console.log('Navigating to /home/newsession...');
                navigate('/home/newsession');
            } catch (error) {
                console.error('Error saving image:', error);
                alert('Failed to save image. Please try again.');
            }
        }
    };

    const retakePicture = () => {
        setCapturedImage(null); // Clear the captured image
    };

    return (
        <div className="flex flex-col items-center">
            <video
                ref={videoRef}
                autoPlay
                playsInline
                style={{ width: '640px', height: '480px', border: '1px solid black', marginBottom: '20px' }}
            />
            <button 
                onClick={takePicture} 
                style={{ padding: '10px 20px', marginBottom: '20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
                Take Picture
            </button>

            {/* Canvas for capturing the image (hidden) */}
            <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }}></canvas>

            {/* Display captured image if available */}
            {capturedImage && (
                <div>
                    <h3>Captured Image:</h3>
                    <img src={capturedImage} alt="Captured" style={{ width: '320px', height: '240px', border: '1px solid black' }} />
                    <div style={{ marginTop: '10px' }}>
                        <button onClick={saveImage} style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                            Use This Image
                        </button>
                        <button onClick={retakePicture} style={{ padding: '10px 20px', marginLeft: '10px', backgroundColor: '#FF4136', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                            Take a Picture Again
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Camera;
