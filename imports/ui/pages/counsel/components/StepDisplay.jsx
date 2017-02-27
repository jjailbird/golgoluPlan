import React from 'react';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';

import { pink900, green500 } from 'material-ui/styles/colors';

import { browserHistory } from 'react-router';

const style = {
  step: {
    height: 97,
  },
};

class StepDisplay extends React.PureComponent {
  render() {
    const { step, icon, description, linkUrl } = this.props;
    const iconClass = `${icon} inline-block-vertical-middle`;
    return (
      <Paper
        className="counsel-step-button-container"
        zDepth={0}
      >
        <table>
          <tbody>
            <tr>
              <td>
                <div className="step" style={style.step}>
                  <h1 className="step-title">
                    <span style={{ fontWeight: 'normal' }}>STEP</span> {step}
                  </h1>
                  <div>
                    <FontIcon
                      className={iconClass}
                      style={{ fontSize: '40px' }}
                      color={green500}
                    />
                    <span
                      className="inline-block-vertical-middle"
                      style={{ marginLeft: '20px' }}
                    >
                      {description}
                    </span>
                  </div>
                </div>
              </td>
              <td>
                <IconButton
                  className="step-button"
                  style={{ width: '50px', height: '50px', padding: '0px' }}
                  iconStyle={{ fontSize: '50px' }}
                  onTouchTap={() => { browserHistory.push(linkUrl); }}
                >
                  <FontIcon
                    className="icon-arrow-right-circle-background"
                    color={pink900}
                  />
                </IconButton>
              </td>
            </tr>
          </tbody>
        </table>
      </Paper>
    );
  }
}

StepDisplay.propTypes = {
  step: React.PropTypes.string,
  icon: React.PropTypes.string,
  description: React.PropTypes.string,
  linkUrl: React.PropTypes.string,
};

export default StepDisplay;
