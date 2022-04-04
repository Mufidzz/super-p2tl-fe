import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import FileContent from './FileContent';
import { Card, Col, Container, Row } from 'reactstrap';
import EarningsCard from "../../../Components/Widgets/General/EarningsCard";
import CounterCards from "../Data TO-SO/CounterCards";

const DataDIL = () => {
    return (
        <Fragment>
            <Breadcrumbs parent="App" title="Data Induk Lapangan" mainTitle="Data Induk Lapangan" />
            <Container fluid={true}>
                <Row>
                    <CounterCards allDataCount={0} newDataCount={120}/>
                </Row>
                <Col xl="12" md="12" className="xl-100">
                    <div className="file-content">
                        <Card>
                            <FileContent />
                        </Card>
                    </div>
                </Col>
            </Container>
        </Fragment>
    );
};
export default DataDIL;