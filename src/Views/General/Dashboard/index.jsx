import {Col, Container, Row} from 'reactstrap';
import React from 'react';
import RekapPerformance from "../../Rekap/RekapPerformance";
import Task from "./Task";

const Dashboard = () => {
    return (
        <Container fluid={true} className="dashboard-default-sec">
            <Row>
                <Col xl="12" className="box-col-12 des-xl-100">
                    <RekapPerformance/>
                </Col>
                <Col xl="12" className="box-col-12 des-xl-100">
                    <Task/>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;