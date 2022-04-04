import React from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {Btn} from '../../../../AbstractElements';
import {Close} from '../../../../Constant';

const CommonFilterModal = (props) => {
    return (
        <Modal isOpen={props.isOpen} toggle={props.toggler} size={props.size} centered>
            <ModalHeader toggle={props.toggler}>
                {props.title}
            </ModalHeader>
            <ModalBody className={props.bodyClass}>
                {props.children}
            </ModalBody>
            <ModalFooter>
                <Btn attrBtn={{color: 'secondary', onClick: props.toggler}}>{Close}</Btn>
                <Btn
                    attrBtn={{color: 'primary', onClick: props.onImplement ? props.onImplement : props.toggler}}>{"Implement"}</Btn>
            </ModalFooter>
        </Modal>
    );
};

export default CommonFilterModal;