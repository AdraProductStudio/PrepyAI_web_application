import React, { useEffect, useState } from 'react';
import ButtonComponent from 'Components/Button/Button';
import Icons from 'Utils/Icons';
import { useCommonState, useDispatch } from 'Components/CustomHooks';
import HeaderCard from 'Components/Card/HeaderCard';
import { useLocation } from 'react-router-dom';

const Header = ({
  offcanvasOn,
  offcanvasOnButton
}) => {
  const { commonState } = useCommonState();
  const dispatch = useDispatch()


  const headerContentFunc = () => {
    const location = useLocation();



    const isActive = (path) => location.pathname === path ? "active" : "";
    const isDashboard = location.pathname === "/student_dashboard";

    const allowedPaths = ['/student_dashboard',];
    const shouldShowGreeting = allowedPaths.includes(location.pathname);;

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);

      return () => clearInterval(interval);
    }, []);

    const formatTime = (date) => {
      return date.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    };

    const getGreeting = () => {
      const hour = currentTime.getHours();
      if (hour < 12) return "Good Morning 🤩";
      else if (hour < 17) return "Good Afternoon 😊";
      else return "Good Evening 🌙";
    };
    // return <>
    //   <div className="col-12 d-flex flex-wrap align-items-center justify-content-between ">
    //     <div className="col">
    //       {/* {commonState?.currentMenuName} */}
    //       {/* <div className={["/", "/classroom", "/classroom/viewpage"].includes(location.pathname) ? "d-none" : "searchbox"}>
    //         <input type="text" className="searchbox-input" placeholder="Search..." />
    //       </div> */}
    //       <div className="d-flex align-items-center ms-3 me-auto">
    //         {shouldShowGreeting && (
    //           <div className="greeting-text pe-4">
    //             <div className="text-muted" style={{ fontSize: '14px' }}>
    //               {getGreeting()} - {formatTime(currentTime)}
    //             </div>
    //             <div className="fw-semibold" style={{ fontSize: '17px' }}>
    //               Prakash
    //             </div>
    //           </div>
    //         )}
    //       </div>
    //     </div>

    //     <div className="col d-inline-flex flex-wrap justify-content-end">

    //       <div className='d-inline-block'>
    //         <ButtonComponent
    //           type="button"
    //           className="px-2 py-2 border rounded-3 me-3"
    //           // clickFunction={() => dispatch(handleLogout())}
    //           buttonName={
    //             <span>
    //               <span className='p-1'>{Icons.Notificationicon}</span>
    //             </span>
    //           }
    //         />
    //         <ButtonComponent
    //           type="button"
    //           className="px-2 py-2 border rounded-3 me-3"
    //           // clickFunction={() => dispatch(handleLogout())}
    //           buttonName={
    //             <span>
    //               <span className='p-1'>{Icons.messageIcon}</span>
    //             </span>
    //           }
    //         />
    //         <ButtonComponent
    //           type="button"
    //           className="px-2 py-2 border rounded-3 me-3"
    //           // clickFunction={() => dispatch(handleLogout())}
    //           buttonName={
    //             <span>
    //               <span className='p-1'>{Icons.ProfileIcon}</span>
    //             </span>
    //           }
    //         />
    //       </div>

    //       {
    //         offcanvasOn ?
    //           <div className={`d-inline-block header-icon-tag-width ${offcanvasOn !== '' ? `d-${offcanvasOn}-none` : 'd-none'}`}>
    //             <ButtonComponent
    //               type="button"
    //               className="btn-transparent"
    //               clickFunction={offcanvasOnButton}
    //               buttonName={Icons.menuIcon}
    //             />
    //           </div>
    //           :
    //           null
    //       }
    //     </div>
    //   </div>
    // </>
    return <>
      <div className="row align-items-center px-3 py-2">
        {/* Left Section (Greeting) */}
        <div className="col-12 col-md-6 mb-2 mb-md-0 d-flex align-items-center">
          <div className="d-flex align-items-center">
            {shouldShowGreeting && (
              <div className="greeting-text">
                <div className="text-muted" style={{ fontSize: '14px' }}>
                  {getGreeting()} - {formatTime(currentTime)}
                </div>
                <div className="fw-semibold mt-2" style={{ fontSize: '17px' }}>
                  Pradheep kumar
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Section (Buttons) */}
        <div className="col-12 col-md-6 d-flex justify-content-md-end justify-content-start flex-wrap align-items-center gap-2">
          <ButtonComponent
            type="button"
            className="px-2 py-2 border rounded-3"
            buttonName={<span className="p-1">{Icons.Notificationicon}</span>}
          />
          <ButtonComponent
            type="button"
            className="px-2 py-2 border rounded-3"
            buttonName={<span className="p-1">{Icons.messageIcon}</span>}
          />
          <ButtonComponent
            type="button"
            className="px-2 py-2 border rounded-3"
            buttonName={<span className="p-1">{Icons.ProfileIcon}</span>}
          />

          {/* Show hamburger menu only on certain screen sizes */}
          {offcanvasOn && (
            <div className={`d-${offcanvasOn}-none`}>
              <ButtonComponent
                type="button"
                className="btn-transparent"
                clickFunction={offcanvasOnButton}
                buttonName={Icons.menuIcon}
              />
            </div>
          )}
        </div>
      </div>

    </>

  }

  return (

    <HeaderCard
      cardClassName='w-100 border-0 header-card shadow-sm'
      cardTitleClassName="row justify-content-end mb-0"
      cardBodyClassName='py-2 header-body'
      cardContent={headerContentFunc()}
    />

  )
}

export default Header