import React, {Fragment, useCallback, useState} from 'react';
import {Image} from '../../../AbstractElements';
import {CardBody, CardHeader, Form, FormGroup, Input, Media} from 'reactstrap';
import errorImg from '../../../assets/images/search-not-found.png';
import DataTable from 'react-data-table-component';
import SweetAlert from "sweetalert2";
import axios from "axios";
import {API_CDN_BANK_DATA} from "../../../api/server";
import CreateBankDataModalButton from "./Modal/CreateBankDataModalButton";

const FileContent = ({tableData, searchTerm, setSearchTerm, categoryData}) => {
    const [toggleCleared, setToggleCleared] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);

    const tableColumns = [
        {
            name: 'Name',
            selector: (row) => row.name,
            sortable: true,
            center: true,
        },
        {
            selector: (row) => row.download,
            sortable: false,
            center: true,
        },
    ];

    const handleRowSelected = useCallback(state => {
        setSelectedRows(state.selectedRows);
    }, []);


    const handleChange = (e) => {
        setSearchTerm(e.target.value)
    }

    const handleImplement = (data) => {
        console.log(data)

        const FormData = require("form-data")
        const formData = new FormData();

        formData.append("file", data.file)
        formData.append("category", data.category)
        formData.append("name", data.filename)

        axios.post(API_CDN_BANK_DATA + "/", formData, {
            headers : {
                "Content-Type": "multipart/form-data",
            }
        }).then((res) => {
            if (res.status === 204) {
                SweetAlert.fire(
                    'Success!',
                    'Your file has been Uploaded.',
                    'success'
                )
            }
        }).catch(() => {
            SweetAlert.fire({
                title: 'Failed',
                text: 'Data Upload Failed!',
                icon: 'error',
                confirmButtonText: 'OK',
            })
        })
    }

    return (
        <Fragment>
            <CardHeader>
                <Media>
                    <Form className="form-inline">
                        <FormGroup className="mb-0 d-flex">
                            <i className="fa fa-search"></i>
                            <Input className="form-control-plaintext" type="text" value={searchTerm}
                                   onChange={(e) => handleChange(e)} placeholder="Search..."/>
                        </FormGroup>
                    </Form>
                    <Media body className="text-end">
                        <CreateBankDataModalButton categories={categoryData} onImplement={handleImplement}/>
                    </Media>
                </Media>
            </CardHeader>


            {tableData !== undefined && tableData.length ?
                <CardBody className="file-manager">
                    <DataTable
                        data={tableData}
                        columns={tableColumns}
                        striped={true}
                        center={true}
                        selectableRows
                        persistTableHead
                        // contextActions={contextActions}
                        onSelectedRowsChange={handleRowSelected}
                        clearSelectedRows={toggleCleared}
                    />

                </CardBody>
                : <Image attrImage={{className: 'img-fluid m-auto', src: errorImg, alt: ''}}/>
            }
        </Fragment>
    );
};
export default FileContent;