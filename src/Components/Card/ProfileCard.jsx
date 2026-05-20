import { Card } from "react-bootstrap";
import Image from "Utils/Image";

const ProfileCard = ({
    userdata
}) => {

    return (
        <Card className="border-0 rounded-4 profile_card_body_height shadow-sm">
            <Card.Body className="row align-items-center justify-content-center p-4">
                <div className="col-3 p-2">
                    <Card className="border rounded-4 profile_left_card_height">
                        <Card.Header className="border-bottom row align-items-center bg-transparent py-4">
                            <div className="col-4 text-center">
                                <img src={userdata?.user_image || Image?.default_prfile_pic} alt="Profile" className="header_profile_image rounded-circle" />
                            </div>
                            <div className="col">
                                <p className="mb-0">
                                    Hello 👋
                                </p>
                                <h5 className="mb-0">{userdata?.user_name || "Unknown User"}</h5>
                            </div>
                        </Card.Header>
                    </Card>
                </div>
                <div className="col-9 p-2">

                </div>
            </Card.Body>
        </Card>
    )
}

export default ProfileCard;