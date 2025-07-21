import React, { useState } from 'react';
import InputOnly from 'Components/Input/inputOnly';
import Icons from 'Utils/Icons';
import Image from 'Utils/Image';
import { Container } from 'react-bootstrap';

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
            id: 3,
            title: "Math Algebra",
            chapters: 10,
            questionSets: 5,
            performance: "Good"
        },
        {
            id: 3,
            title: "Math Algebra",
            chapters: 10,
            questionSets: 5,
            performance: "Good"
        },
        {
            id: 3,
            title: "Math Algebra",
            chapters: 10,
            questionSets: 5,
            performance: "Good"
        },
        {
            id: 3,
            title: "Math Algebra",
            chapters: 10,
            questionSets: 5,
            performance: "Good"
        },
        {
            id: 3,
            title: "Math Algebra",
            chapters: 10,
            questionSets: 5,
            performance: "Good"
        },
        {
            id: 3,
            title: "Math Algebra",
            chapters: 10,
            questionSets: 5,
            performance: "Good"
        },
        {
            id: 3,
            title: "Math Algebra",
            chapters: 10,
            questionSets: 5,
            performance: "Good"
        },
        {
            id: 3,
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
        // <Container
        //     className="bg-white p-4 rounded"
        //     style={{ height: '84.8vh', display: 'flex', flexDirection: 'column', }}
        // >
        //     {/* Top Section */}
        //     <div className="row mb-4 justify-content-between align-items-stretch">
        //         <div className="col-12 col-md-6 col-lg-4 mb-2">
        //             <button
        //                 className="btn w-100 h-100 d-flex align-items-center justify-content-center gap-2 px-4 py-2 rounded"
        //                 style={{
        //                     border: '2px dashed #E73C3C',
        //                     backgroundColor: 'white',
        //                     color: '#E73C3C',
        //                 }}
        //             >
        //                 {Icons.UploadIcon}
        //                 <span style={{ color: "#000" }}>Upload Your Book</span>
        //             </button>
        //         </div>

        //         <div className="col-12 col-md-6 col-lg-4 mb-2">
        //             <div
        //                 className="input-group h-100 d-flex flex-columns align-items-center shadow-sm rounded"
        //                 style={{
        //                     border: '2px solid rgb(186, 184, 184)',
        //                     padding: '0.5rem',
        //                     backgroundColor: 'white',
        //                 }}
        //             >
        //                 <InputOnly
        //                     type="text"
        //                     className="form-control border-0"
        //                     placeholder="Search..."
        //                     value={searchValue}
        //                     change={(e) => setSearchValue(e.target.value)}
        //                 />
        //             </div>
        //         </div>
        //     </div>

        //     <hr />

        //     {/* Scrollable Card Section */}
        //     {/* <div className='d-flex' style={{ overflowY: 'auto', flexGrow: 1,}}>
        //         <div className="row  d-flex flex-column  " >
        //             {filteredBooks.map((book) => (
        //                 <div className="col-12 col-sm-6 col-lg-6" key={book.id}>
        //                     <div className="p-3 rounded border bg-light-subtle h-100">
        //                         <div className="d-flex justify-content-between align-items-center mb-2">
        //                             <h6 className="mb-0 text-dark">{book.title}</h6>
        //                             <div className="text-danger cursor-pointer">{Icons.Delete}</div>
        //                         </div>
        //                         <hr className="my-2" />
        //                         <div className="d-flex justify-content-around align-items-center">
        //                             <div
        //                                 className="me-3 d-flex align-items-center justify-content-center rounded"
        //                                 style={{ width: '60px', height: '70px', fontWeight: 'bold' }}
        //                             >
        //                                 <img
        //                                     src={Image.Pdf}
        //                                     alt="PDF"
        //                                     className="img-fluid"
        //                                     style={{ maxHeight: '100%', maxWidth: '100%' }}
        //                                 />
        //                             </div>
        //                             <div>
        //                                 <p className="mb-1 text-secondary">
        //                                     Chapters: <span className="fw-bold text-dark">{book.chapters}</span>
        //                                 </p>
        //                                 <p className="mb-1 text-secondary">
        //                                     Question sets: <span className="fw-bold text-dark">{book.questionSets}</span>
        //                                 </p>
        //                                 <p className="mb-0 text-secondary">
        //                                     Performance: <span className="text-primary">{book.performance}</span>
        //                                 </p>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             ))}
        //         </div>
        //     </div> */}
        //     <div
        //         className="d-flex"
        //         style={{
        //             overflowY: 'auto',
        //             flexGrow: 1,
        //             maxHeight: '650px', 
        //             paddingRight: '8px',
        //         }}
        //     >
        //         <div className="row g-3 w-100"> 
        //             {filteredBooks.map((book) => (
        //                 <div className="col-12 col-md-6 py-2 px-2" key={book.id}>
        //                     <div
        //                         className="p-3 rounded border bg-light-subtle h-100"
        //                         style={{ minHeight: '180px' }} 
        //                     >
        //                         <div className="d-flex justify-content-between align-items-center mb-2">
        //                             <h6 className="mb-0 text-dark">{book.title}</h6>
        //                             <div className="text-danger cursor-pointer">{Icons.Delete}</div>
        //                         </div>
        //                         <hr className="my-2" />
        //                         <div className="d-flex justify-content-around align-items-center mt-4">
        //                             <div
        //                                 className="me-3 d-flex align-items-center justify-content-center rounded"
        //                                 style={{ width: '60px', height: '70px', fontWeight: 'bold' }}
        //                             >
        //                                 <img
        //                                     src={Image.Pdf}
        //                                     alt="PDF"
        //                                     className="img-fluid"
        //                                     style={{ maxHeight: '100%', maxWidth: '100%' }}
        //                                 />
        //                             </div>
        //                             <div>
        //                                 <p className="mb-1 text-secondary">
        //                                     Chapters: <span className="fw-bold text-dark">{book.chapters}</span>
        //                                 </p>
        //                                 <p className="mb-1 text-secondary">
        //                                     Question sets: <span className="fw-bold text-dark">{book.questionSets}</span>
        //                                 </p>
        //                                 <p className="mb-0 text-secondary">
        //                                     Performance: <span className="text-primary">{book.performance}</span>
        //                                 </p>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             ))}
        //         </div>
        //     </div>


        // </Container>
        // <Container
        //     className="bg-white p-4 rounded"
        //     style={{ height: '84.8vh', display: 'flex', flexDirection: 'column' }}
        // >
        //     {/* Top Section */}
        //     <div className="row mb-4 g-3 justify-content-between align-items-stretch">
        //         <div className="col-12 col-sm-6 col-lg-4">
        //             <button
        //                 className="btn w-100 h-100 d-flex align-items-center justify-content-center gap-2 px-4 py-2 rounded"
        //                 style={{
        //                     border: '2px dashed #E73C3C',
        //                     backgroundColor: 'white',
        //                     color: '#E73C3C',
        //                 }}
        //             >
        //                 {Icons.UploadIcon}
        //                 <span style={{ color: '#000' }}>Upload Your Book</span>
        //             </button>
        //         </div>

        //         <div className="col-12 col-sm-6 col-lg-4">
        //             <div
        //                 className="input-group h-100 d-flex flex-column justify-content-center shadow-sm rounded"
        //                 style={{
        //                     border: '2px solid rgb(186, 184, 184)',
        //                     padding: '0.5rem',
        //                     backgroundColor: 'white',
        //                 }}
        //             >
        //                 <InputOnly
        //                     type="text"
        //                     className="form-control border-0"
        //                     placeholder="Search..."
        //                     value={searchValue}
        //                     change={(e) => setSearchValue(e.target.value)}
        //                 />
        //             </div>
        //         </div>
        //     </div>

        //     <hr />

        //     {/* Scrollable Card Section */}
        //     <div
        //         className="d-flex"
        //         style={{
        //             overflowY: 'auto',
        //             flexGrow: 1,
        //             maxHeight: '650px',
        //             paddingRight: '8px',
        //         }}
        //     >
        //         <div className="row g-3 w-100">
        //             {filteredBooks.map((book) => (
        //                 <div className="col-12 col-md-6 col-xl-4" key={book.id}>
        //                     <div
        //                         className="p-3 rounded border bg-light-subtle h-100 d-flex flex-column justify-content-between"
        //                         style={{ minHeight: '200px' }}
        //                     >
        //                         <div className="d-flex justify-content-between align-items-center mb-2">
        //                             <h6 className="mb-0 text-dark">{book.title}</h6>
        //                             <div className="text-danger cursor-pointer">{Icons.Delete}</div>
        //                         </div>

        //                         <hr className="my-2" />

        //                         <div className="d-flex justify-content-around align-items-center mt-3">
        //                             <div
        //                                 className="me-3 d-flex align-items-center justify-content-center rounded"
        //                                 style={{ width: '60px', height: '70px' }}
        //                             >
        //                                 <img
        //                                     src={Image.Pdf}
        //                                     alt="PDF"
        //                                     className="img-fluid"
        //                                     style={{ maxHeight: '100%', maxWidth: '100%' }}
        //                                 />
        //                             </div>
        //                             <div>
        //                                 <p className="mb-1 text-secondary">
        //                                     Chapters: <span className="fw-bold text-dark">{book.chapters}</span>
        //                                 </p>
        //                                 <p className="mb-1 text-secondary">
        //                                     Question sets: <span className="fw-bold text-dark">{book.questionSets}</span>
        //                                 </p>
        //                                 <p className="mb-0 text-secondary">
        //                                     Performance: <span className="text-primary">{book.performance}</span>
        //                                 </p>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             ))}
        //         </div>
        //     </div>
        // </Container>
        <Container
            className="bg-white p-4 rounded"
            style={{ height: '84.8vh', display: 'flex', flexDirection: 'column' }}
        >
            {/* Top Section */}
            <div className="row mb-4 g-3 justify-content-between align-items-stretch">
                <div className="col-12 col-sm-6 col-lg-4">
                    <button
                        className="btn w-100 h-100 d-flex align-items-center justify-content-center gap-2 px-4 py-2 rounded"
                        style={{
                            border: '2px dashed #E73C3C',
                            backgroundColor: 'white',
                            color: '#E73C3C',
                        }}
                    >
                        {Icons.UploadIcon}
                        <span style={{ color: '#000' }}>Upload Your Book</span>
                    </button>
                </div>

                <div className="col-12 col-sm-6 col-lg-4">
                    <div
                        className="input-group h-100 d-flex flex-column justify-content-center shadow-sm rounded"
                        style={{
                            border: '2px solid rgb(186, 184, 184)',
                            padding: '0.5rem',
                            backgroundColor: 'white',
                        }}
                    >
                        <InputOnly
                            type="text"
                            className="form-control border-0"
                            placeholder="Search..."
                            value={searchValue}
                            change={(e) => setSearchValue(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <hr />

            {/* Scrollable Card Section */}
            <div
                className="d-flex"
                style={{
                    overflowY: 'auto',
                    flexGrow: 1,
                    maxHeight: '650px',
                    paddingRight: '8px',
                }}
            >
                <div className="row g-3 w-100">
                    {filteredBooks.map((book) => (
                        <div className="col-12 col-md-6 p-2" key={book.id}>
                            <div
                                className="p-3 rounded border bg-light-subtle h-100 d-flex flex-column justify-content-between"
                                style={{ minHeight: '200px' }}
                            >
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <h6 className="mb-0 text-dark">{book.title}</h6>
                                    <div className="text-danger cursor-pointer">{Icons.deleteIcon}</div>
                                </div>

                                <hr className="my-2" />

                                <div className="d-flex justify-content-around align-items-center mt-3">
                                    <div
                                        className="me-3 d-flex align-items-center justify-content-center rounded"
                                        style={{ width: '60px', height: '70px' }}
                                    >
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



    );
};

export default UploadYourbook;
