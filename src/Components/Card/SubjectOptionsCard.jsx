const { Card } = require("react-bootstrap")

const SubjectOptionsCard = ({
    className, icon, title, onClickCard
}) => {

    return (
        <Card className={`h-100 border-0 rounded-3 shadow-sm ${className} pointer`} onClick={onClickCard}>
            <Card.Body className="d-flex align-items-center">
                <span className="me-3 option_icon_bg">{icon || 'asd'}</span>
                <span className="brand-link-color fs-15 fw-bold ">{title || ''}</span>
            </Card.Body>
        </Card>
    )
}

export default SubjectOptionsCard;