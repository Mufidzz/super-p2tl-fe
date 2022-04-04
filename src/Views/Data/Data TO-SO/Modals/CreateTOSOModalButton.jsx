import React, {Fragment, useState} from 'react';
import {PlusSquare} from "react-feather";

import CreateEditTOSOModal from "./CreateEditTOSOModal";

const CreateTOSOModalButton = ({defaultVal, onImplement}) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return (
        <Fragment>
            <div className="btn btn-primary" onClick={toggle}><PlusSquare/>Create</div>
            <CreateEditTOSOModal modal={modal} NewMessage={"Data DIL"} toggle={toggle} onImplement={onImplement}/>
        </Fragment>
    );
};

export default CreateTOSOModalButton;