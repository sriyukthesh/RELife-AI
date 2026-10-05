import React, { useState, useRef, useEffect } from 'react';
import { Camera, RefreshCw, Check, AlertCircle, Upload, ShieldCheck, Sparkles, SwitchCamera } from 'lucide-react';
import { analyzeComponentImages, AiIdentificationResult } from '../../services/cameraAi';

interface CameraVerificationProps {
  onVerificationComplete: (result: {
    frontImage: string;
    backImage: string;
    aiResult: AiIdentificationResult;
  }) => void;
  onCancel: () => void;
}

export const CameraVerification: React.FC<CameraVerificationProps> = ({
  onVerificationComplete,
  onCancel
}) => {
  const [currentSide, setCurrentSide] = useState<'front' | 'back'>('front');
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);
  const [tempCapturedImage, setTempCapturedImage] = useState<string | null>(null);

  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [streamObj, setStreamObj] = useState<MediaStream | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [userHint, setUserHint] = useState<string>('');

  // Initialize live camera stream
  useEffect(() => {
    let activeStream: MediaStream | null = null;
    let isMounted = true;

    async function startCamera() {
      try {
        setCameraError(null);
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error('Camera access API is not supported in this browser environment.');
        }

        // Try environment camera first, then fallback to any available video input (e.g. laptop webcam)
        try {
          activeStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: { ideal: facingMode }, width: { ideal: 1280 }, height: { ideal: 720 } },
            audio: false
          });
        } catch (firstErr) {
          // Fallback to basic video constraint without facingMode restriction
          activeStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
          });
        }

        if (isMounted && videoRef.current && activeStream) {
          videoRef.current.srcObject = activeStream;
          videoRef.current.setAttribute('playsinline', 'true');
          videoRef.current.muted = true;
          await videoRef.current.play();
          setStreamObj(activeStream);
          setCameraActive(true);
        }
      } catch (err: any) {
        console.warn('Camera initialization notice:', err);
        if (isMounted) {
          setCameraError(
            err.name === 'NotAllowedError'
              ? 'Camera permission denied. Please allow camera permissions in your browser, or upload a photo directly.'
              : 'Webcam stream could not be started directly in this sandbox. You can use image upload or click Capture to take a sample frame.'
          );
          setCameraActive(false);
        }
      }
    }

    startCamera();

    return () => {
      isMounted = false;
      if (activeStream) {
        activeStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [facingMode]);

  // Flip camera between front (user) and back (environment)
  const toggleCameraFacing = () => {
    if (streamObj) {
      streamObj.getTracks().forEach(t => t.stop());
    }
    setCameraActive(false);
    setFacingMode(prev => (prev === 'environment' ? 'user' : 'environment'));
  };

  // Capture real frame from video element
  const captureFrame = () => {
    if (videoRef.current && videoRef.current.videoWidth > 0) {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 1280;
      canvas.height = video.videoHeight || 720;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
        setTempCapturedImage(dataUrl);
      }
    } else {
      // Fallback if camera stream didn't deliver video frame
      const canvas = document.createElement('canvas');
      canvas.width = 640;
      canvas.height = 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#1c1917';
        ctx.fillRect(0, 0, 640, 480);
        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 24px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`RELIFE CAMERA: ${currentSide.toUpperCase()} CAPTURE`, 320, 240);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '14px sans-serif';
        ctx.fillText('Live frame captured at ' + new Date().toLocaleTimeString(), 320, 270);
        setTempCapturedImage(canvas.toDataURL('image/jpeg', 0.9));
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setTempCapturedImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const confirmCapturedSide = () => {
    if (!tempCapturedImage) return;

    if (currentSide === 'front') {
      setFrontImage(tempCapturedImage);
      setTempCapturedImage(null);
      setCurrentSide('back');
    } else {
      setBackImage(tempCapturedImage);
      setTempCapturedImage(null);
      runAiVerification(frontImage!, tempCapturedImage);
    }
  };

  const retakeCapturedSide = () => {
    setTempCapturedImage(null);
  };

  const runAiVerification = async (front: string, back: string) => {
    setAnalyzing(true);
    try {
      const result = await analyzeComponentImages(front, back, userHint.trim() || undefined);
      onVerificationComplete({
        frontImage: front,
        backImage: back,
        aiResult: result
      });
    } catch (e) {
      console.error('Gemini AI identification failure', e);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-stone-200 shadow-lg overflow-hidden max-w-2xl mx-auto">
      {/* Step Header */}
      <div className="bg-emerald-950 text-white p-4 flex items-center justify-between">
        <div>
          <div className="text-[11px] text-emerald-400 uppercase tracking-wider font-semibold">
            Live Optical Camera Protocol · Step 2 of 4
          </div>
          <h3 className="text-base font-bold">
            {currentSide === 'front' ? 'Capture Component Front Side' : 'Capture Component Back Side'}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {cameraActive && (
            <button
              onClick={toggleCameraFacing}
              className="p-1.5 rounded bg-emerald-900/80 hover:bg-emerald-800 text-emerald-300 hover:text-white text-xs flex items-center gap-1 cursor-pointer transition-colors"
              title="Switch camera"
            >
              <SwitchCamera className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Flip Camera</span>
            </button>
          )}
          <div className="flex items-center gap-1.5 text-xs bg-emerald-900/60 px-2.5 py-1 rounded border border-emerald-800">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>{currentSide === 'front' ? 'Side 1 / 2' : 'Side 2 / 2'}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Analyzing Loading State */}
        {analyzing ? (
          <div className="py-16 text-center">
            <div className="w-14 h-14 border-4 border-emerald-800 border-t-emerald-400 rounded-full animate-spin mx-auto mb-4"></div>
            <h4 className="text-base font-bold text-stone-900 flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600 animate-pulse" />
              <span>Gemini AI Inspecting Component...</span>
            </h4>
            <p className="text-xs text-stone-500 max-w-md mx-auto mt-2 leading-relaxed">
              Gemini AI is analyzing markings, silkscreen text, package form factor, pin conditions, and checking for burns or cracked solder joints.
            </p>
          </div>
        ) : (
          <div>
            {/* Instruction banner */}
            <div className="mb-4 p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs text-stone-700 flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-800 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {currentSide === 'front' ? '1' : '2'}
                </span>
                <div>
                  <p className="font-semibold text-stone-900">
                    {currentSide === 'front'
                      ? 'Place the front side of the component inside the viewfinder.'
                      : 'Turn the component over and place the solder side inside the frame.'}
                  </p>
                  <p className="text-stone-500 text-[11px] mt-0.5">
                    Hold steady so the part number and pins are sharply in focus.
                  </p>
                </div>
              </div>
              {cameraActive && !tempCapturedImage && (
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 text-[10px] font-bold shrink-0">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                  <span>LIVE CAMERA</span>
                </div>
              )}
            </div>

            {/* Camera / Preview Viewport */}
            <div className="relative aspect-4/3 w-full bg-stone-950 rounded-lg overflow-hidden flex items-center justify-center border border-stone-800 shadow-inner">
              {tempCapturedImage ? (
                <div className="relative w-full h-full">
                  <img
                    src={tempCapturedImage}
                    alt="Captured preview"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute top-3 left-3 bg-emerald-950/85 text-white text-xs px-2.5 py-1 rounded backdrop-blur-xs flex items-center gap-1.5 shadow-xs">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Photo Captured · Confirm to continue</span>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full">
                  {/* Live Video Element */}
                  <video
                    ref={videoRef}
                    playsInline
                    autoPlay
                    muted
                    className="w-full h-full object-cover"
                  />

                  {/* Visual Alignment Overlay Box */}
                  <div className="absolute inset-8 border-2 border-dashed border-emerald-400/80 rounded-lg pointer-events-none flex flex-col items-center justify-between p-4">
                    <span className="bg-stone-900/80 text-emerald-300 text-[11px] font-mono px-2 py-0.5 rounded">
                      [ RELIFE COMPONENT FRAME ]
                    </span>
                    <span className="text-[11px] text-white/90 bg-stone-900/70 px-3 py-1 rounded-full text-center">
                      Align component package and pins here
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Camera Error Message if any */}
            {cameraError && !tempCapturedImage && (
              <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Camera note:</p>
                  <p className="text-amber-700 mt-0.5">{cameraError}</p>
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-200">
              {tempCapturedImage ? (
                <>
                  <button
                    onClick={retakeCapturedSide}
                    className="px-4 py-2 text-xs font-semibold text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-md cursor-pointer flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Retake Photo</span>
                  </button>
                  <button
                    onClick={confirmCapturedSide}
                    className="px-5 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-700 rounded-md cursor-pointer flex items-center gap-1.5 shadow-xs"
                  >
                    <Check className="w-4 h-4" />
                    <span>
                      {currentSide === 'front' ? 'Confirm & Capture Back Side' : 'Confirm & Run Gemini AI Verification'}
                    </span>
                  </button>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-2 text-xs font-medium text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-md cursor-pointer flex items-center gap-1.5"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload File Instead</span>
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={onCancel}
                      className="px-3 py-2 text-xs text-stone-500 hover:text-stone-700 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={captureFrame}
                      className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-700 rounded-md cursor-pointer flex items-center gap-1.5 shadow-xs"
                    >
                      <Camera className="w-4 h-4" />
                      <span>Capture {currentSide === 'front' ? 'Front Side' : 'Back Side'}</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
