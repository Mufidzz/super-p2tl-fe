import React, { Fragment } from 'react';
import { Container, Row, Col, Card, CardBody, Form, FormGroup } from 'reactstrap';
import TimePickerTwo from './TimePickerTwo';
import TimePickerOne from './TimePickerOne';
import TimePickerThree from './TimePickerThree';
import TimePickerFour from './TimePickerFour';
import { Default, TimePickerDarkTheme, SetClassicTheme, SetMultipleTimepicker } from '../../../../Constant';
import { Breadcrumbs } from '../../../../AbstractElements';
import HeaderCard from '../../../Common/Component/HeaderCard';

const Timepicker = () => {
  return (
    <Fragment>
      <Breadcrumbs mainTitle='Time Picker' subParent='Forms Widgets' parent="Forms" title="Time Picker" />
      <Container fluid={true} className="timepicker-form ">
        <Row>
          <Col xl="6">
            <Card>
              <HeaderCard title={Default} />
              <CardBody>
                <Form className="theme-form">
                  <FormGroup className="mb-0">
                    <TimePickerTwo />
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col xl="6">
            <Card>
              <HeaderCard title={TimePickerDarkTheme} />
              <CardBody>
                <Form className="theme-form">
                  <FormGroup className="mb-0">
                    <TimePickerOne />
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
          {/* <Col xl="6" className='xl-100'>
            <Card>
              <HeaderCard title={SetClassicTheme} />
              <CardBody>
                <Form className="theme-form">
                  <FormGroup className="mb-0">
                    <TimePickerFour />
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col> */}
          <Col xl="6" className='xl-100'>
            <Card>
              <HeaderCard title={SetMultipleTimepicker} />
              <CardBody>
                <div className="clearfix">
                  <Form className="theme-form">
                    <FormGroup className="mb-0">
                      <TimePickerThree />
                    </FormGroup>
                  </Form>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Timepicker;