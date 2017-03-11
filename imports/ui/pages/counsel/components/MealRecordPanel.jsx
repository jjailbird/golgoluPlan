import React from 'react';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';

import { Accordion, AccordionItem } from 'react-sanfona';

export default class MealRecordPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image1PreviewUrl: '/img/image.blank.svg',
      image2PreviewUrl: '/img/image.blank.svg',
    };
  }
  togglePanel() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }
  render() {
    const { title, mealType } = this.props;
    return (
      <Paper
        className="counsel-step-button-container"
        style={{ border: '2px solid #999', padding: '10px' }}
        zDepth={0}
      >
        <Accordion>
          <AccordionItem
            title={
              <div>
                <table style={{ width: '100%' }}>
                  <tbody>
                    <tr>
                      <td style={{ width: '50%', textAlign: 'left', cursor: 'pointer' }}>
                        <h4 style={{ margin: '0px' }}>{title}</h4>
                      </td>
                      <td style={{ width: '50%', textAlign: 'right', cursor: 'pointer' }}>
                        <FontIcon
                          className="icon-camera-1"
                          style={{ fontSize: '26px' }}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            }
            slug={1} key={1}
          >
            <div>
              <Divider />
              <table style={{ width: '100%', marginTop: '10px' }}>
                <tbody>
                  <tr>
                    <td style={{ width: '50%' }}>
                      <img
                        id="imgPreviewer"
                        src={this.state.image1PreviewUrl}
                        alt="Select"
                        style={{ width: '100%', backgroundColor: '#EFEFEF' }}
                      />
                      <h4 style={{ margin: '0px' }}>식전</h4>
                    </td>
                    <td style={{ width: '50%' }}>
                      <img
                        id="imgPreviewer"
                        src={this.state.image2PreviewUrl}
                        alt="Select"
                        style={{ width: '100%', backgroundColor: '#EFEFEF' }}
                      />
                      <h4 style={{ margin: '0px' }}>식후</h4>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </AccordionItem>
        </Accordion>
      </Paper>
    );
  }
}

MealRecordPanel.propTypes = {
  title: React.PropTypes.string,
  mealType: React.PropTypes.oneOf(['breakfast', 'lunch', 'dinner', 'snack', 'snack_1', 'snack_2']),
};
