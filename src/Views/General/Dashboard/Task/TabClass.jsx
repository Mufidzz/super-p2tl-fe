import React, { Fragment } from 'react';
import { Col, Card, TabContent, TabPane } from 'reactstrap';
import ListOfTask from "./ListTask";

const TabClass = ({ activeTab }) => {

    return (
        <Fragment>
            <Col xl="9" md="12" className="box-col-12 xl-70">
                <div className="email-right-aside bookmark-tabcontent">
                    <Card className="email-body radius-left">
                        <div className="pl-0">
                            <TabContent activeTab={activeTab}>
                                <TabPane tabId="1">
                                    <ListOfTask />
                                </TabPane>
                            </TabContent>
                        </div>
                    </Card>
                </div>
            </Col>
        </Fragment>
    );
};

export default TabClass;