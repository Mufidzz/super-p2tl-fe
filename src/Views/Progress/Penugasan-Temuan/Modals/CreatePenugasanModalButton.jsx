import React, {Fragment, useState} from 'react';
import {PlusSquare} from "react-feather";
import {NewDataBank, NewMessage} from "../../../../Constant";
import CreatePenugasanModal from "./CreatePenugasanModal";
import {toast} from "react-toastify";

const CreatePenugasanModalButton = ({defaultVal, onSave}) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const handleOnSave = (userId) => {
        onSave(userId);
        toggle();
    }


    return (
        <Fragment>
            <div className="btn btn-primary" onClick={toggle}><PlusSquare/>Buat Penugasan</div>
            <CreatePenugasanModal modal={modal} NewMessage={NewDataBank} toggle={toggle} defaultVal={defaultVal} onSave={handleOnSave}/>
        </Fragment>
    );
};

export default CreatePenugasanModalButton;