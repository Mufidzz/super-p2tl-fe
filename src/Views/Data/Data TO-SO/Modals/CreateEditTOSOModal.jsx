import React, {useEffect, useState} from 'react';
import {Form, FormGroup, Input, Label} from 'reactstrap';
import CommonFilterModal from "../../../../Components/UiKits/Modals/common/filter_modal";


const CreateEditTOSOModal = ({modal, NewMessage, toggle, defaultVal, onImplement}) => {
    const [data, setData] = useState({
       idpel: "",
       keterangan: ""
    })

    useEffect(() => {
        if (defaultVal !== null && defaultVal !== undefined) {
            setData({...defaultVal})
        }
    }, [defaultVal])


    const handleOnImplement = () => {
        onImplement(data)
    }

    return (
        <CommonFilterModal isOpen={modal} title={NewMessage} toggler={toggle} onImplement={handleOnImplement}>
            <Form>
                <FormGroup>
                    <Label className="col-form-label">IDPEL:</Label>
                    <Input className="form-control" type="text" defaultValue={data.idpel}
                           onChange={(e) => setData({...data, idpel: e.target.value})}/>
                </FormGroup>

                <FormGroup>
                    <Label className="col-form-label">KETERANGAN:</Label>
                    <Input className="form-control" type="text" defaultValue={data.keterangan}
                           onChange={(e) => setData({...data, keterangan: e.target.value})}/>
                </FormGroup>

            </Form>
        </CommonFilterModal>

    );
};

export default CreateEditTOSOModal;