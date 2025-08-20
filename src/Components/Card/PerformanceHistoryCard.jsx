import React from "react";
import { Card, Row, Col } from 'react-bootstrap';
import JsonData from 'Views/Students/Utils/JsonData';
import PerformanceAndHistoryChart from 'Components/Charts/PerformanceAndHistoryChart';
import PerformanceHistoryBookCard from './PerformanceHistoryBookCard';
import Img from "Components/Img/Img";
import Image from "Utils/Image";

const PerformanceHistoryCard = ({ history_data, performance_data }) => {
  const { jsonOnly } = JsonData();

  return (
    <Card className="shadow-sm rounded-4 border-0 h-100">
      <Card.Header className="bg-transparent border-0 py-3 border-bottom">
        Performance & History
      </Card.Header>
      <Card.Body className="performance_history_body">
        <Row className="align-items-center">
          <Col xs={12} xl={6} className="d-flex justify-content-center">
            <div style={{ width: '100%', maxWidth: '300px', height: '200px' }}>
              <PerformanceAndHistoryChart />
            </div>
          </Col>

          <Col xs={12} xl={6}>
            <div className="d-flex flex-column justify-content-between">
              {jsonOnly?.data?.map((item) => (
                <div key={item.name} className="d-flex justify-content-center align-items-center mb-2">
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: item.fill, marginRight: '5px' }} />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </Col>
        </Row>

        <Col xs={12} className='mt-4'>
          {
            history_data?.length > 0 ?
              history_data?.map((test, idx) => (
                <div key={idx} className="my-3">
                  <PerformanceHistoryBookCard className="p-3 pb-1" data={test} />
                </div>
              ))
              :
              <div className="d-flex flex-column justify-content-center align-items-center w-100 border-top pt-3">
                <span><Img src={Image.no_data_found} width={50} /></span>
                <p className="m-0">No test history</p>
              </div>
          }
        </Col>
      </Card.Body>
    </Card>
  );
};

export default PerformanceHistoryCard;