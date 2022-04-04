import axios from 'axios';
import React, {Fragment, useCallback, useEffect, useMemo, useState} from 'react';
import {Trash} from 'react-feather';
import {toast} from 'react-toastify';
import {Btn, Image, Spinner} from '../../../AbstractElements';
import {CardBody, CardHeader, Dropdown, DropdownItem, DropdownMenu, Media} from 'reactstrap';
import {tableData} from "../../../Data/DummyTableData";
import differenceBy from "lodash/differenceBy";
import errorImg from '../../../assets/images/search-not-found.png';
import DataTable from 'react-data-table-component';
import SweetAlert from "sweetalert2";
import {API_DATA_DIL} from "../../../api/server";
import {CreateFilterEncoding, CreatePaginationEncoding} from "../../../Utils/Base64/request";
import FilterDILModalButton from "./Modals/FilterDILModalButton";
import CreateDILModalButton from "./Modals/CreateDILModalButton";
import EditDILModalDropdownButton from "./Modals/EditDILModalDropdownButton";
import {DropdownHeader} from "../../../Constant";


const FileContent = ({setCount}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState(tableData);
    const [toggleCleared, setToggleCleared] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [pagination, setPagination] = useState({
        count: 10,
        offset: 0,
    })
    const [pending, setPending] = useState(true)
    const [totalRows, setTotalRows] = useState(0)


    const tableColumns = [
        {
            center: true,
            name: "IDPEL",
            selector: (row) => row.idpel,
            sortable: true
        },
        {
            center: true,
            name: "NAMA",
            selector: (row) => row.nama,
            sortable: true
        },
        {
            center: true,
            name: "ALAMAT",
            selector: (row) => row.alamat,
            sortable: true
        },
        {
            center: true,
            name: "MERK METER",
            selector: (row) => row.merk_meter,
            sortable: true
        },
        {
            center: true,
            name: "TARIF",
            selector: (row) => row.tarif,
            sortable: true
        },
        {
            center: true,
            name: "DAYA",
            selector: (row) => row.daya,
            sortable: true
        },
        {
            center: true,
            name: "TH TERA KWH",
            selector: (row) => row.th_tera_kwh,
            sortable: true
        },

        {
            center: true,
            name: "NO KWH",
            selector: (row) => row.no_kwh,
            sortable: true
        },
        {
            center: true,
            name: "JENIS MK",
            selector: (row) => row.jenis_mk,
            sortable: true
        },
        {
            center: true,
            name: "NO TIANG",
            selector: (row) => row.no_tiang,
            sortable: true
        },
        {
            center: true,
            name: "NAMA GARDU",
            selector: (row) => row.nama_gardu,
            sortable: true
        }
    ]

    const handleChange = event => {
        event.preventDefault();
        setSearchTerm(event.target.value);
    };

    const onFileEdit = () => {
        if (selectedRows.length <= 0) {
            toast.error('Please Select at least one row !');
        } else if (selectedRows.length > 1) {
            toast.error('Can\'t Edit more than 1 Rows at once !');
        }
    };

    useEffect(() => {
        axios.get(API_DATA_DIL + "?pagination=" + CreatePaginationEncoding(pagination.count, pagination.offset)).then((res) => {
            if (res.status === 200) {
                return res.data
            }
        }).then((json) => {

            // setCount({
            //     allData: totalRows,
            // })

            setData(json["data"]["data"]);
            setTotalRows(json["data"]["count"]["all"])
            setPending(false);
        })
    }, [pagination])

    const handlePerRowsChange = (newPerPage, page) => {
        setPending(true);
        setPagination({
            ...pagination,
            offset: (page - 1) * pagination.count,
            count: newPerPage,
        })

    }

    const handlePageChange = page => {
        setPending(true);
        setPagination({
            ...pagination,

            offset: (page - 1) * pagination.count,
        });
    };

    const onFileDelete = () => {
        if (selectedRows.length <= 0) {
            toast.error('Please Select at least one row !');
        } else {
            SweetAlert.fire({
                title: 'Are you sure?',
                text: 'Once deleted, you will not be able to recover this!',
                icon: 'error',
                showCancelButton: true,
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                reverseButtons: true
            })
                .then((result) => {
                    if (result.value) {
                        let param = []

                        selectedRows.forEach((e) => {
                            param = [...param,  "id=" + e["id"]]
                        })

                        setPending(true);
                        axios.delete(API_DATA_DIL + "?" + param.join("&")).then((res) => {
                            if (res.status === 204) {
                                SweetAlert.fire(
                                    'Deleted!',
                                    'Your file has been deleted.',
                                    'success'
                                ).then(() => {
                                    setPagination({...pagination});
                                })
                            }
                        }).catch(() => {
                            SweetAlert.fire({
                                title: 'Failed',
                                text: 'Data Deletion Failed!',
                                icon: 'error',
                                confirmButtonText: 'OK',
                            })
                        })
                    }
                });
        }
    };

    const contextActions = useMemo(() => {
        const handleDelete = () => {
            if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.name)}?`)) {
                setToggleCleared(!toggleCleared);
                setData(differenceBy(data, selectedRows, 'name'));
                toast.success('Successfully Deleted !');
            }
        };

        return <button key="delete" className="btn btn-danger" onClick={handleDelete}>Delete</button>;
    }, [data, selectedRows, toggleCleared]);

    const handleRowSelected = useCallback(state => {
        setSelectedRows(state.selectedRows);
    }, []);

    const handleFilterImplement = (data) => {
        setPending(true);
        axios.get(API_DATA_DIL + "?pagination=" + CreatePaginationEncoding(pagination.count, pagination.offset) + "&filter=" + CreateFilterEncoding(data)).then((res) => {
            if (res.status === 200) {
                return res.data
            }
        }).then((json) => {
            if (json["data"]["data"] !== null) {
                setData(json["data"]["data"]);
                setTotalRows(json["data"]["count"]["all"])
            } else {
                setData([]);
            }
            setPending(false);

        })
    }

    const handleEditImplement = (data) => {
        setPending(true);
        axios.put(API_DATA_DIL, data).then((res) => {
            if (res.status === 204) {
                SweetAlert.fire({
                    title: 'Success',
                    text: 'Data Successfully Saved!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(() => {
                    setPagination({...pagination});

                })
            }
        }).catch(() => {
            SweetAlert.fire({
                title: 'Failed',
                text: 'Data Saving Failed!',
                icon: 'error',
                confirmButtonText: 'OK',
            })
        })
    }

    const handleCreateImplement = (data) => {
        setPending(true);
        axios.post(API_DATA_DIL, data).then((res) => {
            if (res.status === 204) {
                SweetAlert.fire({
                    title: 'Success',
                    text: 'Data Successfully Saved!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(() => {
                    setPagination({...pagination});

                })
            }
        }).catch(() => {
            SweetAlert.fire({
                title: 'Failed',
                text: 'Data Saving Failed!',
                icon: 'error',
                confirmButtonText: 'OK',
            })
        })
    }

    return (
        <Fragment>
            <CardHeader>

                <Media>
                    <FilterDILModalButton onImplement={handleFilterImplement}/>

                    <Media body className="text-end">
                        <div className="dropdown-basic">
                            <CreateDILModalButton onImplement={handleCreateImplement}/>
                            <Dropdown className="dropdown" style={{marginBottom : "0 !important"}}>
                                <Btn attrBtn={{color: 'primary', className: 'btn btn-secondary ms-2'}}>Modify <span><i className="icofont icofont-arrow-down"/></span></Btn>
                                <DropdownMenu className="dropdown-content" style={{top: '0 !important'}}>
                                    <DropdownItem header>Modify</DropdownItem>
                                    <DropdownItem href="#" onClick={onFileDelete}>{'Delete'}</DropdownItem>
                                    <EditDILModalDropdownButton defaultVal={selectedRows} onImplement={handleEditImplement}/>

                                    <DropdownItem header>File</DropdownItem>
                                    <DropdownItem href="#" onClick={onFileDelete}>{'Import'}</DropdownItem>
                                    <DropdownItem href="#" onClick={onFileDelete}>{'Export'}</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>


                    </Media>
                </Media>
            </CardHeader>


            {data.length ?
                <CardBody className="file-manager">
                    <DataTable
                        data={data}
                        columns={tableColumns}
                        striped={true}
                        center={true}
                        selectableRows
                        persistTableHead
                        contextActions={contextActions}
                        onSelectedRowsChange={handleRowSelected}
                        onChangeRowsPerPage={handlePerRowsChange}
                        onChangePage={handlePageChange}
                        clearSelectedRows={toggleCleared}
                        pagination
                        paginationServer
                        paginationTotalRows={totalRows}
                        progressPending={pending}
                    />

                </CardBody>
                : pending ? <div className="loader-box">
                        <Spinner attrSpinner={{className: "loader-2"}}/>
                    </div>
                    : <Image attrImage={{className: 'img-fluid m-auto', src: errorImg, alt: ''}}/>
            }
        </Fragment>
    );
};
export default FileContent;