import React, { useContext, useState, Fragment } from 'react';
import { AlignCenter } from 'react-feather';
import { Link } from 'react-router-dom';
import { Image } from '../../AbstractElements';
import CheckContext from '../../_helper/Customizer';

const Leftbar = () => {

    const { mixLayout, toggleSidebar } = useContext(CheckContext);
    const [toggle, setToggle] = useState(false);

    const openCloseSidebar = () => {
        setToggle(!toggle);
        toggleSidebar(toggle);
    };

    return (
        <Fragment>
            <div className="main-header-left">
                {mixLayout ?
                    <div className="logo-wrapper">
                        <Link to={`${process.env.PUBLIC_URL}/dashboard/default`}>
                            <Image attrImage={{ className: 'd-inline logo-sidebar', src: `${require('../../assets/images/logo/logo.png')}`, alt: '', height: 35}}/>
                        </Link>
                    </div>
                    :
                    <div className="dark-logo-wrapper">
                        <Link to={`${process.env.PUBLIC_URL}/dashboard/default`}>
                            {/*<Image attrImage={{ className: 'img-fluid d-inline', src: `${require('../../assets/images/logo/dark-logo.png')}`, alt: '' }} />*/}
                            <Image attrImage={{ className: 'd-inline', src: `${require('../../assets/images/logo/logo.png')}`, alt: '' , height: 35}} />
                        </Link>
                    </div>
                }
                <div className="toggle-sidebar" onClick={() => openCloseSidebar()}>
                    <AlignCenter className="status_toggle middle" id="sidebar-toggle" />
                </div>
            </div>
        </Fragment >
    );
};

export default Leftbar;