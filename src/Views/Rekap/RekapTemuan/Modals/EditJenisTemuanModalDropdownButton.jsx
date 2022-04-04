import React, {Fragment, useState} from 'react';

import {DropdownItem} from "reactstrap";
import {toast} from "react-toastify";
import CreateEditTemuanModal from "./CreateEditJenisTemuanModal";

const EditJenisTemuanModalDropdownButton = ({defaultVal, onImplement}) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [initialValue, setInitialValue] = useState({})

    const handleClick = () => {
        if (defaultVal === undefined || defaultVal.length < 1) {
            toast.error('Please Select at least one row !');
        } else {
            setInitialValue({
                ids: [...defaultVal.map((e) => e.id)],
                jenis_temuan: "",
            })

            setModal(true);
        }
    }

    return (
        <Fragment>
            <DropdownItem href="#" onClick={handleClick}>Edit Jenis Temuan</DropdownItem>
            <CreateEditTemuanModal modal={modal} NewMessage={"Data Temuan"} toggle={toggle} defaultVal={initialValue}
                                   onImplement={onImplement}/>
        </Fragment>
    );
};

export default EditJenisTemuanModalDropdownButton;