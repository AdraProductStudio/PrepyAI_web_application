import Img from "Components/Img/Img";
import React, { useState, useRef } from "react"
import Image from "Utils/Image";
import Icons from "Utils/Icons";
import ButtonComponent from "Components/Button/Button";

const AudioRecorder = ({ onComplete }) => {
    const [recording, setRecording] = useState("idle")
    const [audioUrl, setAudioUrl] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const mediaRecorderRef = useRef(null)
    const audioRef = useRef(null)
    const chunks = useRef([])

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause()
        } else {
            audioRef.current.play()
        }
        setIsPlaying(!isPlaying)
    };

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        mediaRecorderRef.current = new MediaRecorder(stream)

        mediaRecorderRef.current.ondataavailable = (event) => {
            if (event.data.size > 0) chunks.current.push(event.data)
        };

        mediaRecorderRef.current.onstop = () => {
            const audioBlob = new Blob(chunks.current, { type: "audio/webm" })
            chunks.current = []
            const url = URL.createObjectURL(audioBlob)
            setAudioUrl(url)
            setRecording("completed")

            if (onComplete) onComplete(url, audioBlob)
        };

        mediaRecorderRef.current.start()
        setRecording("recording")

    }

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop()
            setRecording("completed")
        }
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center gap-3">
            {recording === "idle" && (
                <div className="d-flex flex-column justify-content-center align-items-center" onClick={startRecording}>
                    <Img
                        src={Image.record}
                        width="150px"
                        height="150px"
                        fluid
                    />
                    <p className="fw-bold text-secondary">Tap and Start speaking ....</p>
                </div>
            )}

            {recording === "recording" && (
                <div className="d-flex flex-column justify-content-center align-items-center" onClick={stopRecording}>
                    <Img
                        src={Image.recording}
                        width="150px"
                        height="150px"
                        fluid
                    />
                    <p className="fw-bold text-secondary">Recording....</p>
                </div>
            )}

            {recording === "completed" && audioUrl && (
                <div className="d-flex flex-column align-items-center justify-content-center w-100 px-3">
                    <audio ref={audioRef} src={audioUrl} onEnded={() => setIsPlaying(false)}/>
                    <div className="d-flex align-items-center justify-content-center gap-3 my-4" style={{ cursor: "pointer"}} onClick={togglePlay}>
                        <span style={{ fontSize: "40px" }}>{isPlaying ? Icons.pauseIcon : Icons.playIcon}</span>
                        <Img src={Image.record_isolation} width="70%" height="100%" fluid />
                        <span>{Icons.close_icon}</span>
                    </div>

                    <ButtonComponent
                        type="button"
                        className="btn-brand-color px-5"
                        buttonName="Continue"
                    />
                </div>
            )}


        </div>
    )
}

export default AudioRecorder;
