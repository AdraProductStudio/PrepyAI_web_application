import ButtonComponent from 'Components/Button/Button';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Icons from 'Utils/Icons';

const FolderCard = ({ item }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    return (
        <div className="card p-2 h-100 border-0 " style={{ borderRadius: "12px", background: "#FFF", }}  >
            {/* Header */}
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-2">
                <div className="col-12 col-md-8 ">
                    <h5 className="heading-1 mb-3">{item?.name || ""}</h5>
                    <p className="text-muted small mb-0">
                        Created on : {item?.created_on || ""}
                    </p>
                </div>
                <div className="col-12 col-md-4 d-flex justify-content-end">
                    {/* <ButtonComponent
                        type="button"
                        className="btn"
                        buttonName={
                            item?.status
                                ? item?.status.charAt(0).toUpperCase() + item?.status.slice(1)
                                : ""
                        }
                        clickFunction={() => handleFolderClick(item)}
                    /> */}
                    <ButtonComponent
                        type="button"
                        className="btn py-2 ms-2"
                        buttonName={Icons.menuIcon}
                    />
                </div>
            </div>

            {/* Divider */}
            <hr className="divider mt-1" />

            {/* File List */}
            <div className="my-b ">
                {item?.children?.map(
                    (folder, index) =>
                        folder?.type === "folder" && (
                            <div
                                key={index}
                                className="d-flex justify-content-between align-items-center mb-3 "
                                style={{ fontSize: "15px" }}
                            >
                                <div className="d-flex align-items-center gap-2">
                                    <span>{Icons.bookIcon}</span> {/* Replace with your icon */}
                                    <span>{folder?.name}</span>
                                </div>
                                <span className="text-muted">: {folder?.children?.length || 0}</span>
                            </div>
                        )
                )}
            </div>
            <ButtonComponent
                variant="light"
                className="w-100 mt-2 py-2 border-1 border-dashed text-pink"
                clickFunction={() => navigate(`/student/docs/${item?.id}`)}
                style={{
                    borderColor: "#B2B9C0",
                    background: "#B2B9C0",
                    color: "#FFFFFF",
                }}
                buttonName="View"
            />


        </div>

    );
};

export default FolderCard; 