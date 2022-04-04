import React from 'react';
import {Form, FormGroup, Input, Label} from 'reactstrap';
import CommonModal from "../../../Components/UiKits/Modals/common/modal";
import Dropzone from "react-dropzone-uploader";
import {Typeahead} from "react-bootstrap-typeahead";

const FormModal = ({modal, NewMessage, toggle, defaultVal}) => {
    const getUploadParams = ({meta}) => {
        return {url: 'https://httpbin.org/post'};
    };

    const handleChangeStatus = ({meta, file}, status) => {
    };

    const handleChangeType = (selected) => {
        if (selected.length > 0) {
            console.log("Selected", selected);
            if (selected[0].customOption){
                console.log("Create New", selected[0].label);
            }
        }
    }

    return (
        <CommonModal isOpen={modal} title={NewMessage} toggler={toggle}>
            <Form>
                <FormGroup>
                    <Label className="col-form-label" for="recipient-name">{'Name:'}</Label>
                    <Input className="form-control" type="text" defaultValue={defaultVal}/>
                </FormGroup>
                <FormGroup>
                    <Label className="col-form-label" for="recipient-name">{'Data Type:'}</Label>
                    <Typeahead
                        id="data-type"
                        allowNew
                        onChange={handleChangeType}
                        options={[
                            "Data Type A",
                            "Data Type B",
                            "Data Type C",
                            "Data Type D",
                        ]}
                        placeholder="Type anything..."
                    />
                </FormGroup>
                <FormGroup>
                    <Label className="col-form-label" for="recipient-name">{'File:'}</Label>
                    <div className="dz-message needsclick">
                        <Dropzone
                            getUploadParams={getUploadParams}
                            onChangeStatus={handleChangeStatus}
                            maxFiles={1}
                            multiple={false}
                            canCancel={true}
                            canRemove={true}
                            canRestart={true}
                            inputContent="Drop A File"
                            styles={{
                                dropzone: {minHeight: 100},
                                dropzoneActive: {borderColor: 'green'},
                            }}
                            submitButtonDisabled={true}
                        />
                    </div>
                </FormGroup>

            </Form>
        </CommonModal>

    );
};

export default FormModal;