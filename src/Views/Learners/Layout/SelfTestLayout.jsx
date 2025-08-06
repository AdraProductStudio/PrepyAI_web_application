import ButtonComponent from 'Components/Button/Button'
import React from 'react'
import { Card } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import { Inputfunctions } from 'ResuableFunctions/Inputfunctions'
import JsonData from 'Views/Learners/Utils/JsonData'

const SelfTestLayout = () => {

  const { jsxJson } = JsonData();

  return (
    <>

      <div className="h-100">
        <div className="container-fluid">
          <div className="w-100 row justify-content-between align-items-center border-bottom pb-3">
            <div className="col-12 col-lg-6">
              <h5 className='header-text'>
                Chapter 1 . An introduction To the Human Body
              </h5>
            </div>
            <div className="col-12 col-lg-6">
              <div className="row mx-0 align-items-center">
                {Inputfunctions(jsxJson?.test_options_dropdown || [])}
                <div className='col-12 col-sm-6 col-xl-4 px-3'>
                  <ButtonComponent
                    className="btn btn-primary w-100"
                    type="button"
                    buttonName="Generate Question"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="learners-main-content">
            <Outlet />
          </div>
        </div>
      </div>

    </>
  )
}

export default SelfTestLayout
