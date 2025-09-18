import { useCommonState } from 'Components/CustomHooks';
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
    const {commonState} = useCommonState();

    return (
        <div>
            {label ?
                <Form.Label htmlFor={htmlFor} className={labelClassName}>
                    {label}
                    {mandatory ? <span className='text-danger ms-1'>*</span> : null}
                </Form.Label>
                :
                null}
            <div  className={eyeFunction ? 'position-relative' : ''}>
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

                {/* <span className={` ${commonState?.app_data?.validated ? "eye_button_in_error" : "eye_button "} text-secondary`} onClick={eyeFunction}> {eyeIcon} </span>
                {inputError ? <p className='text-danger pt-2 ps-1 fs-15'> {inputError} </p> : null} */}
                <span className={` eye_button text-secondary`} onClick={eyeFunction}> {eyeIcon} </span>

            </div>
            {inputError ? <p className='text-danger pt-2 ps-1 fs-15'> {inputError} </p> : null}
        </div>
    )
}

export default Input