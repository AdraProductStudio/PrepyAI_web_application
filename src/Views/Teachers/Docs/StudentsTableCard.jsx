import ButtonComponent from "Components/Button/Button";
import { useCustomNavigate } from "Components/CustomHooks";
import { Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Icons from "Utils/Icons";
import { updateModalShow } from "Views/Common/Slices/Common_slice";
import JsonData from "Views/Teachers/Utils/JsonData";
import { OverallModel } from "../Utils/OverallModal";
import { update_edit_student } from "../Slice/teachersSlice";
import SpinnerComponent from "Components/Spinner/Spinner";
import Img from "Components/Img/Img";
import Image from "Utils/Image";

const StudentsTableCard = ({className, navigate_to,data,glow}) => {
    console.log(data,"asdas")
    const { jsonOnly } = JsonData();
    const navigate = useCustomNavigate();
    const dispatch = useDispatch();

    const handleEdit = (student)=>{
        dispatch(update_edit_student({data:student}))
        dispatch(updateModalShow({ show: true, close_btn: true, modal_from: "studentsEdit", modal_type: "studentsEdit" }))
    }

    return (
        <Card className={`border-0 rounded-4 shadow-sm ${className}`}>
            <Card.Header className="bg-transparent pt-3 border-0">
                <h5>Students</h5>
                <p className="text-secondary fs-14 mb-1">{data?.total_count || 0} students</p>
            </Card.Header>
            <Card.Body className="p-0">
  {glow ? (
    <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center py-4">
      <SpinnerComponent />
      <p className="py-3">Getting Students Records</p>
    </div>
  ) : data?.students?.length > 0 ? (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            {jsonOnly?.student_table_headers?.map((header, index) => (
              <th
                key={index}
                className="text-center border student_table_heading"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="staff_table_data">
          {data?.students?.map((student, index) => (
            <tr key={index}>
              <td className="border-end">{index + 1}</td>
              <td className="border-end">{student.student_name}</td>
              <td className="border-end">{student.contact_no}</td>
              <td className="border-end">{student.student_email}</td>
              <td className="border-end">{student.status}</td>
              <td className="border-end">{student.number_of_attempts}</td>
              <td className="border-end">{student.student_reg_no}</td>
              <td className="text-center">
                <ButtonComponent
                  type="button"
                  className="btn-transparent"
                  buttonName={Icons?.edit_icon}
                  clickFunction={() => handleEdit(student)}
                />
                <ButtonComponent
                  type="button"
                  className="btn-transparent"
                  buttonName={Icons?.delete_icons}
                />
                <ButtonComponent
                  type="button"
                  className="btn-transparent"
                  buttonName={Icons?.extend_icon}
                  clickFunction={() =>
                    navigate(`${student.student_id}/${navigate_to}`)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center py-4">
      <Img
        src={Image?.no_data_found}
        alt="No Students Found"
        className="no_data_found_image"
      />
      <h6 className="mt-2">No Data Found</h6>
    </div>
  )}
</Card.Body>

                 <OverallModel />
        </Card>
    )
}

export default StudentsTableCard;