import React, {Fragment, useCallback, useEffect, useMemo, useState} from 'react';
import {toast} from 'react-toastify';
import {Btn, Image, Spinner} from '../../../AbstractElements';
import {CardBody, CardHeader, Dropdown, DropdownItem, DropdownMenu, Media} from 'reactstrap';
import differenceBy from "lodash/differenceBy";
import errorImg from '../../../assets/images/search-not-found.png';
import DataTable from 'react-data-table-component';
import SweetAlert from "sweetalert2";
import FilterTOSOModalButton from "./Modals/FilterTOSOModalButton";
import axios from "axios";
import {API_DATA_DIL, API_DATA_TO_SO} from "../../../api/server";
import {CreateFilterEncoding, CreatePaginationEncoding} from "../../../Utils/Base64/request";
import CreateTOSOModalButton from "./Modals/CreateTOSOModalButton";
import EditTOSOModalButton from "./Modals/EditTOSOModalButton";


const FileContent = ({setCount}) => {
    const [data, setData] = useState([]);
    const [toggleCleared, setToggleCleared] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [pending, setPending] = useState(true)
    const [todayRows, setTodayRows] = useState(0)
    const [totalRows, setTotalRows] = useState(0)
    const [pagination, setPagination] = useState({
        count: 10,
        offset: 0,
    })

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
            name: "NAMA GARDU",
            selector: (row) => row.nama_gardu,
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
            name: "KETERANGAN",
            selector: (row) => row.keterangan,
            sortable: true
        },
    ]


    useEffect(() => {
        axios.get(API_DATA_TO_SO + "?pagination=" + CreatePaginationEncoding(pagination.count, pagination.offset)).then((res) => {
            if (res.status === 200) {
                return res.data
            }
        }).then((json) => {

            if (json["data"]["data"] !== null) {
                setCount({
                    allData: totalRows,
                    newData: todayRows,
                })

                setData(json["data"]["data"]);
                setTotalRows(json["data"]["count"]["all"])
                setTodayRows(json["data"]["count"]["today"])
                setPending(false);
            } else {
                setData([]);
            }
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

    const onFileEdit = () => {
        if (selectedRows.length <= 0) {
            toast.error('Please Select at least one row !');
        } else if (selectedRows.length > 1) {
            toast.error('Can\'t Edit more than 1 Rows at once !');
        }
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
                        axios.delete(API_DATA_TO_SO + "?" + param.join("&")).then((res) => {
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
        axios.get(API_DATA_TO_SO + "?pagination=" + CreatePaginationEncoding(pagination.count, pagination.offset) + "&filter=" + CreateFilterEncoding(data)).then((res) => {
            if (res.status === 200) {
                return res.data
            }
        }).then((json) => {
            if (json["data"]["data"] !== null) {
                setData(json["data"]["data"]);
                setTotalRows(json["data"]["count"]["all"])
                setTodayRows(json["data"]["count"]["today"])
            } else {
                setData([]);
            }
            setPending(false);
        }).catch(() => {
            setData([]);
        })
    }

    const handleEditImplement = (data) => {
        setPending(true);
        axios.put(API_DATA_TO_SO, data).then((res) => {
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
        axios.post(API_DATA_TO_SO, data).then((res) => {
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
                    <FilterTOSOModalButton onImplement={handleFilterImplement}/>
                    <Media body className="text-end">
                        <div className="dropdown-basic">
                            <CreateTOSOModalButton onImplement={handleCreateImplement}/>
                            <Dropdown className="dropdown" style={{marginBottom: "0 !important"}}>
                                <Btn attrBtn={{color: 'primary', className: 'btn btn-secondary ms-2'}}>Modify <span><i
                                    className="icofont icofont-arrow-down"/></span></Btn>
                                <DropdownMenu className="dropdown-content" style={{top: '0 !important'}}>
                                    <DropdownItem header>Modify</DropdownItem>
                                    <DropdownItem href="#" onClick={onFileDelete}>{'Delete'}</DropdownItem>
                                    <EditTOSOModalButton defaultVal={selectedRows}
                                                                onImplement={handleEditImplement}/>

                                    <DropdownItem header>File</DropdownItem>
                                    <DropdownItem href="#" onClick={onFileDelete}>{'Import'}</DropdownItem>
                                    <DropdownItem href="#" onClick={onFileDelete}>{'Export'}</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </Media>
                </Media>
            </CardHeader>


            {data.length > 0 ?
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