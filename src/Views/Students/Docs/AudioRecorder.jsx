import Img from "Components/Img/Img";
import React, { useState, useRef } from "react";
import Image from "Utils/Image";
import Icons from "Utils/Icons";
import ButtonComponent from "Components/Button/Button";
import { useCommonState, useDispatch } from "Components/CustomHooks";
import { convertAudioToText } from "../Actions/StudentAction";
import Spinner from "Components/Spinner/CustomSpinner";

const AudioRecorder = ({ onComplete }) => {
  const [recording, setRecording] = useState("idle")
  const [audioUrl, setAudioUrl] = useState(null)
  const [audioBlob, setAudioBlob] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const mediaRecorderRef = useRef(null)
  const audioRef = useRef(null)
  const chunks = useRef([])

  const { generate_question } = useCommonState()?.studentState
  const dispatch = useDispatch()

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    mediaRecorderRef.current = new MediaRecorder(stream)

    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) chunks.current.push(event.data)
    }

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunks.current, { type: "audio/wav" })
      chunks.current = []

      const url = URL.createObjectURL(blob)
      setAudioUrl(url)
      setAudioBlob(blob)

      setRecording("completed")

      if (onComplete) onComplete(url, blob)
    }

    mediaRecorderRef.current.start()
    setRecording("recording")
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      setRecording("completed")
    }
  }

  const cancelRecording = () => {
    setAudioUrl(null)
    setAudioBlob(null)
    setRecording("idle")
    setIsPlaying(false)
  }

  const handleSubmitAudio = () => {
    if (!audioBlob) return
    let test_id = generate_question?.long_questions?.test_id
    let question_no = generate_question?.recorded_que_no
    const formData = new FormData()
    formData.append("answer_file", audioBlob, "recording.wav")
    formData.append("test_id", test_id || "")
    formData.append("question_no",question_no || "")
    dispatch(convertAudioToText(formData,test_id,question_no))
  }

  return (
 <div className="d-flex flex-column justify-content-center align-items-center gap-3">
      {recording === "idle" && (
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          onClick={startRecording}
        >
          <Img src={Image.record} width="150px" height="150px" fluid />
          <p className="fw-bold text-secondary">
            Tap and Start speaking ....
          </p>
        </div>
      )}

      {recording === "recording" && (
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          onClick={stopRecording}
        >
          <Img src={Image.recording} width="150px" height="150px" fluid />
          <p className="fw-bold text-secondary">Recording....</p>
        </div>
      )}
      {generate_question?.recording ? <Spinner /> :
        recording === "completed" && audioUrl && (
          <div className="d-flex flex-column align-items-center justify-content-center w-100 px-3">
            <audio
              ref={audioRef}
              src={audioUrl}
              onEnded={() => setIsPlaying(false)}
            />
            <div
              className="d-flex align-items-center justify-content-center gap-3 my-4"
              style={{ cursor: "pointer" }}
              onClick={togglePlay}
            >
              <span style={{ fontSize: "40px" }}>
                {isPlaying ? Icons.pauseIcon : Icons.playIcon}
              </span>
              <Img
                src={Image.record_isolation}
                width="70%"
                height="100%"
                fluid
              />
              <span onClick={cancelRecording}>{Icons.close_icon}</span>
            </div>

            <ButtonComponent
              type="button"
              className="btn-brand-color px-5"
              buttonName="Continue"
              clickFunction={handleSubmitAudio}
            />
          </div>
        )}
    </div>
   
  );
};

export default AudioRecorder;
