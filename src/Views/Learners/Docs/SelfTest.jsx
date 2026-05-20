import React from "react";
import { Card } from "react-bootstrap";

const SelfTest = () => {
  return (
    <div className="h-100">
      <Card className="h-100 border-0 rounded-3 ">
        <Card.Body className="d-flex flex-column justify-content-center overflow-auto">
          <div className=" d-flex justify-content-center">
            <div className="d-flex flex-column  justify-content-center align-items-center flex-wrap col-lg-9">
              <div className=" d-flex flex-column align-items-center col-11 text-center ">
                <h4>
                  PrepyAI is here to help you get ready for your exams or learn
                  things faster by testing your knowledge.
                </h4>
              </div>
              <div className="col-10">
                <ol className="fs-6 text-muted">
                  <li>
                    You can generate questions either from the entire textbook
                    or by choosing specific chapters or topics. To do this,
                    click on the book title , chapter, or topic you're
                    interested from the sidebar to generate questions
                  </li>
                  <li>
                    You'll get 20 questions about the topic you choose. After
                    answering them, you'll get a summary of your results
                  </li>
                  <li>You can also redo tests you've done before.</li>
                  <li>
                    If you didn't upload a book with bookmarks, the questions
                    will be random from the entire content.
                  </li>
                  <br />
                  <p>
                    We hope AnatomyAI makes studying for exams easier and boosts
                    your confidence in your learning journey!
                  </p>
                </ol>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SelfTest;
