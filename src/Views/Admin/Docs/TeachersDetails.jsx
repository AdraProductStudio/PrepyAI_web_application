import ButtonComponent from "Components/Button/Button"; 
import Icons from "Utils/Icons";

const TeachersDetails = () => {
    const table_data = [
        { s_no: 1, staff_name: "John Doe", subject: "Mathematics", contact_no: "1234567890", email: "test@example.com", qualification: "M.Sc Mathematics" },
        { s_no: 1, staff_name: "John Doe", subject: "Mathematics", contact_no: "1234567890", email: "test@example.com", qualification: "M.Sc Mathematics" },
        { s_no: 1, staff_name: "John Doe", subject: "Mathematics", contact_no: "1234567890", email: "test@example.com", qualification: "M.Sc Mathematics" },
        { s_no: 1, staff_name: "John Doe", subject: "Mathematics", contact_no: "1234567890", email: "test@example.com", qualification: "M.Sc Mathematics" },
        { s_no: 1, staff_name: "John Doe", subject: "Mathematics", contact_no: "1234567890", email: "test@example.com", qualification: "M.Sc Mathematics" },
        { s_no: 1, staff_name: "John Doe", subject: "Mathematics", contact_no: "1234567890", email: "test@example.com", qualification: "M.Sc Mathematics" },
    ]

    return (
        <div className="table-responsive">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        {['S.No', 'Staff Name', 'Subject', 'Contact No', 'Email', 'Qualification', 'Action']?.map((header, index) => (
                            <th key={index} className="text-center staff_table_heading">{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="staff_table_data">
                    {table_data?.map((row, index) => (
                        <tr>
                            <td key={index} className="text-center">{index + 1}</td>
                            <td key={index} className="text-center">{row?.staff_name}</td>
                            <td key={index} className="text-center">{row?.subject}</td>
                            <td key={index} className="text-center">{row?.contact_no}</td>
                            <td key={index} className="text-center">{row?.email}</td>
                            <td key={index} className="text-center">{row?.qualification}</td>
                            <td key={index} className="text-center">
                                <ButtonComponent type="button" className="btn-transparent" buttonName={Icons?.edit_icon} />
                                <ButtonComponent type="button" className="btn-transparent`" buttonName={Icons?.delete_icons} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TeachersDetails;