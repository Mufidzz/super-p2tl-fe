import React, {Fragment, useState} from 'react';

import {DropdownItem} from "reactstrap";
import {toast} from "react-toastify";
import CreateEditTemuanModal from "./CreateEditTemuanModal";

const EditTemuanModalDropdownButton = ({defaultVal, onImplement}) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const handleClick = () => {
        if (defaultVal === undefined || defaultVal.length !== 1) {
            toast.error('Please Select one row !');
        } else {
            setModal(true);
        }
    }

    return (
        <Fragment>
            <DropdownItem href="#" onClick={handleClick}>Edit Temuan</DropdownItem>
            <CreateEditTemuanModal modal={modal} NewMessage={"Data Temuan"} toggle={toggle} defaultVal={defaultVal[0]}
                                   onImplement={onImplement}/>
        </Fragment>
    );
};

export default EditTemuanModalDropdownButton;