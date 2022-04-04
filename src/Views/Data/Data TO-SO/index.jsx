import React, {Fragment, useState} from 'react';
import {Breadcrumbs} from '../../../AbstractElements';
import FileContent from './FileContent';
import {Card, Col, Container, Row} from 'reactstrap';
import CounterCards from "./CounterCards";

const DataTOSO = () => {
    const [count, setCount] = useState({
        allData: 0,
        newData: 0,
    })

    const handleSetCount = (v) => {
        setCount(v)
    }

    return (
        <Fragment>
            <Breadcrumbs parent="App" title="Data TO / SO" mainTitle="Data TO / SO"/>
            <Container fluid={true}>
                <Row>
                    <CounterCards allDataCount={count.allData} newDataCount={count.newData}/>
                </Row>

                <Col xl="12" md="12" className="xl-100">
                    <div className="file-content">
                        <Card>
                            <FileContent setCount={handleSetCount}/>
                        </Card>
                    </div>
                </Col>
            </Container>
        </Fragment>
    );
};
export default DataTOSO;