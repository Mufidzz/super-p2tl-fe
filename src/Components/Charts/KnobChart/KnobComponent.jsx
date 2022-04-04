import React, { Fragment } from 'react';
import { Col, Card, CardBody } from 'reactstrap';
import HeaderCard from '../../Common/Component/HeaderCard';

const KnobComponent = ({ title, knobId }) => {
    return (
        <Fragment>
            <Col xl="4" md="6" className="xl-50">
                <Card>
                    <HeaderCard title={title} />
                    <CardBody>
                        <div className="knob-block text-center">
                            <div className="knob" id={knobId} >
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </Fragment>
    );
};

export default KnobComponent;