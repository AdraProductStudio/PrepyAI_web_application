import { Card } from "react-bootstrap"

const NotesDisplayCard = ({
    className, style,
    params
}) => {

    return (
        <Card className={`display_notes ${className}`} style={style}>
            <Card.Header className="border_bottom_dashed py-3">
                <Card.Title className="fs-16 mb-0">{params?.title || 'Meeting Agenda'}</Card.Title>
            </Card.Header>
            <Card.Body className="display_notes_content">
                {params?.notes || 'Outline the agenda for the team meeting: discuss project updates, brainstorm new ideas, and assign action items.  Outline the agenda for the team meeting: discuss project updates, brainstorm new ideas, and assign action items.Outline the agenda for the team meeting: discuss project updates.'}
            </Card.Body>
        </Card>
    )
}

export default NotesDisplayCard