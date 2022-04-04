import React, {useState} from 'react';
import {Form, FormGroup, Input, Label} from 'reactstrap';
import {Typeahead} from "react-bootstrap-typeahead";
import CommonFilterModal from "../../../../Components/UiKits/Modals/common/filter_modal";
import {options2} from "../../../../Components/Forms/FormWidget/FormSelect2/OptionDatas";
import Select from "react-select";

const CreateTOSOModal = ({modal, NewMessage, toggle, defaultVal, onImplement}) => {
    const [filterParam, setFilterParam] = useState({
        idpel: "",
        nyala400: "All",
        nyala600: "All",
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
                    <Input className="form-control" type="text" defaultValue={defaultVal}
                           onChange={(e) => setFilterParam({...filterParam, idpel: e.target.value})}/>
                </FormGroup>
                <FormGroup>
                    <Label className="col-form-label" for="jam-nyala-400"> {'Jam Nyala 400:'}</Label>
                    <Select
                        options={[
                            { value: 'All', label: 'All' },
                            { value: '> 400', label: '> 400' },
                            { value: '<= 400', label: '<= 400' },
                        ]}
                        defaultValue={{ value: 'All', label: 'All' }}
                        className="js-example-basic-single col-sm-12"
                        onChange={(opt) => {
                            setFilterParam({
                                ...filterParam,
                                nyala400: opt.value
                            })
                        }}
                    />
                </FormGroup>
                <FormGroup>
                    <Label className="col-form-label" for="jam-nyala-600"> {'Jam Nyala 600:'}</Label>
                    <Select
                        options={[
                            { value: 'All', label: 'All' },
                            { value: '> 600', label: '> 600' },
                            { value: '<= 600', label: '<= 600' },
                        ]}
                        defaultValue={{ value: 'All', label: 'All' }}
                        className="js-example-basic-single col-sm-12"
                        onChange={(opt) => {
                            setFilterParam({
                                ...filterParam,
                                nyala600: opt.value
                            })
                        }}
                    />
                </FormGroup>
            </Form>
        </CommonFilterModal>

    );
};

export default CreateTOSOModal;