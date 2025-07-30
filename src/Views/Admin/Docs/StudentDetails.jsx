import ButtonComponent from "Components/Button/Button";
import Icons from "Utils/Icons";

const StudentDetails = () => {
    const table_data = [
        { s_no: 1, student_name: "John Doe", contact_no: "1234567890", email: "test@example.com", status: "Developing", no_of_attempts: 3, reg_no: "12345" },
        { s_no: 2, student_name: "Jane Smith", contact_no: "0987654321", email: "jane@example.com", status: "Developing", no_of_attempts: 2, reg_no: "12346" },
        { s_no: 3, student_name: "Alice Johnson", contact_no: "5555555555", email: "alice@example.com", status: "Developing", no_of_attempts: 1, reg_no: "12347" },
        { s_no: 4, student_name: "Bob Brown", contact_no: "4444444444", email: "bob@example.com", status: "Developing", no_of_attempts: 4, reg_no: "12348" },
        { s_no: 5, student_name: "Charlie Davis", contact_no: "3333333333", email: "charlie@example.com", status: "Developing", no_of_attempts: 5, reg_no: "12349" },
        { s_no: 6, student_name: "David Wilson", contact_no: "2222222222", email: "david@example.com", status: "Developing", no_of_attempts: 6, reg_no: "12350" },
    ]

    return (
        <div className="table-responsive">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        {['S.No', 'Student Name', 'Contact No', 'Email', 'Status', 'No Of Attempts', 'Reg no', 'Action']?.map((header, index) => (
                            <th key={index} className="text-center staff_table_heading">{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="staff_table_data">
                    {table_data?.map((row, index) => (
                        <tr key={index}>
                            <td className="text-center">{index + 1}</td>
                            <td className="text-center">{row?.student_name}</td>
                            <td className="text-center">{row?.contact_no}</td>
                            <td className="text-center">{row?.email}</td>
                            <td className="text-center">{row?.status}</td>
                            <td className="text-center">{row?.no_of_attempts}</td>
                            <td className="text-center">{row?.reg_no}</td>
                            <td className="text-center">
                                <ButtonComponent type="button" className="btn-transparent`" buttonName={Icons?.delete_icons} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default StudentDetails;