// App.tsx
import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';
import Tesseract from 'tesseract.js';
import Modal from './Modal';
import './App.css';

const App: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [isFrontCamera, setIsFrontCamera] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const captureAndExtractText = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      Tesseract.recognize(imageSrc, 'eng')
        .then(({ data: { text } }) => {
          setExtractedText(text);
          setIsModalOpen(true);
        })
        .catch(error => {
          console.error('Error during OCR:', error);
          setExtractedText(null);
        });
    }
  }, []);

  const switchCamera = useCallback(() => {
    setIsFrontCamera(prevState => !prevState);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <div className="app-container">
      <h1 className="app-title">Camera Image Text Extraction</h1>
      <div className="webcam-container">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            facingMode: isFrontCamera ? 'user' : 'environment',
          }}
          style={{ width: '100%', height: 'auto' }}
        />
        <button className="capture-button" onClick={captureAndExtractText}>Capture and Extract Text</button>
        <button className="switch-camera-button" onClick={switchCamera}>Switch Camera</button>
      </div>
      <Modal isOpen={isModalOpen} closeModal={closeModal} text={extractedText} />
    </div>
  );
};

export default App;
