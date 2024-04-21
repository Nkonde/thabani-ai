// App.tsx
import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';
import Tesseract from 'tesseract.js';
import './App.css';

const App: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [isFrontCamera, setIsFrontCamera] = useState<boolean>(true);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
      Tesseract.recognize(imageSrc, 'eng')
        .then(({ data: { text } }) => {
          setExtractedText(text);
        })
        .catch(error => {
          console.error('Error during OCR:', error);
          setExtractedText(null);
        });
    }
  }, [webcamRef]);

  const switchCamera = useCallback(() => {
    setIsFrontCamera(prevState => !prevState);
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
        <button className="capture-button" onClick={capture}>Capture</button>
        <button className="switch-camera-button" onClick={switchCamera}>Switch Camera</button>
      </div>
      {capturedImage && <img className="captured-image" src={capturedImage} alt="captured" />}
      {extractedText && <div className="extracted-text">Extracted Text: {extractedText}</div>}
    </div>
  );
};

export default App;
