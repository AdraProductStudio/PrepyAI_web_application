import React, { useState } from 'react';
import InputOnly from 'Components/Input/inputOnly';
import Icons from 'Utils/Icons';
import Image from 'Utils/Image';
import { Card, Container } from 'react-bootstrap';
import ButtonComponent from 'Components/Button/Button';
import { IconBase } from 'react-icons';
import DashboardCard from 'Components/DashboardCard /DashboardCard ';

const UploadYourbook = () => {
    const [searchValue, setSearchValue] = useState("");

    // ✅ JSON book data
    const bookData = [
        {
            id: 1,
            title: "Physics Volume 1",
            chapters: 12,
            questionSets: 4,
            performance: "Developing"
        },
        {
            id: 2,
            title: "Chemistry Basics",
            chapters: 8,
            questionSets: 3,
            performance: "Excellent"
        },
        {
            id: 3,
            title: "Math Algebra",
            chapters: 10,
            questionSets: 5,
            performance: "Good"
        },
        {
            id: 4,
            title: "Math Algebra",
            chapters: 10,
            questionSets: 5,
            performance: "Good"
        },
        {
            id: 5,
            title: "Math Algebra",
            chapters: 10,
            questionSets: 5,
            performance: "Good"
        },
        {
            id: 6,
            title: "Math Algebra",
            chapters: 10,
            questionSets: 5,
            performance: "Good"
        },
        {
            id: 7,
            title: "Math Algebra",
            chapters: 10,
            questionSets: 5,
            performance: "Good"
        },
        {
            id: 8,
            title: "Math Algebra",
            chapters: 10,
            questionSets: 5,
            performance: "Good"
        },
        {
            id: 9,
            title: "Math Algebra",
            chapters: 10,
            questionSets: 5,
            performance: "Good"
        },
        {
            id: 10,
            title: "Math Algebra",
            chapters: 10,
            questionSets: 5,
            performance: "Good"
        },
 

    ];

    // ✅ Optional: Filter by search
    const filteredBooks = bookData.filter((book) =>
        book.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <>
          
        <Container className="bg-white p-4 rounded" style={{ height: '85.8vh', display: 'flex', flexDirection: 'column' }}>
            {/* Top Section */}
          
            <div className="row g-3 justify-content-between align-items-stretch">
                <div className="col-12 col-sm-6 col-lg-4">
                    <ButtonComponent
                        type="button"
                        className="btn p-1"
                        style={{ color: '#E73C3C', border: '2px dashed #E73C3C'}}
                        buttonName={<span className='d-flex d-flex align-items-center px-2 gap-2'>{Icons.UploadIcon} Upload Your Book</span>}
                    />
                </div>

                <div className="col-12 col-sm-6 col-lg-4">
                    <div className="input-group h-100 d-flex flex-column justify-content-center  rounded">
                        <InputOnly
                            type="text"
                            className="form-control border-1"
                            placeholder="Search..."
                            value={searchValue}
                            change={(e) => setSearchValue(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <hr />
            {/* Scrollable Card Section */}
            <div className="d-flex custom-scroll "style={{overflowY: 'auto', flexGrow: 1, maxHeight: '790px'}}>
                <div className="row g-3 ">
                    {filteredBooks.map((book) => (
                        <div className="col-12 col-md-6 p-1" key={book.id}>
                            <div className="p-4 rounded border-0 shadow bg-light-subtle h-100 d-flex flex-column justify-content-between"style={{ minHeight: '200px' }} >
                                <div className="d-flex justify-content-between align-items-center mb-">
                                    <h6 className="mb-0 text-dark">{book.title}</h6>
                                    <div className="text-danger cursor-pointer ">{Icons.deleteIcon }</div>
                                </div>
                                <hr className="my-2" />
                                <div className="d-flex justify-content-around align-items-center mt-3">
                                    <div
                                        className="me-3 d-flex align-items-center justify-content-center rounded"
                                        style={{ width: '60px', height: '70px' }} >
                                        <img
                                            src={Image.Pdf}
                                            alt="PDF"
                                            className="img-fluid"
                                            style={{ maxHeight: '100%', maxWidth: '100%' }}
                                        />
                                    </div>
                                    <div>
                                        <p className="mb-1 text-secondary">
                                            Chapters: <span className="text-dark">{book.chapters}</span>
                                        </p>
                                        <p className="mb-1 text-secondary">
                                            Question sets: <span className="f text-dark">{book.questionSets}</span>
                                        </p>
                                        <p className="mb-0 text-secondary">
                                            Performance: <span className="text-primary">{book.performance}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
        </>
    );
};

export default UploadYourbook;
