import React, {Fragment, useState} from 'react';
import {Filter, PlusSquare} from "react-feather";
import FilterTOSOModal from "./FilterTOSOModal";
import SweetAlert from "sweetalert2";

const FilterTOSOModalButton = ({defaultVal, onImplement}) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return (
        <Fragment>
            <div className="btn btn-outline-secondary ms-2" onClick={toggle}><Filter/>{'Filter'}</div>
            <FilterTOSOModal modal={modal} NewMessage={"Filter"} toggle={toggle} defaultVal={defaultVal} onImplement={onImplement}/>
        </Fragment>
    );
};

export default FilterTOSOModalButton;