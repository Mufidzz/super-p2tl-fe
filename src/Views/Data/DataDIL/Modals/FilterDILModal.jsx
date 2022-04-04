import React, {useState} from 'react';
import {Form, FormGroup, Input, Label} from 'reactstrap';
import CommonFilterModal from "../../../../Components/UiKits/Modals/common/filter_modal";


const FilterDILModal = ({modal, NewMessage, toggle, defaultVal, onImplement}) => {
    const [filterParam, setFilterParam] = useState({
        idpel: "",
        no_kwh : ""
    })


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
                    <Label className="col-form-label">{'NO KWH:'}</Label>
                    <Input className="form-control" type="text" defaultValue={""}
                           onChange={(e) => setFilterParam({...filterParam, no_kwh: e.target.value})}/>
                </FormGroup>

            </Form>
        </CommonFilterModal>

    );
};

export default FilterDILModal;