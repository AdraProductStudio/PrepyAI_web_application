import React, { Fragment } from "react"
import { Form } from 'react-bootstrap'

const SelectBox = ({
    componentFrom,
    selectBoxSize,
    selectOptions,
    className,
    value,
    disableSelectBox,
    change,
    htmlFor,
    labelClassName,
    label,
    mandatory
}) => {

    return (
        <Fragment>
            {label ?
                <Form.Label htmlFor={htmlFor} className={labelClassName}>
                    {label}
                    {mandatory ? <span className='text-danger ms-1'>*</span> : null}
                </Form.Label>
                :
                null
            }
            <Form.Select size={selectBoxSize} className={className} disabled={disableSelectBox} onChange={change} value={value}>
                {componentFrom !== "Entries" ? <option value=""disabled>Select</option> : null}
                {selectOptions?.map((item, ind) => {
                    return <option value={item?.value || item} key={ind}>{item?.name || item}</option>
                })}
            </Form.Select>
        </Fragment>
    )
}

export default SelectBox