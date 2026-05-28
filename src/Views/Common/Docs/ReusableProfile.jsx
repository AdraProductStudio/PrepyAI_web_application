import ProfileCard from "Components/Card/ProfileCard";
import { useCommonState } from "Components/CustomHooks";

const ReusableProfile = () => {
    const { commonState } = useCommonState();

    return (
        <div className="h-100">
            <div className="container-fluid">
                <div className="w-100 row justify-content-between align-items-center border-bottom pb-3">
                    <div className="col">
                        <h5 className="mb-0">My Profile</h5>
                    </div>
                </div>

                <div className="w-100 row align-items-center justify-content-center small_header_content_main overflowY">
                    <ProfileCard userdata={commonState?.app_data}/>
                </div>
            </div>
        </div>
    )
}

export default ReusableProfile;