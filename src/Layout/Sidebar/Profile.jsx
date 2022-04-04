import React, { Fragment, useEffect, useState } from 'react';
import { Settings } from 'react-feather';
import { Link } from 'react-router-dom';
import { H6, Image, LI, UL, P } from '../../AbstractElements';
import man from '../../assets/images/dashboard/1.png';

const Profile = () => {
    // const authenticated = JSON.parse(localStorage.getItem('authenticated'));
    // const auth0_profile = JSON.parse(localStorage.getItem('auth0_profile'));
    const [profile, setProfile] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        setProfile( man);
        setName(localStorage.getItem('Name'));
    }, [setProfile, setName]);

    return (
        <Fragment>
            <div className="sidebar-user text-center">
                {/*<a className="setting-primary" href="#javascript">*/}
                {/*    <Settings />*/}
                {/*</a>*/}
                <Link to={`${process.env.PUBLIC_URL}/app/users/userProfile`}>
                    <Image attrImage={{ className: 'img-90 rounded-circle', src: profile, alt: '' }} />
                    {/*<H6 attrH6={{ className: 'mt-3 f-14 f-w-600' }} >{authenticated ? auth0_profile.name : name}</H6>*/}
                    <H6 attrH6={{ className: 'mt-3 f-14 f-w-600' }} >{"ADMIN_ULP_SINGOSARI"}</H6>
                </Link>
                <P attrPara={{ className: 'mb-0 font-roboto' }} >ADMIN_ULP_SINGOSARI</P>
                {/*<UL attrUL={{ className: 'flex-row simple-list' }}>*/}
                {/*    <LI><span><span className="counter">19.8</span>k</span>*/}
                {/*        <P>Follow</P>*/}
                {/*    </LI>*/}
                {/*    <LI><span>2 year</span>*/}
                {/*        <P>Experince</P>*/}
                {/*    </LI>*/}
                {/*    <LI><span><span className="counter">95.2</span>k</span>*/}
                {/*        <P>Follower </P>*/}
                {/*    </LI>*/}
                {/*</UL>*/}
            </div>
        </Fragment >
    );
};

export default Profile;