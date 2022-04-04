import React, { Fragment, useContext, useState } from 'react';
import { Row, Col, Card, CardBody, CardHeader, Collapse } from 'reactstrap';
import { Btn, H5, P } from '../../AbstractElements';
import { HelpCircle } from 'react-feather';
import FaqRightsidebae from './FaqRightside';
import FaqContext from '../../_helper/Faq';
import HeaderCard from '../Common/Component/HeaderCard';

const Questionss = () => {
    const { faq } = useContext(FaqContext);
    const [isActivity, setIsActivity] = useState([]);
    const para = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.';

    const handelChange = (e) => {
        let collapseCopy = [...isActivity];
        collapseCopy[e] = !collapseCopy[e];
        setIsActivity(collapseCopy);
    };

    return (
        <Fragment>
            <Col lg="12" className="header-faq">
                <HeaderCard title={'Quick Questions are answered'} />
                <Row className="row default-according style-1 faq-accordion" id="accordionoc">
                    <Col xl="8" lg="6" md="7" className='box-col-8 xl-60' >
                        {faq && faq.map((item, i) => {
                            return (
                                <Fragment key={i} >
                                    <div className='faq-title'>
                                        <h6>{item.subTitle}</h6>
                                    </div>
                                    {
                                        faq[i].titless.map((item, id) => {
                                            return (
                                                <Card key={id}>
                                                    <CardHeader>
                                                        <H5 attrH5={{ className: 'mb-0' }}>
                                                            <Btn attrBtn={{ color: 'link pl-0', onClick: () => handelChange(id) }}><HelpCircle />{item.title}</Btn>
                                                        </H5>
                                                    </CardHeader>
                                                    <Collapse isOpen={isActivity[id]}>
                                                        <CardBody>
                                                            <P>{para}</P>
                                                        </CardBody>
                                                    </Collapse>
                                                </Card>
                                            );
                                        })
                                    }
                                </Fragment>
                            );
                        })
                        }
                    </Col>
                    <FaqRightsidebae />
                </Row>
            </Col >
        </Fragment >
    );
};
export default Questionss;