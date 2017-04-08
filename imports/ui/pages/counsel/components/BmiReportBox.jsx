import React from 'react';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import IconCheck from 'material-ui/svg-icons/action/check-circle';

import Avatar from 'material-ui/Avatar';

import { green900, green500, amber500 } from 'material-ui/styles/colors';

import { browserHistory } from 'react-router';
import { getBmiPoint, getBmiDescription } from '../functions/bmiFunctions.js';

const style = {
  step: {
    height: 100,
    textAlign: 'center',
  },
};

class BmiReportBox extends React.PureComponent {
  render() {
    const { step, icon, description, linkUrl, profile } = this.props;
    const iconClass = `${icon} inline-block-vertical-middle`;
    let bmiPoint = 0;
    let bmiDesc = '';
    if (profile) {
      bmiPoint = getBmiPoint(profile.weight, profile.height);
      bmiDesc = getBmiDescription(bmiPoint);
    }
    return (
      <Paper
        className="counsel-step-button-container"
        zDepth={0}
      >
        <table>
          <tbody>
            <tr>
              <td style={{ width: '100px' }}>
                Weight icon
              </td>
              <td style={{ textAlign: 'left' }}>
                <h1 style={{ margin: '10px 0px' }}>
                  {profile.height}
                  <span
                    style={{ fontSize: '14px', padding: '0px 4px' }}
                  >
                  cm
                  </span>
                  /
                  {profile.weight}
                  <span
                    style={{ fontSize: '14px', padding: '0px 4px' }}
                  >
                  kg
                  </span>
                </h1>
                <h3 style={{ margin: '10px 0px', fontWeight: 'normal' }}>
                  BMI {bmiPoint.toFixed(1)} {bmiDesc}
                </h3>
              </td>
            </tr>
          </tbody>
        </table>
      </Paper>
    );
  }
}

BmiReportBox.propTypes = {
  step: React.PropTypes.string,
  icon: React.PropTypes.string,
  description: React.PropTypes.string,
  linkUrl: React.PropTypes.string,
  profile: React.PropTypes.object,
};

export default BmiReportBox;
