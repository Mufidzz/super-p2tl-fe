import React, { Fragment } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { H4 } from '../../../AbstractElements';
import {Database, ShoppingBag} from "react-feather";



const CounterCards = ({newDataCount, allDataCount}) => {

    const CounterData = [
        {
            id: 1,
            classCompo: 'bg-primary',
            icon: <Database />,
            title: 'Data Baru',
            count: newDataCount.toString(),
            iconWithClass: <Database className="icon-bg" />
        },
        {
            id: 2,
            classCompo: 'bg-secondary',
            icon: <ShoppingBag />,
            title: 'Jumlah Data',
            count: allDataCount.toString(),
            iconWithClass: <ShoppingBag className="icon-bg" />
        },
    ]

    return (
        <Fragment>
            {CounterData.map((item) =>
                <Col sm="6" xl="6" lg="6" key={item.id}>
                    <Card className="o-hidden border-0">
                        <CardBody className={item.classCompo}>
                            <div className="media static-top-widget">
                                <div className="align-self-center text-center">
                                    {item.icon}
                                </div>
                                <div className="media-body">
                                    <span className="m-0">{item.title}</span>
                                    <H4 attrH4={{ className: 'mb-0 counter' }} >{item.count}</H4>
                                    {item.iconWithClass}
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            )}
        </Fragment>
    );
};

export default CounterCards;