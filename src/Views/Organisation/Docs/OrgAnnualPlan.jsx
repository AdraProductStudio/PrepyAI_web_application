import React from 'react'
import Subscription from './Subscription';
import JsonData from '../Utils/JsonData';

const OrgAnnualPlan = () => {
    const { jsonOnly } = JsonData();
  return (
    <>
        <Subscription
          plans={jsonOnly?.annualPlans}
          period={"year"}   
        />
    </>
  )
}

export default OrgAnnualPlan