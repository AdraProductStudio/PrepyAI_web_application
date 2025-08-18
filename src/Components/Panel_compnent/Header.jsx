import React from "react";
import ButtonComponent from 'Components/Button/Button';
import Icons from 'Utils/Icons';
import { useCommonState } from 'Components/CustomHooks';
import HeaderCard from 'Components/Card/HeaderCard';
import Img from "Components/Img/Img";
import Image from "Utils/Image";

const Header = ({
  offcanvasOn, offcanvasOnButton, children,
  profileOnClick
}) => {
  const { commonState } = useCommonState();

  const headerContentFunc = () => {
    return (
      <div className="col-12 d-flex flex-wrap align-items-center justify-content-between ">
        {commonState?.app_data?.current_location === "/student_dashboard/generate_question" ? <div className="col px-2">
            <span className="text-dark mb-0 fs-6">Welcome</span>
            <p className="text-dark mb-0 fs-4 fw-bold">Prakash</p>
          </div>: <div className="col"> {commonState?.app_data?.currentMenuName}</div>
       
        }

        <div className="col d-inline-flex flex-wrap justify-content-end">
          <div className='d-inline-block' onClick={profileOnClick}>
            <Img src={commonState?.app_data?.user_image || Image.default_prfile_pic} alt="Profile" className="rounded-circle me-2 pointer header_profile_image" />
          </div>

          {offcanvasOn ?
            <div className={`d-inline-block ${offcanvasOn ? `d-${offcanvasOn}-none` : 'd-none'}`}>
              <ButtonComponent type="button" className="btn-transparent" clickFunction={offcanvasOnButton} buttonName={Icons.menuIcon} />
            </div>
            :
            null}
        </div>
      </div>
    )
  }

  return (
    <HeaderCard
      cardClassName='w-100 border-0 header-card'
      cardTitleClassName="row justify-content-end mb-0"
      cardBodyClassName='py-3 header-body'
      cardContent={children ? null : headerContentFunc()}>
      {children}
    </HeaderCard>

  )
}

export default Header