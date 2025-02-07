import React, { useState, useRef } from 'react';
import { Camera, FileText, X } from 'lucide-react';

const WebcamAnalysisPage = () => {
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsWebcamActive(true);
    } catch (err) {
      console.error("Error accessing webcam:", err);
      setReport({
        type: 'error',
        message: 'Failed to access webcam. Please ensure you have granted camera permissions.'
      });
    }
  };

  const stopWebcam = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsWebcamActive(false);
  };

  const generateReport = async () => {
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setReport({
      type: 'success',
      timestamp: new Date().toLocaleString(),
      details: {
        defectsFound: 2,
        quality: 'Good',
        recommendations: 'Minor improvements needed in sorting process'
      }
    });
    setIsAnalyzing(false);
  };

  return (
    <div className="text-center pt-10 pb-45 px-4">
  <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-200 to-green-600 text-transparent bg-clip-text">
    Fruit Quality Analysis
  </h2>
  
  <p className="text-[#e0e0e0] mb-10 max-w-1xl mx-auto text-[1.25rem]">
    Real-time fruit quality assessment using advanced AI technology. Start your analysis by enabling the camera.
  </p>

  {/* Webcam and Controls Section */}
  <div className="mt-20 flex items-start justify-between max-w-4xl mx-auto">
    {/* Webcam Section (Left Half) */}
    <div className="w-full md:w-1/2 relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
      {isWebcamActive ? (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
          <button
            onClick={stopWebcam}
            className="absolute top-4 right-4 p-2 bg-gradient-to-r from-red-500 to-red-700 rounded-full hover:from-red-700 hover:to-red-500 transition-all duration-300"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <Camera className="w-16 h-16 text-gray-400" />
        </div>
      )}
    </div>

    {/* Content Section (Right Half) */}
    <div className="w-full md:w-1/2 space-y-6 px-8">
      {/* Description */}
      <p className="text-[#e0e0e0] mb-8 text-[1.25rem]">
        Real-time fruit quality assessment using advanced AI technology. Start your analysis by enabling the camera.
      </p>

      {/* Controls */}
      <div className="space-x-4 mb-10">
        <button
          onClick={startWebcam}
          disabled={isWebcamActive}
          className="cursor-pointer px-6 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white hover:from-green-700 hover:to-green-500 rounded-3xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="flex items-center gap-2">
            <Camera className="w-4 h-4" />
            Start Camera
          </span>
        </button>

        <button
          onClick={generateReport}
          disabled={!isWebcamActive || isAnalyzing}
          className="cursor-pointer px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-700 text-white hover:from-cyan-700 hover:to-cyan-500 rounded-3xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            {isAnalyzing ? 'Analyzing...' : 'Generate Report'}
          </span>
        </button>
      </div>

      {/* Report Display */}
      {report && (
        <div className="mt-10 max-w-2xl mx-auto">
          {report.type === 'error' ? (
            <div className="text-red-500 bg-red-50 p-4 rounded-lg">
              {report.message}
            </div>
          ) : (
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-[#e0e0e0] p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-200 to-green-600 text-transparent bg-clip-text">
                Analysis Report
              </h3>
              <div className="space-y-2 text-[1.25rem]">
                <p>Time: {report.timestamp}</p>
                <p>Defects Found: {report.details.defectsFound}</p>
                <p>Quality Rating: {report.details.quality}</p>
                <p>Recommendations: {report.details.recommendations}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  </div>
</div>

  );
};

export default WebcamAnalysisPage;