import { Meteor } from 'meteor/meteor';
import trackerReact from 'meteor/ultimatejs:tracker-react';

import { green500, red300 } from 'material-ui/styles/colors';
import React from 'react';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';
import { Accordion, AccordionItem } from 'react-sanfona';
import { UserFoodLog } from '../../../../api/collections/UserFoodLog.js';

export default class MealRecordManualPanel extends trackerReact(React.Component) {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      subscription: {
        userFoodLog: Meteor.subscribe('UserFoodLog.private.family.mealType',
          this.props.familyId, this.props.mealType),
      },
    };
    this.onAddButtonClick = this.onAddButtonClick.bind(this);
  }
  componentWillUnmount() {
    this.state.subscription.userFoodLog.stop();
  }
  onAddButtonClick(e) {
    e.stopPropagation();
    this.props.onAddButtonClick(this.props.mealType);
  }
  onRemoveButtonClick(id) {
    // alert(`remove ${id}`);
    this.props.onRemoveButtonClick(id);
  }
  userFoodLogs() {
    return UserFoodLog.find({ mealType: this.props.mealType }).fetch();
  }
  render() {
    const { title, mealType, userId, familyId } = this.props;
    const userFoodLogs = this.userFoodLogs();
    // console.log('userFoodLogs', userFoodLogs);
    let totalCalorie = 0;
    for (let i = 0; i < userFoodLogs.length; i++) {
      totalCalorie += userFoodLogs[i].meal.NUTR_CONT1;
    }
    return (
      <Paper
        className="counsel-step-button-container"
        style={{ border: '2px solid #999', padding: '10px' }}
        zDepth={0}
      >
        <Accordion
          activeItems={totalCalorie > 0 ? 1 : 0}
        >
          <AccordionItem
            key={1}
            slug={1}
            title={
              <div>
                <table style={{ width: '100%' }}>
                  <tbody>
                    <tr>
                      <td style={{ width: '50%', textAlign: 'left', cursor: 'pointer' }}>
                        <h4 style={{ margin: '0px' }}>
                          {title}
                          <span
                            style={{
                              color: green500, paddingLeft: '14px', width: '100px',
                              textAlign: 'right',
                            }}
                          >
                            {totalCalorie > 0 ? totalCalorie.toLocaleString() : ''}
                          </span>
                        </h4>
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
          >
            <div>
              <Divider />
              <table style={{ width: '100%', marginTop: '5px' }}>
                <tbody>
                {userFoodLogs.map((log, idx) => (
                  <tr key={idx}>
                    <td style={{ width: '80%', textAlign: 'left' }}>
                      <div>
                        {log.meal.DESC_KOR}
                        <span
                          style={{
                            color: red300, cursor: 'pointer', paddingLeft: '5px',
                            fontSize: '12px',
                          }}
                          onTouchTap={() => { this.onRemoveButtonClick(`${log._id}`); }}
                        >
                          X
                        </span>
                      </div>
                      <div style={{ fontSize: '10px', color: '#999' }}>
                        {log.meal.SERVING_WT}g
                      </div>
                    </td>
                    <td style={{ width: '20%', textAlign: 'right' }}>
                      <div style={{ color: green500 }}>
                        {log.meal.NUTR_CONT1}
                      </div>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
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
  onRemoveButtonClick: React.PropTypes.func,
};
