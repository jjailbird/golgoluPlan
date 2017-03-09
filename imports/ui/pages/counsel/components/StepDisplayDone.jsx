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
  },
};

class StepDisplayDone extends React.PureComponent {
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
        style={{ backgroundColor: green500 }}
      >
        <table>
          <tbody>
            <tr>
              <td>
                <div className="step" style={style.step}>
                  {profile ?
                    <div>
                      <table>
                        <tbody>
                          <tr>
                            <td style={{ textAlign: 'center' }}>
                              <Avatar
                                className="profile-avata"
                                size={70}
                                src={profile.image}
                              />
                              <h5
                                style={{
                                  color: '#fff', margin: '4px 0px 0px 0px', fontWeight: 'normal',
                                }}
                              >
                                <FontIcon
                                  className={`icon-${profile.sex}`}
                                  style={{ fontSize: '16px', fontWeight: 'normal' }}
                                  color="#fff"
                                />
                                {profile.name} / {profile.age}세
                              </h5>
                            </td>
                            <td style={{ textAlign: 'center', paddingLeft: '10px' }}>
                              <div
                                style={{
                                  color: '#fff',
                                  fontSize: '11px',
                                  borderBottom: '1px solid #fff',
                                  marginBottom: '10px',
                                }}
                              >
                                {profile.bmiPubDate}
                              </div>
                              <div>
                                <span
                                  style={{ color: '#fff', fontSize: '20px', fontWeight: 'normal' }}
                                >
                                  {profile.weight}
                                </span>
                                <span
                                  style={{
                                    color: '#fff', fontSize: '12px', fontWeight: 'normal',
                                    marginLeft: '8px',
                                  }}
                                >
                                  kg
                                </span>
                              </div>
                              <div>
                                <span
                                  style={{
                                    color: '#fff', fontSize: '20px', fontWeight: 'normal',
                                  }}
                                >
                                  {profile.height}
                                </span>
                                <span
                                  style={{
                                    color: '#fff', fontSize: '12px', fontWeight: 'normal',
                                    marginLeft: '4px',
                                  }}
                                >
                                  cm
                                </span>
                              </div>
                              <div className="bmi-desc-badge">
                                {bmiDesc}
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  :
                    <div>
                      <FontIcon
                        className={iconClass}
                        style={{ fontSize: '40px' }}
                        color={amber500}
                      />
                      <span
                        className="inline-block-vertical-middle"
                        style={{ color: '#fff', marginLeft: '20px' }}
                      >
                        {description}
                      </span>
                    </div>
                  }
                </div>
              </td>
              <td>
                <h4 style={{ margin: 0, color: '#fff' }}>
                  STEP {step}
                  <IconCheck
                    className="inline-block-vertical-middle"
                    style={{ color: '#fff', paddingLeft: '4px', paddingBottom: '4px' }}
                  />
                </h4>
                <IconButton
                  className="step-button"
                  style={{ width: '50px', height: '50px', padding: '0px' }}
                  iconStyle={{ fontSize: '50px' }}
                  onTouchTap={() => { browserHistory.push(linkUrl); }}
                >
                  <FontIcon
                    className="icon-arrow-right-circle-background"
                    color={amber500}
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

StepDisplayDone.propTypes = {
  step: React.PropTypes.string,
  icon: React.PropTypes.string,
  description: React.PropTypes.string,
  linkUrl: React.PropTypes.string,
  profile: React.PropTypes.object,
};

export default StepDisplayDone;
