import GenerateQuestionSidebar from 'Components/Panel_compnent/GenerateQuestionSidebar'
import Header from 'Components/Panel_compnent/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { OverallModel } from '../Utils/OverallModal'

const GenerateQuestionLayout = () => {
  return (
    <div className="w-100 d-flex flex-wrap main_bg">
      <GenerateQuestionSidebar responsiveOn="xl" />

      <main className="col layout_main_content">
        <div className="container-fluid ">
          <header className="py-2">
            <Header offcanvasOn="lg" />
          </header>
          <div className="pt-3 main_content_height overflowY">
            <Outlet />
            <OverallModel />
          </div>
        </div>
      </main>
    </div>
  )
}

export default GenerateQuestionLayout