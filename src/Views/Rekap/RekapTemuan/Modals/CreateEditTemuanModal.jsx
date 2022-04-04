import React, {useEffect, useState} from 'react';
import {Form, FormGroup, Input, Label} from 'reactstrap';
import CommonFilterModal from "../../../../Components/UiKits/Modals/common/filter_modal";


const CreateEditTemuanModal = ({modal, NewMessage, toggle, defaultVal, onImplement}) => {
    const [data, setData] = useState({
        id: 0,
        idpel: "",
        nomor_ba: "",
        jenis_temuan: null,
        material_kwh_meter: "",
        material_mcb: "",
        material_tic_cable: "",
        redaksi_temuan: "",
        pemakaian_kwh: null,
        status: 0,
        status_mangkrak: 0
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
                    <Label className="col-form-label">NOMOR BA:</Label>
                    <Input className="form-control" type="text" defaultValue={data.nomor_ba}
                           onChange={(e) => setData({...data, nomor_ba: e.target.value})}/>
                </FormGroup>

                <FormGroup>
                    <Label className="col-form-label">JENIS TEMUAN:</Label>
                    <Input className="form-control" type="text" defaultValue={data.jenis_temuan}
                           onChange={(e) => setData({...data, jenis_temuan: e.target.value})}/>
                </FormGroup>

                <FormGroup>
                    <Label className="col-form-label">KWH METER:</Label>
                    <Input className="form-control" type="text" defaultValue={data.material_kwh_meter}
                           onChange={(e) => setData({...data, material_kwh_meter: e.target.value})}/>
                </FormGroup>

                <FormGroup>
                    <Label className="col-form-label">MCB:</Label>
                    <Input className="form-control" type="text" defaultValue={data.material_mcb}
                           onChange={(e) => setData({...data, material_mcb: e.target.value})}/>
                </FormGroup>

                <FormGroup>
                    <Label className="col-form-label">TIC CABLE:</Label>
                    <Input className="form-control" type="text" defaultValue={data.material_tic_cable}
                           onChange={(e) => setData({...data, material_tic_cable: e.target.value})}/>
                </FormGroup>

                <FormGroup>
                    <Label className="col-form-label">REDAKSI TEMUAN:</Label>
                    <Input className="form-control" type="text" defaultValue={data.redaksi_temuan}
                           onChange={(e) => setData({...data, redaksi_temuan: e.target.value})}/>
                </FormGroup>

                <FormGroup>
                    <Label className="col-form-label">PEMAKAIAN KWH:</Label>
                    <Input className="form-control" type="text" defaultValue={data.pemakaian_kwh}
                           onChange={(e) => setData({...data, pemakaian_kwh: e.target.value})}/>
                </FormGroup>

                <FormGroup>
                    <Label className="col-form-label">STATUS:</Label>
                    <Input className="form-control" type="text" defaultValue={data.status}
                           onChange={(e) => setData({...data, status: parseInt(e.target.value)})}/>
                </FormGroup>

                <FormGroup>
                    <Label className="col-form-label">STATUS MANGKRAK:</Label>
                    <Input className="form-control" type="text" defaultValue={data.status_mangkrak}
                           onChange={(e) => setData({...data, status_mangkrak: parseInt(e.target.value)})}/>
                </FormGroup>

            </Form>
        </CommonFilterModal>

    );
};

export default CreateEditTemuanModal;