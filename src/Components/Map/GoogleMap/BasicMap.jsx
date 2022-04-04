import HeaderCard from '../../Common/Component/HeaderCard';
import { BasicDemo } from '../../../Constant';
import React, { Fragment } from 'react';
import { Card, Col, CardBody } from 'reactstrap';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
    height: '500px'
};

const center = {
    lat: -3.745,
    lng: -38.523
};

const BasicMapComp = () => {

    return (
        <Fragment>
            <Col xl="6" md="12">
                <Card>
                    <HeaderCard title={BasicDemo} />
                    <CardBody>
                        <div className="map-js-height">
                            <div id="gmap-simple" className="map-block">
                                <LoadScript
                                    googleMapsApiKey="https://maps.googleapis.com/maps/api/js?key=AIzaSyBkNaAGLEVq0YLQMi-PYEMabFeREadYe1Q&v=3.exp&libraries=geometry,drawing,places"
                                >
                                    <GoogleMap
                                        mapContainerStyle={containerStyle}
                                        center={center}
                                        zoom={10}
                                    >
                                        <></>
                                    </GoogleMap>
                                </LoadScript>
                                {/* <BasicMap
                                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCdXpLSJ3Ibdu-Phs9QOvpqb9d1DtPf7wQ&libraries=places"
                                    loadingElement={
                                        <div style={{ height: `100%` }} />
                                    }
                                    containerElement={
                                        <div style={{ height: '300px' }} />
                                    }
                                    mapElement={
                                        <div style={{ height: `100%` }} />
                                    }
                                /> */}
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </Fragment>
    );
};

export default BasicMapComp;