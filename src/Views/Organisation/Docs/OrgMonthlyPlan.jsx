import React from 'react'
import Subscription from './Subscription';
import JsonData from '../Utils/JsonData';

const OrgMonthlyPlan = () => {
    const { jsonOnly } = JsonData();
  return (
    <>
        <Subscription
            plans = {jsonOnly?.monthlyPlans}
            period={"month"}
        />
    </>
  )
}

export default OrgMonthlyPlan