import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Camera, Search, X } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader.jsx'
import GlassCard from '../../components/common/GlassCard.jsx'
import NeonButton from '../../components/common/NeonButton.jsx'

export default function Scan() {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [stream, setStream] = useState(null)
  const [imageData, setImageData] = useState(null)
  const [error, setError] = useState('')

  const startCamera = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      setStream(s)
      if (videoRef.current) {
        videoRef.current.srcObject = s
        videoRef.current.play()
      }
    } catch (err) {
      setError('कैमरा एक्सेस करने की अनुमति नहीं मिली।')
    }
  }

  const captureImage = () => {
    if (!videoRef.current) return
    const canvas = canvasRef.current
    const video = videoRef.current
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext('2d')
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    const dataUrl = canvas.toDataURL('image/png')
    setImageData(dataUrl)
    stopCamera()
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
  }

  useEffect(() => { return () => stopCamera() }, [])

  const searchOnGoogle = () => {
    // Opens Google Lens in a new tab for immediate image search results
    window.open('https://lens.google.com/', '_blank')
  }

  return (
    <div className="page-container px-5 pt-4" style={{ zIndex: 1 }}>
      <PageHeader title="Scan to Answer" subtitle="कैमरा स्कैन करके उत्तर पाएं" />
      
      {error && <GlassCard color="pink" className="p-4 mb-4 text-center"><p className="text-sm text-prakriti-red">{error}</p></GlassCard>}

      <GlassCard color="pink" className="p-5 mb-4">
        <div className="relative w-full h-64 rounded-xl overflow-hidden bg-black flex items-center justify-center">
          {imageData ? (
            <img src={imageData} alt="Captured" className="w-full h-full object-contain" />
          ) : (
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        <div className="mt-4 space-y-3">
          {!stream && !imageData && (
            <NeonButton variant="pink" size="md" fullWidth icon={Camera} onClick={startCamera}>कैमरा शुरू करें</NeonButton>
          )}
          
          {stream && (
            <NeonButton variant="green" size="md" fullWidth icon={Camera} onClick={captureImage}>चित्र लें (Capture)</NeonButton>
          )}
          
          {imageData && (
            <>
              <NeonButton variant="gold" size="md" fullWidth icon={Search} onClick={searchOnGoogle}>Google पर खोजें</NeonButton>
              <NeonButton variant="ghost" size="sm" fullWidth icon={X} onClick={() => { setImageData(null); startCamera() }}>पुनः स्कैन करें</NeonButton>
            </>
          )}
        </div>
      </GlassCard>
    </div>
  )
}