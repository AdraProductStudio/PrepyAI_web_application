import Form from 'react-bootstrap/Form';

const Input = ({
    componentFrom,
    className,
    htmlFor,
    type,
    placeholder,
    label,
    labelClassName,
    mandatory,
    inputError,
    change,
    multiple,
    value,
    keyDown,
    disabled,
    max,
    min,
    eyeFunction,
    eyeIcon,
    accept,
    ref,
    name,
    readOnly
}) => {

    return (
        <div className={eyeFunction ? 'position-relative' : ''}>
            {label ?
                <Form.Label htmlFor={htmlFor} className={labelClassName}>
                    {label}
                    {mandatory ? <span className='text-danger ms-1'>*</span> : null}
                </Form.Label>
                :
                null}

            <Form.Control
                ref={ref}
                type={type} id={htmlFor}
                accept={accept}
                placeholder={placeholder}
                className={className}
                onChange={change}
                onKeyDown={keyDown}
                multiple={multiple}
                value={value}
                disabled={disabled}
                max={max} min={min}
                name={name}
                readOnly={readOnly}
            />

            <span className='eye_button text-secondary' onClick={eyeFunction}> {eyeIcon} </span>
            {inputError ? <p className='text-danger pt-2 ps-1 fs-15'> {inputError} </p> : null}
        </div>
    )
}

export default Input