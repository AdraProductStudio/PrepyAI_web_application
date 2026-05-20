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
        <div className="col px-2">
          <div>
            <span className="text-dark mb-0 fs-15 me-2">Welcome</span>
            <Img src={Image.smile} alt="smile_image" width="20rem" />
          </div>
          <p className="text-dark mb-0 ">{commonState?.app_data?.user_name || "User"}</p>
        </div>

        <div className="col d-inline-flex flex-wrap justify-content-end">
          <div className='d-inline-block cursor-pointer' onClick={profileOnClick}>
            <div className="profile_circle d-flex justify-content-center align-items-center">
              <p className="mb-0 fs-4 p-2">{commonState?.app_data?.user_name?.slice(0,1)?.toUpperCase()}</p>
            </div>
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