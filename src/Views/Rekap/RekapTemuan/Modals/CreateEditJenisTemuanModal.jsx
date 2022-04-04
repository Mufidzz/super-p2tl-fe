import React, {useEffect, useState} from 'react';
import {Form, FormGroup, Input, Label} from 'reactstrap';
import CommonFilterModal from "../../../../Components/UiKits/Modals/common/filter_modal";


const CreateEditJenisTemuanModal = ({modal, NewMessage, toggle, defaultVal, onImplement}) => {
    const [data, setData] = useState({
        ids: [],
        jenis_temuan: null,
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
                    <Label className="col-form-label">JENIS TEMUAN:</Label>
                    <Input className="form-control" type="text" defaultValue={data.jenis_temuan}
                           onChange={(e) => setData({...data, jenis_temuan: e.target.value})}/>
                </FormGroup>

            </Form>
        </CommonFilterModal>

    );
};

export default CreateEditJenisTemuanModal;