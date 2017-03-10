import React from 'react';
import {
  Step,
  Stepper,
  StepButton,
} from 'material-ui/Stepper';

export default class StepBar extends React.PureComponent {
  render() {
    return (
      <Stepper activeStep={this.props.stepIndex}>
        <Step>
          <StepButton>
            STEP01
          </StepButton>
        </Step>
        <Step>
          <StepButton>
            STEP02
          </StepButton>
        </Step>
        <Step>
          <StepButton>
            STEP03
          </StepButton>
        </Step>
      </Stepper>
    );
  }
}

