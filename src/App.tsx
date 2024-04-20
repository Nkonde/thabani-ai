// App.tsx
import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';
import Tesseract from 'tesseract.js';

const App: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string | null>(null);

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

  return (
    <div>
      <h1>Camera Image Text Extraction</h1>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        style={{ width: '50%', height: '50%' }}
      />
      <button onClick={capture}>Capture</button>
      {capturedImage && <img src={capturedImage} alt="captured" />}
      {extractedText && <div>Extracted Text: {extractedText}</div>}
    </div>
  );
};

export default App;
