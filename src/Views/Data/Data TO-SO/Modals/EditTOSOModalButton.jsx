import React, {Fragment, useEffect, useState} from 'react';
import {DropdownItem} from "reactstrap";
import {toast} from "react-toastify";
import CreateEditTOSOModal from "./CreateEditTOSOModal";

const EditTOSOModalButton = ({defaultVal, onImplement}) => {
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
            <DropdownItem href="#" onClick={handleClick}>Edit</DropdownItem>
            <CreateEditTOSOModal modal={modal} NewMessage={"Data DIL"} toggle={toggle} defaultVal={defaultVal[0]} onImplement={onImplement}/>
        </Fragment>
    );
};

export default EditTOSOModalButton;