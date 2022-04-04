import React, {Fragment, useContext, useEffect, useState} from 'react';
import {Edit, Printer} from 'react-feather';
import {CardBody, Pagination, PaginationItem, PaginationLink, Table} from 'reactstrap';
import {Next, NoTasksFound, Previous} from '../../../../Constant';
import TaskContext from '../../../../_helper/Task';
import SweetAlert from 'sweetalert2';
import {Btn, H6, P} from '../../../../AbstractElements';
import ReactPaginate from "react-paginate";
import axios from "axios";
import {API_DATA_TO_SO, API_REPORT_TEMUAN_MANGKRAK} from "../../../../api/server";
import {CreatePaginationEncoding} from "../../../../Utils/Base64/request";

const CreatedByme = () => {
    const {RemoveTask} = useContext(TaskContext);

    const deleteTask = (userId) => {
        SweetAlert.fire({
            title: 'Are you sure?',
            text: 'Once deleted, you will not be able to recover this imaginary file!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ok',
            cancelButtonText: 'cancel',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                RemoveTask(userId);
                SweetAlert.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                );
            } else {
                SweetAlert.fire(
                    'Your imaginary file is safe!'
                );
            }
        });
    };

    const [tasks, setTasks] = useState([])
    const [paginationTotalPage, setPaginationTotalPage] = useState(1)
    const [paginationSelectedPage, setPaginationSelectedPage] = useState(1)
    const [pagination, setPagination] = useState({
        offset : 0,
        count : 10,
    })


    useEffect(() => {
        axios.get(API_REPORT_TEMUAN_MANGKRAK + "?pagination=" + CreatePaginationEncoding(pagination.count, pagination.count * (paginationSelectedPage - 1))).then((res) => {
            if (res.status === 200) {
                return res.data
            }
        }).then((json) => {
            console.log(json["data"])

            if (json["data"]["data"] !== null) {
                setTasks(json["data"]["temuan"])
                setPaginationTotalPage(Math.ceil(json["data"]["count"] / pagination.count))
            }
        })

    }, [paginationSelectedPage])


    return (
        <Fragment>
            <CardBody className="p-0">
                <div className="taskadd">
                    <div className="table-responsive table-borderless">
                        <Table>
                            <thead>
                            <tr/>
                            </thead>
                            <tbody>
                            {tasks && tasks.length ?
                                tasks.map((tasklistdata, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>
                                                <H6 attrH6={{className: 'task_title_0'}}>No. {tasklistdata.nomor_ba}</H6>
                                                <P attrPara={{className: 'project_name_0'}}>IDPEL : {tasklistdata.idpel}</P>
                                            </td>
                                            <td>
                                                <P attrPara={{className: 'task_desc_0'}}>{tasklistdata.created_at}</P>
                                            </td>
                                            <td>
                                                <P attrPara={{className: 'task_desc_0'}}>{`${tasklistdata.status_bayar} - ${tasklistdata.status_mangkrak}`}</P>
                                            </td>
                                            <td>
                                                <Btn attrBtn={{
                                                    color: 'secondary',
                                                    size: 'xs',
                                                    outline: true,
                                                }}
                                                >
                                                    <Edit/> Update Status
                                                </Btn>

                                                <Btn attrBtn={{
                                                    color: 'primary',
                                                    size: 'xs',
                                                    outline: true,
                                                    className : "ms-2"
                                                }}
                                                >
                                                    <Printer/> Cetak Surat
                                                </Btn>
                                            </td>

                                        </tr>
                                    );
                                })
                                : <tr>
                                    <td>
                                        <div className="no-favourite"><span>{NoTasksFound}</span></div>
                                    </td>
                                </tr>
                            }
                            </tbody>
                        </Table>
                        <Pagination aria-label="Page navigation example" className="pagination-primary">
                            <PaginationItem><PaginationLink onClick={() => setPaginationSelectedPage(paginationSelectedPage <= 1 ? 1 : paginationSelectedPage - 1)}>{Previous}</PaginationLink></PaginationItem>

                            {
                                [...Array(paginationTotalPage)].map((v, i) => {
                                    return <PaginationItem key={i}><PaginationLink onClick={() => setPaginationSelectedPage(i + 1)}>{i + 1}</PaginationLink></PaginationItem>
                                })
                            }

                            {/*<PaginationItem><PaginationLink href="#javascript">{'1'}</PaginationLink></PaginationItem>*/}
                            {/*<PaginationItem><PaginationLink href="#javascript">{'2'}</PaginationLink></PaginationItem>*/}
                            {/*<PaginationItem><PaginationLink href="#javascript">{'3'}</PaginationLink></PaginationItem>*/}
                            <PaginationItem><PaginationLink onClick={() => setPaginationSelectedPage(paginationSelectedPage >= paginationTotalPage ? paginationSelectedPage : paginationSelectedPage + 1)}>{Next}</PaginationLink></PaginationItem>
                        </Pagination>

                        {/*<ReactPaginate*/}
                        {/*    breakLabel="..."*/}
                        {/*    nextLabel="next >"*/}
                        {/*    onPageChange={(e) => {*/}
                        {/*        console.log(e)*/}
                        {/*    }}*/}
                        {/*    pageRangeDisplayed={5}*/}
                        {/*    pageCount={paginationTotalPage}*/}
                        {/*    previousLabel="< previous"*/}
                        {/*    renderOnZeroPageCount={null}*/}
                        {/*/>*/}
                    </div>
                </div>
            </CardBody>
        </Fragment>
    );
};

export default CreatedByme;