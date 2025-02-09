import React, { useState, useRef } from "react";

export default function CameraUpload() {
  const [message, setMessage] = useState("");
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Start the camera
  const startCamera = async () => {
    try {
      const userStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setStream(userStream);
      if (videoRef.current) {
        videoRef.current.srcObject = userStream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      setMessage("Failed to access camera.");
    }
  };

  // Stop the camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  // Capture an image from the camera
  const captureImage = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const formData = new FormData();
      formData.append("file", blob, "captured_image.jpg");

      try {
        const response = await fetch("http://127.0.0.1:5000/track", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        if (response.ok) {
          setMessage({
            message: data.message,
            predicted_fruit_freshness: data.predicted_fruit_freshness,
          });
        } else {
          setMessage({
            message: `Error: ${data.message || "Unknown error"}`,
            predicted_fruit_freshness: "",
          });
        }
      } catch (error) {
        setMessage({
          message: "Failed to connect to the backend!",
          predicted_fruit_freshness: "",
        });
        console.error(error);
      }
    }, "image/jpeg");
  };

  return (
    <div className="text-center py-10">
      <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-200 to-green-600 text-transparent bg-clip-text">
        Fruit Quality Analysis
      </h2>
      <p className="text-gray-200 mb-10 max-w-xl mx-auto text-lg">
        Real-time fruit quality assessment using advanced AI technology. Start
        your analysis by enabling the camera.
      </p>
      <div className="p-6 border rounded-2xl shadow-lg max-w-md mx-auto bg-white dark:bg-gray-900 text-center">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          Live Camera Upload
        </h2>
        <div className="relative w-full h-64 border rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <canvas ref={canvasRef} className="hidden" />
        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-4">
          <button
            onClick={startCamera}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-300 shadow-md cursor-pointer"
          >
            Start Camera
          </button>
          <button
            onClick={stopCamera}
            className={`cursor-pointer px-4 py-2 rounded-lg transition duration-300 shadow-md ${
              stream
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
            disabled={!stream}
          >
            Stop Camera
          </button>
          <button
            onClick={captureImage}
            className={`cursor-pointer px-4 py-2 rounded-lg transition duration-300 shadow-md ${
              stream
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
            disabled={!stream}
          >
            Capture & Upload
          </button>
        </div>
        <div className="mt-4 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm">
          {message && <h1 className="font-medium">{message.message}</h1>}
          {message && (
            <h1 className="font-semibold text-lg text-green-600 dark:text-green-400">
              {message.predicted_fruit_freshness}
            </h1>
          )}
        </div>
      </div>
    </div>
  );
}
