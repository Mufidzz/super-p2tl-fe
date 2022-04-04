import React, {useEffect, useState} from 'react';
import {Form, FormGroup, Input, Label} from 'reactstrap';
import CommonFilterModal from "../../../../Components/UiKits/Modals/common/filter_modal";
import {Typeahead} from "react-bootstrap-typeahead";
import Dropzone from "react-dropzone-uploader";


const CreateBankDataModal = ({modal, NewMessage, toggle, defaultVal, onImplement, categories = []}) => {
    const [data, setData] = useState({
        category: "",
        filename: "",
        file : null,
    })

    useEffect(() => {
        if (defaultVal !== null && defaultVal !== undefined) {
            setData({...defaultVal})
        }
    }, [defaultVal])


    const handleOnImplement = () => {
        onImplement(data);
    }

    const handleChangeCategory = (option) => {
        if (option[0]["customOption"] === true) {
            setData({...data, category: option[0]["label"]})
        } else {
            setData({...data, category: option[0]})
        }
    }

    const handleChangeStatus = ({ meta, file }, status) => {
        setData({...data, file: file})
    };

    return (
        <CommonFilterModal isOpen={modal} title={NewMessage} toggler={toggle} onImplement={handleOnImplement}>
            <Form>
                <FormGroup>
                    <Label className="col-form-label" for="petugas-id">{'KATEGORI:'}</Label>
                    <Typeahead
                        // labelKey={option => `${option["full_name"]}`}
                        id="petugas-id"
                        onChange={handleChangeCategory}
                        options={categories}
                        placeholder="Type anything..."
                        defaultInputValue={""}
                        allowNew={true}
                    />
                </FormGroup>

                <FormGroup>
                    <Label className="col-form-label">JUDUL:</Label>
                    <Input className="form-control" type="text" defaultValue={data.filename}
                           onChange={(e) => setData({...data, filename: e.target.value})}/>
                </FormGroup>


                <FormGroup>
                    <div className="dz-message needsclick">
                        <Dropzone
                            // getUploadParams={getUploadParams}
                            accept={"image/*,application/pdf,.xlsx,.docx"}
                            onChangeStatus={handleChangeStatus}
                            maxFiles={1}
                            multiple={false}
                            canCancel={false}
                            inputContent="Drop A File"
                            styles={{
                                dropzone: {height: 200},
                                dropzoneActive: {borderColor: 'green'},
                            }}
                        />
                    </div>
                </FormGroup>

            </Form>
        </CommonFilterModal>

    );
};

export default CreateBankDataModal;