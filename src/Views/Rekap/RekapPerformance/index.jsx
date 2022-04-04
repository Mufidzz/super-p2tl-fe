import React, {Fragment, useEffect, useState} from 'react';
import {Card, CardBody, Col, Container, Row} from 'reactstrap';
import {H4} from '../../../AbstractElements';
import BarChartClass from "./BarChart";
import HitRateChart from "./HitRateChart";
import {Database} from "react-feather";
import axios from "axios";
import {API_DATA_REPORT_TEMUAN_COUNT} from "../../../api/server";
import {CreateFilterEncoding} from "../../../Utils/Base64/request";

const RekapPerformance = () => {
    const [dateFrom, setDateFrom] = useState(new Date())
    const [dateTo, setDateTo] = useState(new Date())

    const [pBayarCount, setPBayarCount] = useState(0)

    useEffect(() => {
        // dateTo.setMonth(dateTo.getMonth() + 1)

        dateTo.setMonth(dateTo.getMonth() + 1)
        dateTo.setDate(0)

        axios.get(API_DATA_REPORT_TEMUAN_COUNT + "?filter=" + CreateFilterEncoding({
            "status_bayar" : 2,
            "date_from" : `${dateFrom.getFullYear()}-${dateFrom.getMonth() + 1}-01`,
            "date_to" : `${dateTo.getFullYear()}-${dateTo.getMonth() + 1}-${dateTo.getDate()}`
        }) ).then((res) => {
            if (res.status === 200) {
                return res.data
            }
        }).then((json) => {
            setPBayarCount(json["data"])

        })

    }, [dateFrom, dateTo])

    return (
        <Fragment>
            {/*<Breadcrumbs mainTitle='Rekap Performance' parent="Rekap Performance" title="Rekap Performance" />*/}
            <Container fluid={true}>
                <Row>
                    <BarChartClass />
                    <Col sm="12" xl="6" lg="6" key={"hitrate"}>
                        <HitRateChart dateFrom={dateFrom} dateTo={dateTo} count={pBayarCount} setDateFrom={setDateFrom} setDateTo={setDateTo}/>
                        <Card className="o-hidden border-0">
                            <CardBody className='bg-primary'>
                                <div className="media static-top-widget">
                                    <div className="align-self-center text-center">
                                        <Database />
                                    </div>
                                    <div className="media-body">
                                        <span className="m-0">
                                            Hit Rate
                                        </span>
                                        <H4 attrH4={{ className: 'mb-0 counter' }} >
                                            {((pBayarCount / (315 * (Math.abs(dateFrom.getMonth() - dateTo.getMonth()) + 1))) * 100).toFixed(2)} %
                                        </H4>
                                        <Database className="icon-bg" />
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default RekapPerformance;