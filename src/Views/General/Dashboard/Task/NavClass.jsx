import React, { Fragment, useCallback, useState } from 'react';
import {Col, Card, CardBody, Nav, NavItem, ModalHeader} from 'reactstrap';
import { PlusCircle } from 'react-feather';
import NewTaskClass from './NewTask';
import HeaderProfile from './HeaderProfile';
import CreateTag from './CreateTag';
import {Views} from "../../../../Data/LocalDB";
import {tagData} from "../../../../Components/Common/Data/Task";
import {
    AddTask, AssignedToMe,
    CreatedByMe,
    DelayedTasks, MyTasks,
    Tags,
    ThisMonthTasks,
    ThisWeekTask,
    TodayTasks,
    UpcomingTasks
} from "../../../../Constant";

const NavClass = ({ activeToggle }) => {
    const [activeTab, setActiveTab] = useState('1');
    const [tagModal, setTagModal] = useState(false);
    const tagToggle = () => setTagModal(!tagModal);
    const [IsOpen, setIsOpen] = useState(false);
    const onClickSidebar = () => {
        setIsOpen(!IsOpen);
    };
    // eslint-disable-next-line
    const tagCallback = useCallback((modal) => {
        setTagModal(modal);
    });

    const [taskData, setTaskData] = useState([
        {
            id: 1,
            activeTab: '1',
            title: "Semua",
        },
        // {
        //     id: 2,
        //     activeTab: '2',
        //     title: "Panggilan 2",
        // },
        // {
        //     id: 3,
        //     activeTab: '3',
        //     title: 'Panggilan 3',
        // },
        // {
        //     id: 4,
        //     activeTab: '4',
        //     title: 'Peringatan 1',
        // },
        // {
        //     id: 5,
        //     activeTab: '5',
        //     title: 'Peringatan 2',
        // },
    ])

    return (
        <Fragment>
            <Col xl="3" className="box-col-6 xl-30">
                <div className="email-sidebar">
                    <a className="btn btn-primary email-sidebar-toggle" href="#" onClick={onClickSidebar}>Task Filter</a>
                    <div className={`email-left-aside ${IsOpen ? 'open' : ''}`}>
                        {/* <div className="email-left-aside"> */}
                        <Card>
                            <CardBody>
                                <div className="email-app-sidebar left-bookmark">
                                    {/*<HeaderProfile />*/}
                                    <Nav className="main-menu" role="tablist">
                                        <NavItem>
                                            <ModalHeader>{"Notifikasi BA"}</ModalHeader>
                                            {/*<NewTaskClass />*/}
                                        </NavItem>
                                        <li>
                                            <hr />
                                        </li>
                                        <NavItem>
                                            <span className="main-title">{"Task"}</span>
                                        </NavItem>
                                        {taskData.map((item) =>
                                            <NavItem key={item.id}>
                                                <a href="#" className={activeTab === item.activeTab ? 'active' : ''} onClick={() => {
                                                    setActiveTab(item.activeTab); activeToggle(item.activeTab);
                                                }}>
                                                    <span className="title"> {item.title}</span>
                                                </a>
                                            </NavItem>
                                        )}
                                        {/*<li>*/}
                                        {/*    <hr />*/}
                                        {/*</li>*/}
                                        {/*<NavItem><span className="main-title"> {Tags}<span className="pull-right" onClick={tagToggle}><PlusCircle /></span></span></NavItem>*/}
                                        {/*<CreateTag tagCallback={tagCallback} tagModal={tagModal} />*/}
                                        {/*{tagData.map((item) =>*/}
                                        {/*    <Fragment key={item.id}>*/}
                                        {/*        <NavItem><a href="#" className={activeTab === item.activeTab ? 'show' : ''} onClick={() => {*/}
                                        {/*            setActiveTab(item.activeTab); activeToggle(item.activeTab);*/}
                                        {/*        }} ><span className="title"> {item.title}</span></a></NavItem>*/}
                                        {/*    </Fragment>*/}
                                        {/*)}*/}
                                    </Nav>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </Col>
        </Fragment>
    );
};

export default NavClass;