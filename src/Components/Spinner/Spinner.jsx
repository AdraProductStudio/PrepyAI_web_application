import Spinner from 'react-bootstrap/Spinner';

const SpinnerComponent = ({
    componentFrom,
    variant,
    className
}) => {
    return (
        <Spinner animation="border" role="status" variant={variant} className={className} >
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    )
}

export default SpinnerComponent