import React, { Fragment, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { Printer } from 'react-feather';
import { Card, CardHeader } from 'reactstrap';
import {H6} from "../../../../AbstractElements";
import {CreatedByMe, Print} from "../../../../Constant";
import CreatedByme from "./CreatedByme";

const ListOfTask = () => {
    const componentRef = useRef();
    return (
        <Fragment>
            <Card className="mb-0">
                <CardHeader className="d-flex">
                    <H6 attrH6={{ className: 'mb-0 f-w-600' }} >Semua Notifikasi</H6>
                </CardHeader>
                <CreatedByme />
            </Card>
        </Fragment>
    );
};

export default ListOfTask;