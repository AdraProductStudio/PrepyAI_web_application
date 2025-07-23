import ButtonComponent from "Components/Button/Button";
import { Card } from "react-bootstrap";
import Icons from "Utils/Icons";

export default function SubjectsCard({
    cardClassName = "col-3 m-3 shadow border-0",
    cardBodyClassName = "p-0",
    cardTitleClassName = "p-4 pb-3 border-bottom",
    onclick, data
}) {
    const items = [{ icons: Icons?.no_of_books, content: 'No of Books', count: data?.no_of_books || 0 }, { icons: Icons?.no_of_tests, content: 'No of Tests', count: data?.no_of_tests || 0 }]

    return (
        <Card className={cardClassName}>
            <Card.Body className={cardBodyClassName}>
                <Card.Title className={cardTitleClassName}>
                    <div className="w-100 d-flex align-items-center">
                        <div className="col-10">
                            <h6>{data?.subject || ''}</h6>
                            <p className="text-secondary fs-13 mb-0">{data?.teacher_name || ''}</p>
                        </div>
                        <div className="col-2 text-end">
                            <ButtonComponent
                                type="button"
                                className="btn"
                                buttonName={Icons?.delete_icons}
                                clickFunction={onclick}
                            />
                        </div>
                    </div>
                </Card.Title>

                <div className="px-4 pb-4">
                    {items?.map((item) => (
                        <div className="w-100 d-flex align-items-end py-2">
                            <div className="col-10 fs-15 text-secondary">
                                <span className="pe-3">{item.icons}</span>
                                {item.content}
                            </div>
                            <div className="col-2 fs-16 text-secondary">
                                <span className="pe-3">:</span>
                                {item.count}
                            </div>
                        </div>
                    ))}
                </div>
            </Card.Body>
        </Card>
    );
}
