import React, { Fragment } from "react";
import { Col, Card, CardHeader, CardBody, Form, FormGroup, Label, Input } from 'reactstrap'
import { Btn, H5, H6 } from "../../../../AbstractElements";
import { Password, Username, InlineForm, InlineFormWithLabel, InlineFormWithoutLabel, Login } from "../../../../Constant";

const InlineFormClass = () => {
    return (
        <Fragment>
            <Col xl="12">
                <Card>
                    <CardHeader className="pb-0">
                        <H5>{InlineForm}</H5><span>{"Use"}<code>{".form-inline"}</code>{"class in the form to style with inline fields."}</span>
                    </CardHeader>
                    <CardBody>
                        <H6>{InlineFormWithLabel}</H6>
                        <Form className="form-inline theme-form mt-3">
                            <FormGroup>
                                <Label className="col-form-label">{Username}</Label>
                                <Input className="form-control" type="text" name="inputUsername" placeholder="Username" autoComplete="off" />
                            </FormGroup>
                            <FormGroup>
                                <Label className="col-form-label">{Password}</Label>
                                <Input className="form-control" type="password" name="inputPassword" placeholder="Password" autoComplete="off" />
                            </FormGroup>
                            <FormGroup>
                                <Btn attrBtn={{ color: "primary" }} >{Login}</Btn>
                            </FormGroup>
                        </Form>
                        <H6>{InlineFormWithoutLabel}</H6>
                        <Form className="form-inline theme-form mt-3 billing-form">
                            <FormGroup>
                                <Input className="form-control" type="text" name="inputUnlabelUsername" placeholder="Username" autoComplete="off" />
                            </FormGroup>
                            <FormGroup>
                                <Input className="form-control" type="password" name="inputPassword" placeholder="Password" autoComplete="off" />
                            </FormGroup>
                            <FormGroup>
                                <Btn attrBtn={{ color: "primary" }} >{Login}</Btn>
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </Fragment>
    )
}

export default InlineFormClass