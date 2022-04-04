import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import {Btn, Image, Spinner} from '../../../AbstractElements';
import {CardBody, CardHeader, Dropdown, DropdownItem, DropdownMenu, Media} from 'reactstrap';
import errorImg from '../../../assets/images/search-not-found.png';
import DataTable from 'react-data-table-component';
import SweetAlert from "sweetalert2";
import FilterTOSOModalButton from "./Modals/FilterTOSOModalButton";
import axios from "axios";
import {
    API_DATA_DIL,
    API_DATA_REPORT_TEMUAN,
    API_DATA_REPORT_TEMUAN_JENIS_TEMUAN,
    API_USER_WORK_TO_SO
} from "../../../api/server";
import {CreateFilterEncoding, CreatePaginationEncoding} from "../../../Utils/Base64/request";
import {Action, AnotherAction, DropdownButton, SomethingElseHere} from "../../../Constant";
import {Edit} from "react-feather";
import EditTemuanModalDropdownButton from "./Modals/EditTemuanModalDropdownButton";
import EditJenisTemuanModalDropdownButton from "./Modals/EditJenisTemuanModalDropdownButton";


const FileContent = ({setCount}) => {
    const [data, setData] = useState([]);
    const [toggleCleared, setToggleCleared] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [pending, setPending] = useState(true)
    // const [todayRows, setTodayRows] = useState(0)
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
            name: "PEMAKAIAN KWH",
            selector: (row) => row.pemakaian_kwh,
            sortable: true
        },
        {
            center: true,
            name: "REDAKSI TEMUAN",
            selector: (row) => row.redaksi_temuan,
            sortable: true
        },
        {
            center: true,
            name: "JENIS TEMUAN",
            selector: (row) => row.jenis_temuan,
            sortable: true
        },
        {
            center: true,
            name: "STATUS BAYAR",
            selector: (row) => row.status,
            sortable: true
        },
        {
            center: true,
            name: "STATUS MANGKRAK",
            selector: (row) => row.status_mangkrak,
            sortable: true
        },
        {
            center: true,
            name: "NOMOR BA",
            selector: (row) => row.nomor_ba,
            sortable: true
        },
        {
            center: true,
            name: "MATERIAL KWH METER",
            selector: (row) => row.material_kwh_meter,
            sortable: true
        },
        {
            center: true,
            name: "MATERIAL TIC CABLE",
            selector: (row) => row.material_tic_cable,
            sortable: true
        },
        {
            center: true,
            name: "MATERIAL MCB",
            selector: (row) => row.material_mcb,
            sortable: true
        }
    ]


    useEffect(() => {
        axios.get(API_DATA_REPORT_TEMUAN + "?core-only=true&pagination=" + CreatePaginationEncoding(pagination.count, pagination.offset)).then((res) => {
            if (res.status === 200) {
                return res.data
            }
        }).then((json) => {


            setData(json["data"]["data"]);
            setTotalRows(json["data"]["count"]["all"])
            // setTodayRows(json["data"]["count"]["today"])

            setCount({
                allData: totalRows,
                newData: 0,
            })


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

    const onFileEdit = () => {
        // if (selectedRows.length <= 0) {
        //     toast.error('Please Select at least one row !');
        // } else if (selectedRows.length > 1) {
        //     toast.error('Can\'t Edit more than 1 Rows at once !');
        // }
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
                        SweetAlert.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        );
                    }
                });
        }
    };

    // const contextActions = useMemo(() => {
    //     const handleDelete = () => {
    //         if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.name)}?`)) {
    //             setToggleCleared(!toggleCleared);
    //             setData(differenceBy(data, selectedRows, 'name'));
    //             toast.success('Successfully Deleted !');
    //         }
    //     };
    //
    //     return <button key="delete" className="btn btn-danger" onClick={handleDelete}>Delete</button>;
    // }, [data, selectedRows, toggleCleared]);

    const handleRowSelected = useCallback(state => {
        setSelectedRows(state.selectedRows);
    }, []);

    const handleFilterImplement = (data) => {
        setPending(true);
        axios.get(API_DATA_REPORT_TEMUAN + "?pagination=" + CreatePaginationEncoding(pagination.count, pagination.offset) + "&filter=" + CreateFilterEncoding(data)).then((res) => {
            if (res.status === 200) {
                return res.data
            }
        }).then((json) => {
            if (json["data"]["data"] !== null) {
                setData(json["data"]["data"]);
                setTotalRows(json["data"]["count"]["all"])
                // setTodayRows(json["data"]["count"]["today"])
            } else {
                setData([]);
            }
            setPending(false);
        })
    }

    const handleOnSave = (userID) => {
        let tosoIDs = []

        selectedRows.map((value) => {
            tosoIDs = [...tosoIDs, value.ID]
        })

        axios.post(API_USER_WORK_TO_SO, {
            user_id: userID,
            to_so_id: tosoIDs
        }).then((res) => {
            if (res.status === 204) {
                SweetAlert.fire(
                    'Saved!',
                    'Your Update has been deleted.',
                    'success'
                );
                setSelectedRows([])
            }
        }).catch((err) => {
            console.log(err)
            SweetAlert.fire(
                'Error!',
                'We have error on this request, try again',
                'error'
            );
        })
    }

    const handleEditImplement = (data) => {
        setPending(true);
        axios.put(API_DATA_REPORT_TEMUAN, data).then((res) => {
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

    const handleEditJenisImplement = (data) => {
        setPending(true);
        axios.put(API_DATA_REPORT_TEMUAN_JENIS_TEMUAN, data).then((res) => {
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
                            <Dropdown className="dropdown">
                                <Btn attrBtn={{color: 'primary', className: 'dropbtn'}}>Edit <span><i
                                    className="icofont icofont-arrow-down"></i></span></Btn>
                                <DropdownMenu className="dropdown-content">
                                    <EditTemuanModalDropdownButton defaultVal={selectedRows} onImplement={handleEditImplement}/>
                                    <EditJenisTemuanModalDropdownButton defaultVal={selectedRows} onImplement={handleEditJenisImplement}/>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        {/*    <CreatePenugasanModalButton onSave={handleOnSave}/>*/}
                        {/*    <div className="btn btn-outline-primary ms-2" onClick={onFileEdit}>*/}

                        {/*        <Edit/>{'Edit Penugasan'}*/}
                        {/*    </div>*/}
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
                        // contextActions={contextActions}
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