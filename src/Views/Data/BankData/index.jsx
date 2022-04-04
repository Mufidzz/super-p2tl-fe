import React, {Fragment, useEffect, useState} from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import FileContent from './FileContent';
import FileSideBar from './FileSidebar';
import { Card, Col, Container, Row } from 'reactstrap';
import axios from "axios";
import {API_CDN_BANK_DATA} from "../../../api/server";

const BankData = () => {
    const [categoryData, setCategoryData] = useState([]);
    const [selectedCategoryData, setSelectedCategoryData] = useState("");
    const [tableData, setTableData] = useState([])
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");


    useEffect(() => {
        let files = []
        data.filter((e) => e["category"] === selectedCategoryData).map((e) => {
            files = [...files, ...e["files"]]
        })
        setTableData(files)
    }, [selectedCategoryData])


    useEffect(() => {
            let files = []
            data.map((e) => {
                files = [...files, ...e["files"]]
            })
            setTableData(files.filter((e) => e["name"].indexOf(searchTerm) > -1))

    }, [searchTerm])

    useEffect(() => {
        axios.get(API_CDN_BANK_DATA).then((res) => {
            if (res.status === 200) {
                return res.data
            }
        }).then((json) => {
            if (json["data"] !== null) {
                setData(json["data"])
                setCategoryData(json["data"].map((e) => e["category"]))

                let files = []

                json["data"].map((e) => {
                    files = [...files, ...e["files"]]
                })

                setTableData(files)
            } else {
                setData([]);
            }
        })
    }, [])

    return (
        <Fragment>
            <Breadcrumbs parent="App" title="Bank Data" mainTitle="Bank Data" />
            <Container fluid={true}>
                <Row>
                    <FileSideBar categoryData={categoryData} setSelectedCategoryData={setSelectedCategoryData} />
                    <Col xl="9" md="12" className="xl-70">
                        <div className="file-content">
                            <Card>
                                <FileContent tableData={tableData} categoryData={categoryData} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};
export default BankData;