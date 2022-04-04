import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {Edit} from 'react-feather';
import {toast} from 'react-toastify';
import {Image, Spinner} from '../../../AbstractElements';
import {CardBody, CardHeader, Media} from 'reactstrap';
import errorImg from '../../../assets/images/search-not-found.png';
import DataTable from 'react-data-table-component';
import SweetAlert from "sweetalert2";
import FilterTOSOModalButton from "./Modals/FilterTOSOModalButton";
import axios from "axios";
import {
    API_DATA_REPORT_PENORMALAN,
    API_DATA_REPORT_TEMUAN,
    API_DATA_TO_SO,
    API_USER_WORK_TO_SO
} from "../../../api/server";
import {CreateFilterEncoding, CreatePaginationEncoding} from "../../../Utils/Base64/request";
import CreatePenugasanModalButton from "./Modals/CreatePenugasanModalButton";


const FileContent = () => {
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
            center:true,
            name:"Tanggal",
            selector:(row) => row.created_at,
            sortable:true
        },
        {
            center:true,
            name:"IDPEL",
            selector:(row) => row.idpel,
            sortable:true
        },
        {
            center:true,
            name:"NO_METER",
            selector:(row) => row.no_meter,
            sortable:true
        },
        {
            center:true,
            name:"TYPE_METER",
            selector:(row) => row.type_meter,
            sortable:true
        },
        {
            center:true,
            name:"MERK_METER",
            selector:(row) => row.merk_meter,
            sortable:true
        },
        {
            center:true,
            name:"TAHUN_METER",
            selector:(row) => row.tahun_meter,
            sortable:true
        },
        {
            center:true,
            name:"NO_SEGEL",
            selector:(row) => row.no_segel,
            sortable:true
        },
        {
            center:true,
            name:"MERK_PEMBATAS",
            selector:(row) => row.merk_pembatas,
            sortable:true
        },
        {
            center:true,
            name:"RATING_PEMBATAS",
            selector:(row) => row.rating_pembatas,
            sortable:true
        },
        {
            center:true,
            name:"PANJANG_SR",
            selector:(row) => row.panjang_sr,
            sortable:true
        },
        {
            center:true,
            name:"STAND_CABUT",
            selector:(row) => row.stand_cabut,
            sortable:true
        },
        {
            center:true,
            name:"STAND_PASANG",
            selector:(row) => row.stand_pasang,
            sortable:true
        },
    ]


    useEffect(() => {
        axios.get(API_DATA_REPORT_PENORMALAN + "?core-only=true&pagination=" + CreatePaginationEncoding(pagination.count, pagination.offset) ).then((res) => {
            if (res.status === 200) {
                return res.data
            }
        }).then((json) => {

            // setCount({
            //     allData: totalRows,
            //     newData: todayRows,
            // })

            setData(json["data"]["data"]);
            setTotalRows(json["data"]["count"]["all"])
            // setTodayRows(json["data"]["count"]["today"])
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
        axios.get(API_DATA_REPORT_PENORMALAN + "?pagination=" + CreatePaginationEncoding(pagination.count, pagination.offset) + "&filter=" + CreateFilterEncoding(data)).then((res) => {
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

    return (
        <Fragment>
            <CardHeader>
                <Media>
                    <FilterTOSOModalButton onImplement={handleFilterImplement}/>
                    {/*<Media body className="text-end">*/}
                    {/*    <CreatePenugasanModalButton onSave={handleOnSave}/>*/}
                    {/*    <div className="btn btn-outline-primary ms-2" onClick={onFileEdit}><Edit/>{'Edit Penugasan'}*/}
                    {/*    </div>*/}
                    {/*</Media>*/}
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