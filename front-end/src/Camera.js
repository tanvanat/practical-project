import React, { useEffect, useRef, useState } from 'react';

const Camera = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null); // To draw and capture the image
    const [capturedImage, setCapturedImage] = useState(null);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            })
            .catch((error) => {
                console.error("Error accessing the camera:", error);
                alert("Unable to access the camera. Please check permissions.");
            });

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
                </div>
            )}
        </div>
    );
};

export default Camera;
