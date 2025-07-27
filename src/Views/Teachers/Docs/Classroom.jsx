import ButtonComponent from "Components/Button/Button";
import ClassroomCard from "Components/Card/ClassroomCard";
import { useCustomNavigate } from "Components/CustomHooks";
import Img from "Components/Img/Img";
import Icons from "Utils/Icons";
import Image from "Utils/Image";

const Classroom = () => {
    const navigate = useCustomNavigate();
    const data = { no_of_stu: 30, no_of_books: 5, title: "Classroom A", date: "2023-10-01" };

    return (
        <div className="h-100">
            <div className="container-fluid">
                <div className="w-100 row justify-content-between align-items-center border-bottom pb-3">
                    <div className="col">
                        <h5 className="mb-0">Classrooms</h5>
                    </div>
                    <div className="col text-end">
                        <ButtonComponent type="button" className="btn-brand-color border py-2">
                            {Icons.add_icon}
                            <span className="lign-middle">Create Classroom</span>
                        </ButtonComponent>
                    </div>
                </div>

                <div className="w-100 row align-content-start small_header_content_main overflowY">
                    {false ?
                        <div className="w-100 h-100 row align-items-center justify-content-center">
                            <div className="col-6 text-center">
                                <Img src={Image?.no_data_found} alt="No classes Found" className="no_data_found_image" />
                                <h6>No classes were added</h6>
                                <p className="fs-15 text-secondary">Create and send the link to your students to join the classes.</p>
                                <ButtonComponent type="button" className="btn-brand-color border py-2">
                                    {Icons.add_icon}
                                    <span className="lign-middle">Create Classroom</span>
                                </ButtonComponent>
                            </div>
                        </div>
                        :
                        Array.from({ length: 5 }, (_, index) => (
                            <div className="col-3 p-2" key={index}>
                                <ClassroomCard cardClassName="w-100 h-100" data={data} buttonName="View" onclick={() => navigate(`/teachers_dashboard/classrooms/${index}`)} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Classroom;