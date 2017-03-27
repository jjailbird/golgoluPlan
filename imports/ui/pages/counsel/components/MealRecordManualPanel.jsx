import React from 'react';
import Paper from 'material-ui/Paper';
// import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';
import { Accordion, AccordionItem } from 'react-sanfona';

export default class MealRecordManualPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
    };
    this.onAddButtonClick = this.onAddButtonClick.bind(this);
  }
  onAddButtonClick(e) {
    e.stopPropagation();
    this.props.onAddButtonClick();
  }
  render() {
    const { title, mealType, userId, familyId } = this.props;
    return (
      <Paper
        className="counsel-step-button-container"
        style={{ border: '2px solid #999', padding: '10px' }}
        zDepth={0}
      >
        <Accordion activeItems={0}>
          <AccordionItem
            expanded
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
                          className="icon-plus-circle-line"
                          style={{ fontSize: '26px' }}
                          onClick={this.onAddButtonClick}
                          // onTouchTap={this.addItem}
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
              <h3>Meal Records</h3>
            </div>
          </AccordionItem>
        </Accordion>
      </Paper>
    );
  }
}

MealRecordManualPanel.propTypes = {
  title: React.PropTypes.string,
  mealType: React.PropTypes.oneOf([
    'breakFast', 'lunch', 'dinner', 'snack', 'snack_1', 'snack_2', 'snack_3']
  ),
  userId: React.PropTypes.string,
  familyId: React.PropTypes.string,
  onAddButtonClick: React.PropTypes.func,
};
