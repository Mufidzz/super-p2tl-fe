import React,{ useEffect }  from 'react';
import KnobChart from '../Common/KnobChart';
import InvoiceCardClass from './InvoiceCard';
import TopDealerCard from './TopDealerCard';
import TargetCard from './TargetCard';
import TopSellingCard from './TopSellingCard';
import TotalSellingCard from './TotalSellingCard';
import TimelineCard from './TimelineCard';
import YearlyGrowthCard from './YearlyGrowthCard';
import { Container, Row, Col } from 'reactstrap';
import Knob from 'knob';
import ConfigDB from '../../../Config/ThemeConfig';
const primary = localStorage.getItem('default_color') || ConfigDB.data.color.primary_color;

const Ecommerce = () => {
    useEffect(() => {
        var profit = Knob({
            value: 60,
            left: 1,
            angleOffset: 90,
            className: 'review',
            thickness: 0.3,
            fgColor: '#c29873',
            readOnly: true,
            dynamicDraw: true,
            tickColorizeValues: true,
            bgColor: '#eeeeee',
            lineCap: 'round',
            displayPrevious: false
        });
        document.getElementById('profit').appendChild(profit);

        var profit1 = Knob({
            value: 62,
            left: 1,
            angleOffset: 90,
            className: 'review',
            thickness: 0.3,
            fgColor: primary,
            readOnly: true,
            dynamicDraw: true,
            tickColorizeValues: true,
            bgColor: '#eeeeee',
            lineCap: 'round',
            displayPrevious: false
        });
        document.getElementById('profit1').appendChild(profit1);
    }, []);
    return (
        <Container fluid={true} className="dashboard-2-main">
            <Row>
                <Col xl='6' className="box-col-12 des-xl-100 invoice-sec">
                    <InvoiceCardClass />
                </Col>
                <Col xl="6" className="box-col-12 des-xl-100 top-dealer-sec">
                    <TopDealerCard />
                </Col>
                <Col xl="8" md='' className="des-xl-100 box-col-12">
                    <Row>
                        <Col xl="3" sm="6" className="box-col-3 chart_data_right">
                            <KnobChart price="$9,84,235" knobId={'profit'} title='Our Annual Income' />
                        </Col>
                        <Col xl="3" sm="6" className="box-col-3 chart_data_right second">
                            <KnobChart price="$4,55,462" knobId={'profit1'} title='Our Annual Income' />
                        </Col>
                        <Col xl="6" className="col-xl-6 box-col-6 top-sell-sec">
                            <TopSellingCard />
                        </Col>
                        <Col xl="6" className="box-col-6">
                            <TotalSellingCard />
                        </Col>
                        <Col cl="6" className="box-col-6">
                            <TargetCard />
                        </Col>
                    </Row>
                </Col>
                <Col xl="4" className="des-xl-50 box-col-12 activity-sec chart_data_left">
                    <TimelineCard />
                </Col>
                <Col xl="12" className="des-xl-50 yearly-growth-sec">
                    <YearlyGrowthCard />
                </Col>
            </Row>
        </Container>
    );
};

export default Ecommerce;