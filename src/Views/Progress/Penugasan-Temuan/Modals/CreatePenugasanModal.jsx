import React, {useState} from 'react';
import {Form, FormGroup, Input, Label} from 'reactstrap';
import CommonModal from "../../../../Components/UiKits/Modals/common/modal";
import Dropzone from "react-dropzone-uploader";
import {Typeahead} from "react-bootstrap-typeahead";
import axios from "axios";
import {API_DATA_TO_SO, API_USER_PETUGAS, API_WORKLOAD_TO_SO} from "../../../../api/server";
import {CreateFilterEncoding, CreatePaginationEncoding} from "../../../../Utils/Base64/request";

const CreatePenugasanModal = ({modal, NewMessage, toggle, defaultVal, onSave}) => {
    const [options, setOptions] = useState([])
    const [selectedUserID, setSelectedUserID] = useState(0)
    const [wait, setWait] = useState(false)

    const handleChangeType =  (text, evt)  => {
        setWait(true);
        if (!wait) {
            axios.get(API_USER_PETUGAS + "?pagination=" + CreatePaginationEncoding(5, 0) + "&filter=" + CreateFilterEncoding({name: text})).then((res) => {
                if (res.status === 200) {
                    return res.data
                }
            }).then((json) => {
                if (json["data"] != null) {
                    setOptions(json["data"])
                } else  {
                    setOptions([])
                }

                setTimeout(() => {
                }, 500)

                setWait(false);

            })
        }
    }

    const handleChangeUser = (option) => {
        setSelectedUserID(option[0].id)
    }

    return (
        <CommonModal isOpen={modal} title={NewMessage} toggler={toggle} onSave={() => onSave(selectedUserID)}>
            <Form>
                <FormGroup>
                    <Label className="col-form-label" for="petugas-id">{'Petugas:'}</Label>
                    <Typeahead
                        labelKey={option => `${option["full_name"]}`}
                        id="petugas-id"
                        onChange={handleChangeUser}
                        onInputChange={handleChangeType}
                        options={options}
                        placeholder="Type anything..."
                        defaultInputValue={""}
                    />
                </FormGroup>
              </Form>
        </CommonModal>

    );
};

export default CreatePenugasanModal;