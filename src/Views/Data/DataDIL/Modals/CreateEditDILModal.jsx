import React, {useEffect, useState} from 'react';
import {Form, FormGroup, Input, Label} from 'reactstrap';
import CommonFilterModal from "../../../../Components/UiKits/Modals/common/filter_modal";


const CreateEditDILModal = ({modal, NewMessage, toggle, defaultVal, onImplement}) => {
    const [data, setData] = useState({
        id: 0,
        idpel: "",
        nama: "",
        alamat: "",
        merk_meter: "",
        daya: "",
        no_tiang: "",
        nama_gardu: "",
        tarif: "",
        no_kwh: "",
        jenis_mk: "",
        th_tera_kwh: "",
        koordinat_x: "",
        koordinat_y: ""
    })

    useEffect(() => {
        console.log("dv", defaultVal)

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
                    <Label className="col-form-label">NAMA:</Label>
                    <Input className="form-control" type="text" defaultValue={data.nama}
                           onChange={(e) => setData({...data, nama: e.target.value})}/>
                </FormGroup>

                <FormGroup>
                    <Label className="col-form-label">ALAMAT:</Label>
                    <Input className="form-control" type="text" defaultValue={data.alamat}
                           onChange={(e) => setData({...data, alamat: e.target.value})}/>
                </FormGroup>


                <FormGroup>
                    <Label className="col-form-label">MERK METER:</Label>
                    <Input className="form-control" type="text" defaultValue={data.merk_meter}
                           onChange={(e) => setData({...data, merk_meter: e.target.value})}/>
                </FormGroup>

                <FormGroup>
                    <Label className="col-form-label">DAYA:</Label>
                    <Input className="form-control" type="text" defaultValue={data.daya}
                           onChange={(e) => setData({...data, daya: e.target.value})}/>
                </FormGroup>


                <FormGroup>
                    <Label className="col-form-label">NO TIANG:</Label>
                    <Input className="form-control" type="text" defaultValue={data.no_tiang}
                           onChange={(e) => setData({...data, no_tiang: e.target.value})}/>
                </FormGroup>


                <FormGroup>
                    <Label className="col-form-label">NAMA GARDU:</Label>
                    <Input className="form-control" type="text" defaultValue={data.nama_gardu}
                           onChange={(e) => setData({...data, nama_gardu: e.target.value})}/>
                </FormGroup>


                <FormGroup>
                    <Label className="col-form-label">TARIF:</Label>
                    <Input className="form-control" type="text" defaultValue={data.tarif}
                           onChange={(e) => setData({...data, tarif: e.target.value})}/>
                </FormGroup>


                <FormGroup>
                    <Label className="col-form-label">NO KWH:</Label>
                    <Input className="form-control" type="text" defaultValue={data.no_kwh}
                           onChange={(e) => setData({...data, no_kwh: e.target.value})}/>
                </FormGroup>


                <FormGroup>
                    <Label className="col-form-label">JENIS MK:</Label>
                    <Input className="form-control" type="text" defaultValue={data.jenis_mk}
                           onChange={(e) => setData({...data, jenis_mk: e.target.value})}/>
                </FormGroup>


                <FormGroup>
                    <Label className="col-form-label">TH TERA KWH:</Label>
                    <Input className="form-control" type="text" defaultValue={data.th_tera_kwh}
                           onChange={(e) => setData({...data, th_tera_kwh: e.target.value})}/>
                </FormGroup>


                <FormGroup>
                    <Label className="col-form-label">KOORDINAT X:</Label>
                    <Input className="form-control" type="text" defaultValue={data.koordinat_x}
                           onChange={(e) => setData({...data, koordinat_x: e.target.value})}/>
                </FormGroup>


                <FormGroup>
                    <Label className="col-form-label">KOORDINAT Y:</Label>
                    <Input className="form-control" type="text" defaultValue={data.koordinat_y}
                           onChange={(e) => setData({...data, koordinat_y: e.target.value})}/>
                </FormGroup>

            </Form>
        </CommonFilterModal>

    );
};

export default CreateEditDILModal;