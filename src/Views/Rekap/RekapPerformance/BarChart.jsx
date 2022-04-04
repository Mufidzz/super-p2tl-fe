import React, {Fragment, useEffect, useState} from 'react';
import { Col, Card, CardBody } from "reactstrap";
import { Bar } from 'react-chartjs-2';
import { barChartOptions } from '../../../Data/Chart/chartjs';
import HeaderCard from "../../../Components/Common/Component/HeaderCard";
import configDB from "../../../Config/ThemeConfig";
import axios from "axios";
import {API_REPORT_TEMUAN_KWH_REPORT} from "../../../api/server";

const primary = localStorage.getItem('default_color') || configDB.data.color.primary_color;


const BarChartClass = () => {
    const [data, setData] = useState([0,0,0,0,0,0,0,0,0,0,0,0])

    useEffect(() => {
        axios.get(API_REPORT_TEMUAN_KWH_REPORT).then((res) => {
            if (res.status === 200) {
                return res.data
            }
        }).then((json) => {
            setData(json["data"])
        })
    }, [])


    const barChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Jumlah KWH Temuan',
                lagend: 'Jumlah KWH Temuan',
                data: data,
                borderColor: primary,
                backgroundColor: "rgba(36, 105, 92, 0.4)",
                highlightFill: "rgba(36, 105, 92, 0.6)",
                highlightStroke: primary,
                borderWidth: 2
            }
        ],
        plugins: {
            datalabels: {
                display: false,
                color: 'white'
            }
        }
    }


    return (
        <Fragment>
            <Col xl="6" md="6" sm="12">
                <Card>
                    <HeaderCard title="Akumulasi KWH Temuan"/>
                    <CardBody className="chart-block">
                        <Bar data={barChartData} options={barChartOptions} />
                    </CardBody>
                </Card>
            </Col>
        </Fragment>
    )
}

export default BarChartClass;