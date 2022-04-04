import React, {Fragment, useState} from 'react';
import {Filter, PlusSquare} from "react-feather";

import FilterDILModal from "./FilterDILModal";

const FilterDILModalButton = ({defaultVal, onImplement}) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return (
        <Fragment>
            <div className="btn btn-outline-secondary ms-2" onClick={toggle}><Filter/>{'Filter'}</div>
            <FilterDILModal modal={modal} NewMessage={"Filter"} toggle={toggle} defaultVal={defaultVal} onImplement={onImplement}/>
        </Fragment>
    );
};

export default FilterDILModalButton;