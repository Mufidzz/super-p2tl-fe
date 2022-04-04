import React, { useEffect, Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import Knob from 'knob';
import configDB from '../../../Config/ThemeConfig';
import { AngleOffset, AngleOffsetArc, CursorMode, DisableDisplayInput, DisplayPreviousValue } from '../../../Constant';
import { Breadcrumbs } from '../../../AbstractElements';
import KnobComponent from './KnobComponent';

const primary = localStorage.getItem('default_color') || configDB.data.color.primary_color;

const KnobChart = () => {

  useEffect(() => {
    var profit = Knob({
      value: 35,
      left: 1,
      angleOffset: 90,
      className: 'review',
      thickness: 0.1,
      fgColor: primary,
      readOnly: true,
      dynamicDraw: true,
      tickColorizeValues: true,
      bgColor: '#f6f7fb',
      lineCap: 'round',
      displayPrevious: false
    });
    document.getElementById('profit').appendChild(profit);

    var cursormode = Knob({
      value: 29,
      angleOffset: 90,
      thickness: 0.1,
      width: 200,
      cursor: true,
      fgColor: primary,
      readOnly: true,
      bgColor: '#f6f7fb',
      lineCap: 'round',
      displayPrevious: false
    });
    document.getElementById('cursormode').appendChild(cursormode);

    var offsetArc = Knob({
      value: 35,
      angleOffset: -125,
      angleArc: 250,
      thickness: 0.1,
      cursor: false,
      fgColor: primary,
      readOnly: true,
      bgColor: '#f6f7fb',
      lineCap: 'round',
      displayPrevious: false
    });
    document.getElementById('offsetArc').appendChild(offsetArc);

    var displayInputDisable = Knob({
      className: 'review',
      thickness: 0.1,
      fgColor: primary,
      bgColor: '#f6f7fb',
      lineCap: 'round',
      displayPrevious: false,
      value: null
    });
    document.getElementById('displayInputDisable').appendChild(displayInputDisable);

    var displayPrevious = Knob({
      value: 44,
      min: -100,
      className: 'review',
      thickness: 0.1,
      fgColor: primary,
      bgColor: '#f6f7fb',
      lineCap: 'round',
      displayPrevious: true
    });
    document.getElementById('displayPrevious').appendChild(displayPrevious);

    var digitstep = Knob({
      value: 0,
      className: 'review',
      thickness: 0.1,
      step: 0.1,
      max: 10000,
      min: -10000,
      fgColor: primary,
      bgColor: '#f6f7fb',
      lineCap: 'round',
      displayPrevious: false,
    });
    document.getElementById('digitstep').appendChild(digitstep);

  }, []);

  return (
    <Fragment>
      <Breadcrumbs mainTitle="Knob Chart" parent="Charts" title="Knob Chart" />
      <Container fluid={true}>
        <Row>
          <KnobComponent title={AngleOffset} knobId={'profit'} />
          <KnobComponent title={DisableDisplayInput} knobId={'displayInputDisable'} />
          <KnobComponent title={CursorMode} knobId={'cursormode'} />
          <KnobComponent title={DisplayPreviousValue} knobId={'displayPrevious'} />
          <KnobComponent title={AngleOffsetArc} knobId={'offsetArc'} />
          <KnobComponent title={'4-digit, step 0.1'} knobId={'digitstep'} />
        </Row>
      </Container>
    </Fragment>
  );
};

export default KnobChart;