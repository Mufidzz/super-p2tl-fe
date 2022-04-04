import React, { Fragment } from 'react';
import { Card, CardBody } from 'reactstrap';
import { H5, P } from '../../../AbstractElements';


const KnobChart = ({ title, knobId, price }) => {

    return (
        <Fragment>
            <Card className="income-card card-secondary">
                <CardBody>
                    <div className="round-progress knob-block text-center">
                        <div className="progress-circle">
                            <div className="knob" id={knobId} >
                            </div>
                            <H5>{price}</H5>
                            <P>{title}</P>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Fragment>
    );
};

export default KnobChart;