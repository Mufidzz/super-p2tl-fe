import React, {useState} from 'react';
import {Form, FormGroup, Input, Label} from 'reactstrap';
import {Typeahead} from "react-bootstrap-typeahead";
import CommonFilterModal from "../../../../Components/UiKits/Modals/common/filter_modal";
import {options2} from "../../../../Components/Forms/FormWidget/FormSelect2/OptionDatas";
import Select from "react-select";

const FilterTOSOModal = ({modal, NewMessage, toggle, defaultVal, onImplement}) => {
    const [filterParam, setFilterParam] = useState({
        idpel: "",
        nama_gardu: "All",
        keterangan: "All",
    })

    const handleChangeType400 = (selected) => {
        setFilterParam({
            ...filterParam,
            nyala400: selected,
        })
    }

    const handleChangeType600 = (selected) => {
        console.log(selected)
    }

    const handleOnImplement = () => {
        onImplement(filterParam)
    }


    return (
        <CommonFilterModal isOpen={modal} title={NewMessage} toggler={toggle} onImplement={handleOnImplement}>
            <Form>
                <FormGroup>
                    <Label className="col-form-label">{'IDPEL:'}</Label>
                    <Input className="form-control" type="text" defaultValue={""}
                           onChange={(e) => setFilterParam({...filterParam, idpel: e.target.value})}/>
                </FormGroup>

                <FormGroup>
                    <Label className="col-form-label">{'KETERANGAN:'}</Label>
                    <Input className="form-control" type="text" defaultValue={""}
                           onChange={(e) => setFilterParam({...filterParam, keterangan: e.target.value})}/>
                </FormGroup>

                <FormGroup>
                    <Label className="col-form-label">{'NAMA GARDU:'}</Label>
                    <Input className="form-control" type="text" defaultValue={""}
                           onChange={(e) => setFilterParam({...filterParam, nama_gardu: e.target.value})}/>
                </FormGroup>
            </Form>
        </CommonFilterModal>

    );
};

export default FilterTOSOModal;