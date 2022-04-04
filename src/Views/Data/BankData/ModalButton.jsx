import React, {Fragment, useState} from 'react';
// import {NewMessage} from '../../../../../Constant';
import FormModal from './FormModal';
import {PlusSquare} from "react-feather";
import {NewDataBank, NewMessage} from "../../../Constant";

const ModalButton = ({defaultVal}) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    return (
        <Fragment>
            {/*<Btn attrBtn={{ color: 'primary', onClick: toggle }}>{btnText}</Btn>*/}

            <div className="btn btn-primary" onClick={toggle}><PlusSquare/>Create</div>
            <FormModal modal={modal} NewMessage={NewDataBank} toggle={toggle} defaultVal={defaultVal}/>
        </Fragment>
    );
};

export default ModalButton;