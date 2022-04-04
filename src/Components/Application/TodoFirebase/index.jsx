import React, { Fragment } from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import { Breadcrumbs, H5, P } from '../../../AbstractElements';
import { ToDo } from '../../../Constant';
import TodoContainer from './TodoContainer';
import TodoData from './TodoData';

const TodoFirebaseContain = () => {
    return (
        <Fragment>
            <Breadcrumbs mainTitle="Todo-Firebae" parent="Apps" title="Todo-Firebae" />
            <Container fluid={true}>
                <Row>
                    <Col xl="12">
                        <Card>
                            <CardHeader>
                                <H5>{ToDo}</H5>
                            </CardHeader>
                            <CardBody className="pt-0">
                                <div className="todo">
                                    <div className="todo-list-wrapper">
                                        <div className="todo-list-container">
                                            <TodoData />
                                        </div>
                                    </div>
                                    <div className="notification-popup hide">
                                        <P><span className="task"></span><span className="notification-text"></span></P>
                                    </div>
                                </div>
                                <TodoContainer />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};
export default TodoFirebaseContain;