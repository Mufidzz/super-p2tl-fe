import React, {Fragment, useEffect, useState} from 'react';
import {Folder,} from 'react-feather';
import {Card, CardBody, Col} from 'reactstrap';
import {LI, UL} from '../../../AbstractElements';

const SideButtons = [
    {
        className: "btn btn-light",
        icon: <Folder/>,
        title: "All"
    },
    {
        className: "btn btn-light",
        icon: <Folder/>,
        title: "Data Type A"
    },
    {
        className: "btn btn-light",
        icon: <Folder/>,
        title: "Data Type B"
    },
    {
        className: "btn btn-light",
        icon: <Folder/>,
        title: "Data Type C"
    },
];


const FileSideBar = ({categoryData, setSelectedCategoryData}) => {
    const [IsOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(true);

    const handleResize = () => {
        if (window.innerWidth <= 1199) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
    });

    const OnHandelClick = () => {
        setIsOpen(!IsOpen);
    };

    return (
        <Fragment>
            <Col xl="3" className="box-col-6 pr-0 file-spacing xl-30">
                <div className="md-sidebar job-sidebar">
                    {isMobile && <a className="btn btn-primary job-toggle" href="#javascript" onClick={OnHandelClick}>File
                        filter</a>}
                    {/* <a className="btn btn-primary md-sidebar-toggle" href="#javascript" onClick={onClickHandle}></a> */}
                    <div className={`md-sidebar-aside job-left-aside custom-scrollbar ${IsOpen ? 'open' : ''}`}>
                        <div className="file-sidebar">
                            <Card>
                                <CardBody>
                                    <UL attrUL={{className: 'simple-list '}}>
                                        {
                                            categoryData.map((item, i) => {
                                                return (
                                                    <LI key={i}>
                                                        <div className='btn btn-light' onClick={() => setSelectedCategoryData(item)}><Folder/>{item}</div>
                                                    </LI>
                                                );
                                            })
                                        }
                                    </UL>
                                    <hr/>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
            </Col>
        </Fragment>
    );
};
export default FileSideBar;