import React, {Fragment, useState} from 'react';
import {Edit, Filter, PlusSquare} from "react-feather";
import CreateEditDILModal from "./CreateEditDILModal";


const CreateDILModalButton = ({defaultVal, onImplement}) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return (
        <Fragment>
            <div className="btn btn-primary" onClick={toggle}><PlusSquare/>Create</div>
            <CreateEditDILModal modal={modal} NewMessage={"Data DIL"} toggle={toggle} onImplement={onImplement}/>
        </Fragment>
    );
};

export default CreateDILModalButton;