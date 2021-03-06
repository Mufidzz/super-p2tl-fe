import AsiaMap from './AsiaMap';
import AustraliaMap from './Australia';
import CanadaMap from './CanadaMap';
import IndiaMap from './IndiaMap';
import USAMap from './USAMap';
import WorldMap from './WorldMap';
import { Container, Row } from 'reactstrap';
import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';

const LeafletMapContain = () => {
    return (
        <Fragment>
            <Breadcrumbs mainTitle='Leaflet Maps' parent="Maps" title="Leaflet Maps" />
            <Container fluid={true}>
                <Row>
                    <WorldMap />
                    <USAMap />
                    <CanadaMap />
                    <IndiaMap />
                    <AsiaMap />
                    <AustraliaMap />
                </Row>
            </Container>
        </Fragment>
    );
};
export default LeafletMapContain;