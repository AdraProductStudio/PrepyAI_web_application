import ButtonComponent from 'Components/Button/Button';
import React from 'react'
import { Card } from 'react-bootstrap'
import { MdOutlineCheckCircleOutline } from "react-icons/md";
import Icons from 'Utils/Icons';

const Subscription = ({plans, period}) => {
  return (
    <div className='h-100'>
        <article className='row row-cols-1 row-cols-md-2 row-cols-xxl-4'>
            {
                plans?.map(plan => (
                    <section key={plan.type} className='px-3 pb-4 pt-md-2'>
                        <Card className={`rounded-5 px-4 py-3 shadow overflow-auto custom-scroll ${plan.active ? 'brand_color_pricing_plan' : ''}`} style={{height: "40rem"}}>
                            <Card.Body className=''>
                                <div className='d-flex justify-content-between align-items-center'>
                                    {plan.active ? Icons.subscriptionSVG("active") : Icons.subscriptionSVG()}
                                    {
                                        plan.active 
                                        ? <Card.Text className='border border-light py-2 px-3 rounded-4 bg-light'><span  style={{color: "hsla(324, 100%, 46%, 1)"}}>Current Plan</span></Card.Text>
                                        : null
                                    }
                                </div>
                                <Card.Subtitle className='pt-4 fs-5 pb-2'>{plan.type}</Card.Subtitle>
                                <Card.Text style={{fontSize: "0.8rem"}}>{plan.desc}</Card.Text>
                                <Card.Text className='fs-1 align-items-center pb-1'>&#36;{plan.amount} <span className='fs-6'>/ per {period ? period : "month"}</span></Card.Text>
                                <ButtonComponent 
                                    buttonName={"Get Started"}
                                    className={` rounded-3 w-100 py-2 mb-2 ${plan.active ? 'btn-light' : 'btn-outline-dark'}` }
                                />
                                <hr />
                                <Card.Subtitle className='pt-3 pb-2'>Features </Card.Subtitle>
                                {
                                    plan.features.map( (feature, idx) => (
                                        <Card.Text key={idx} className='d-flex justify-content-start align-items-start gap-2' style={{margin: "0 0 1rem 0"}}>
                                            <span>
                                                <MdOutlineCheckCircleOutline className={`${plan.active ? 'text-light' : 'text-dark'} d-flex mt-1`} size={18}/>
                                            </span>
                                            <span>
                                                {feature}
                                            </span>
                                        </Card.Text>
                                    ))
                                }
                            </Card.Body>
                        </Card>
                    </section>
                ))
            }
        </article>

    </div>
  )
}

export default Subscription