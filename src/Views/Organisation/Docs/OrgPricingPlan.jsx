import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import JsonData from "../Utils/JsonData";

const OrgPricingPlan = () => {
  const { jsonOnly } = JsonData();

  return (
    <div className="h-100 d-flex flex-column">
      <article className="flex-grow-1">
        <section>
          <h1 className="text-center pb-4 pt-3">Plans for Your Need</h1>
          <div className="d-flex justify-content-center align-items-center">
            <ul className="navbar-nav d-flex flex-row align-items-center justify-content-center bg-white p-1 rounded-4 shadow gap-1">
              {jsonOnly?.pricingPlan_navItems.map((item, idx) => (
                <li key={idx} className="nav-item">
                  <NavLink to={item.to} end className={({ isActive }) => `nav-link rounded-4 ${isActive ? "pricing_plan_capsule text-white" : ""}`}>
                    <span className="px-2">{item.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="pt-4">
          <Outlet />
        </section>
      </article>
    </div>
  );
};

export default OrgPricingPlan;
