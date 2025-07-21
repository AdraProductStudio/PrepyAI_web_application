import FolderCard from 'Components/Card/FolderCard';
import React, { useState } from 'react'
import JsonDataStudent from '../Utils/JsonDataStudent';
import ButtonComponent from 'Components/Button/Button';
import { useCustomNavigate } from 'Components/CustomHooks';


const ClassRooms = () => {
  const navigate = useCustomNavigate();
  const jsondata = JsonDataStudent();

  const folders = ["Docs", "Client Files", "Raw", "G1-Pt", "Label"];
  const [searchText, setSearchText] = useState('');

  const filteredFolders = folders.filter(folder =>
    folder.toLowerCase().includes(searchText.toLowerCase())
  );
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3 px-2 py-2 flex-wrap gap-2">
        <h4 className="heading-1">Class Room</h4>
        <ButtonComponent
          type="button"
          className="btn"
          style={{
            background: 'linear-gradient(to right, #ff2e9a, #ff5c8a)',
            border: 'none',
            color: "#FFF",
          }}
          buttonName={<span>+ Join Class Room</span>}
        />
      </div>
      <hr />
      <div
        className="container-fluid"
        style={{
          maxHeight: '80vh',
          overflowY: 'auto',
          paddingRight: '8px',
        }}
      >
        <div className="row">
          {jsondata?.jsonOnly?.folderData?.map((item, index) => (
            <div
              key={index}
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex p-2"
            >
              <div
                className="card shadow-sm flex-fill"
                style={{
                  borderRadius: '12px',
                  height: '100%',
                  border: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <FolderCard item={item} navigate={navigate}/>
              </div>
            </div>
          ))}
        </div>
      </div>


    </>
  )
}

export default ClassRooms
