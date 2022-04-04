import React, {useState} from 'react';
import {Form, FormGroup, Input, Label} from 'reactstrap';
import {Typeahead} from "react-bootstrap-typeahead";
import CommonFilterModal from "../../../../Components/UiKits/Modals/common/filter_modal";
import {options2} from "../../../../Components/Forms/FormWidget/FormSelect2/OptionDatas";
import Select from "react-select";

const CreateTOSOModal = ({modal, NewMessage, toggle, defaultVal, onImplement}) => {
    const [filterParam, setFilterParam] = useState({
        idpel: "",
        jenis_temuan: "",
        nomor_ba: "All",
    })


    const handleOnImplement = () => {
        onImplement(filterParam)
    }


    return (
        <CommonFilterModal isOpen={modal} title={NewMessage} toggler={toggle} onImplement={handleOnImplement}>
            <Form>
                <FormGroup>
                    <Label className="col-form-label">{'IDPEL:'}</Label>
                    <Input className="form-control" type="text" defaultValue={defaultVal}
                           onChange={(e) => setFilterParam({...filterParam, idpel: e.target.value})}/>
                </FormGroup>
                <FormGroup>
                    <Label className="col-form-label">{'NO BA:'}</Label>
                    <Input className="form-control" type="text" defaultValue={defaultVal}
                           onChange={(e) => setFilterParam({...filterParam, nomor_ba: e.target.value})}/>
                </FormGroup>
                <FormGroup>
                    <Label className="col-form-label">{'JENIS PELANGGARAN:'}</Label>
                    <Input className="form-control" type="text" defaultValue={defaultVal}
                           onChange={(e) => setFilterParam({...filterParam, jenis_temuan: e.target.value})}/>
                </FormGroup>
            </Form>
        </CommonFilterModal>

    );
};

export default CreateTOSOModal;