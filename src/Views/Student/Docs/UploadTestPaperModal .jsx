import ButtonComponent from 'Components/Button/Button';
import { useState } from 'react';
import { Card, Button, Form, CardFooter } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import Icons from 'Utils/Icons';
import { updateModalShow } from 'Views/Common/Slices/Common_slice';


const UploadTestPaper = () => {
  const [subject, setSubject] = useState('');
  const [registerNumber, setRegisterNumber] = useState('');
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();


  return (
    <Card className="p-4 px-5 py-5 shadow-sm" style={{ maxWidth: '500px', margin: '0 auto', borderRadius: '12px' }}>
      {/* <h5 className=" mb-4">Upload Test Paper</h5> */}

      <Form>
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold" style={{ color: "#324482" }}>Subject Name</Form.Label>
          <Form.Control
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter Subject Name"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold" style={{ color: "#324482" }}>Register Number</Form.Label>
          <Form.Control
            type="text"
            value={registerNumber}
            onChange={(e) => setRegisterNumber(e.target.value)}
            placeholder="Enter Register Number"
          />
        </Form.Group>

        <div
          className="text-center p-4 border border-2 border-dashed rounded mb-2"
          style={{ borderColor: '#ff2e9a', cursor: 'pointer' }}
          onClick={() => document.getElementById('fileInput').click()}
        >
          {Icons.UploadIcon}
          <p className="mt-2 mb-1 " style={{ color: "#181D27", fontWeight: "400" }}>
            Drag & drop Your book File or <span style={{ color: '#ff2e9a', textDecoration: 'underline' }}>Browse</span>
          </p>
          <small className="text-muted">Format: pdf, docx, doc & Max file size: 1 GB</small>
        </div>

        <input
          type="file"
          id="fileInput"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ display: 'none' }}
        />

        {file && <div className="mt-2 text-muted small">📄 Selected: {file.name}</div>}
      </Form>

      {/* <div className=" col-12 d-flex justify-content-between mt-4 ">

        <ButtonComponent
          type="button"
          className="btn-transparent "
          style={{ border: '1px solid #0b0b0bff', color: '#575757' }}
          clickFunction={() => {
            setSubject('');
            setRegisterNumber('');
            setFile(null);
            dispatch(updateModalShow({ show: false }))
          }}
          buttonName={<span>
            cancel
          </span>}
        />
        <ButtonComponent
          type="button"
          className="btn-transparent "
          style={{
            background: 'linear-gradient(to right, #ff2e9a, #ff5c8a)',
            border: 'none'
          }}
          buttonName={<span>
            Upload Test Paper
          </span>}
        />
      </div> */}
      <div className="col-12 d-flex justify-content-between align-items-center gap-4  mt-4">
        <ButtonComponent
          type="button"
          className="btn-transparent flex-fill px-4"
          style={{ border: '1px solid #0b0b0bff', color: '#575757' }}
          clickFunction={() => {
            setSubject('');
            setRegisterNumber('');
            setFile(null);
            dispatch(updateModalShow({ show: false }))
          }}
          buttonName={<span>Cancel</span>}
        />

        <ButtonComponent
          type="button"
          className="btn-transparent flex-fill"
          style={{
            background: 'linear-gradient(to right, #ff2e9a, #ff5c8a)',
            border: 'none',
            color: '#fff'
          }}
          buttonName={<span>Upload Test Paper</span>}
        />
      </div>

    </Card>
  );
};

export default UploadTestPaper;

