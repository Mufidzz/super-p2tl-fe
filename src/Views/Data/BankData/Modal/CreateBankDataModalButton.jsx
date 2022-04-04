import React, {Fragment, useState} from 'react';
import {PlusSquare, Upload} from "react-feather";
import CreateBankDataModal from "./CreateBankDataModal";


const CreateBankDataModalButton = ({defaultVal, onImplement, categories}) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return (
        <Fragment>
            <div className="btn btn-primary ms-2" onClick={toggle}><Upload/> Upload </div>
            <CreateBankDataModal modal={modal} NewMessage={"Data DIL"} toggle={toggle} onImplement={onImplement} categories={categories}/>
        </Fragment>
    );
};

export default CreateBankDataModalButton;