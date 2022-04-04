import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { firebase_app } from '../../../../Config/Config';
import { Col, Card, CardBody } from 'reactstrap';
import HeaderProfile from './HeaderProfile';
import NavComponent from './NavComponent';
import TabComponent from './TabComponent';

const LeftContact = () => {
    const db = firebase_app.firestore();
    const [activeTab, setActiveTab] = useState('1');
    const [selectedUser, setSelectedUser] = useState({});
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const unsubscribe = db.collection('contactApp').onSnapshot((snapshot) => {
            const getUser = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setUsers(getUser);
            setSelectedUser(getUser[0]);
        });
        return () => unsubscribe();
    }, [db]);

    const callback = useCallback((tab) => {
        setActiveTab(tab);
    }, []);

    const [IsOpen, setIsOpen] = useState(false);
    const onClickSidebar = () => {
        setIsOpen(!IsOpen);
    };

    return (
        <Fragment>
            <Col xl="3" className="box-col-6">
                <div className='email-sidebar'>
                    <a className="btn btn-primary email-aside-toggle" href="#javascript" onClick={onClickSidebar}>
                        Contact Filter</a>
                    <div className={`email-left-aside ${IsOpen ? 'open' : ''}`}>
                        <Card>
                            <CardBody>
                                <div className="email-app-sidebar left-bookmark">
                                    <HeaderProfile />
                                    <NavComponent callbackActive={callback} />
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </Col>
            <Col xl="9" md="12" className="box-col-12">
                <div className="email-right-aside bookmark-tabcontent contacts-tabs">
                    <div className="email-body radius-left">
                        <div className="pl-0">
                            <TabComponent activeTab={activeTab} users={users} selectedUser={selectedUser} />
                        </div>
                    </div>
                </div>
            </Col>
        </Fragment>
    );
};

export default LeftContact;