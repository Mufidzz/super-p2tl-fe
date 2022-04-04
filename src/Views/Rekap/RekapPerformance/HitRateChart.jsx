import React, { Fragment } from 'react';
import {Col, Card, CardBody, Label, Row} from "reactstrap";
import { Bar } from 'react-chartjs-2';
import { barChartOptions } from '../../../Data/Chart/chartjs';
import HeaderCard from "../../../Components/Common/Component/HeaderCard";
import configDB from "../../../Config/ThemeConfig";
import Select from "react-select";
import {options2} from "../../../Components/Forms/FormWidget/FormSelect2/OptionDatas";

const primary = localStorage.getItem('default_color') || configDB.data.color.primary_color;
const secondary = localStorage.getItem('secondary_color') || configDB.data.color.secondary_color;


const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
];


const BarChartClass = ({count, setDateFrom, setDateTo, dateFrom, dateTo}) => {
    const config = {
        type: 'bar',
        data: {
            labels: ['Hit Rate'],
            datasets: [
                {
                    label: 'Total Rate',
                    lagend: 'Total Rate',
                    data: [315 * (Math.abs(dateFrom.getMonth() - dateTo.getMonth()) + 1)],
                    borderColor: primary,
                    backgroundColor: "rgba(36, 105, 92, 0.4)",
                    highlightFill: "rgba(36, 105, 92, 0.6)",
                    highlightStroke: primary,
                    borderWidth: 2
                },
                {
                    label: 'P Bayar',
                    lagend: 'P Bayar',
                    data: [count],
                    borderColor: secondary,
                    backgroundColor: "rgba(36, 105, 92, 0.4)",
                    highlightFill: "rgba(36, 105, 92, 0.6)",
                    highlightStroke: secondary,
                    borderWidth: 2
                }
            ],
            plugins: {
                datalabels: {
                    display: false,
                    color: 'white'
                }
            }
        },
        options: {
            indexAxis: 'y',
            elements: {
                bar: {
                    borderWidth: 2,
                }
            },
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                },
            }
        },
    };


    return (
        <Fragment>
            <Col xl="12" md="12" >
                <Card>
                    <HeaderCard title="Hitrate"/>
                    <CardBody className="chart-block">
                        <Row>
                            <Col xl="6" md="6" sm="12">
                                <Label className="col-form-label">From</Label>
                                <Select
                                    options={months}
                                    className="js-example-basic-single col-sm-12"
                                    onChange={(option) => {
                                        setDateFrom(new Date(2022, option.value, 1))
                                    }}
                                />
                            </Col>
                            <Col xl="6" md="6" sm="12">
                                <Label className="col-form-label">To</Label>
                                <Select
                                    onChange={(option) => {
                                        setDateTo(new Date(2022, option.value, 1))
                                    }}
                                    options={months}
                                    className="js-example-basic-single col-sm-12" />
                            </Col>
                        </Row>
                        <Bar {...config} width={717} height={200} />
                    </CardBody>
                </Card>
            </Col>
        </Fragment>
    )
}

export default BarChartClass;