import React, {Fragment, useEffect, useState} from 'react';
import {Edit, Filter, PlusSquare} from "react-feather";

import FilterDILModal from "./FilterDILModal";
import CreateEditDILModal from "./CreateEditDILModal";
import {DropdownItem} from "reactstrap";
import {toast} from "react-toastify";

const EditDILModalDropdownButton = ({defaultVal, onImplement}) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const handleClick = () => {
        console.log(defaultVal)

        if (defaultVal === undefined || defaultVal.length !== 1) {
            toast.error('Please Select one row !');
        } else {
            setModal(true);
        }
    }


    return (
        <Fragment>
            <DropdownItem href="#" onClick={handleClick}>Edit</DropdownItem>
            <CreateEditDILModal modal={modal} NewMessage={"Data DIL"} toggle={toggle} defaultVal={defaultVal[0]} onImplement={onImplement}/>
        </Fragment>
    );
};

export default EditDILModalDropdownButton;