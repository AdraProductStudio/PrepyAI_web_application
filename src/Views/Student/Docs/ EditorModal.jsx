import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";



const EditorModal = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [show, setShow] = useState(true); // Control visibility
    const [value, setValue] = useState('');

  const handleSave = () => {
    console.log("Title:", title);
    console.log("Content:", content);
    setShow(false); // Hide after saving
  };

  const handleClose = () => {
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      className="p-4 shadow rounded-3 mx-auto mt-4"
      style={{ maxWidth: "900px", minHeight: "70vh", position: "relative", background: "#fff" }}
    >
      {/* Close Button */}
      <Button
        variant="light"
        onClick={handleClose}
        style={{
          position: "absolute",
          top: 15,
          right: 15,
          border: "none",
          fontSize: "1.2rem",
        }}
      >
        {/* <RxCross2 /> */}
      </Button>

      {/* Title Input */}
      {/* <Form.Control
        className="mb-4 border-0 fs-5 text-muted"
        placeholder="ADD TITLE HERE"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      /> */}

      {/* Content Editor */}
      {/* <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        placeholder="Start writing..."
      /> */}

      {/* Footer Buttons */}
      <div className="d-flex justify-content-end gap-2 mt-4">
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default EditorModal;



