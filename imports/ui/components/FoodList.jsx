import React, { Component, PureComponent } from 'react';
import { Table, Tr, Td } from 'reactable';
import FontIcon from 'material-ui/FontIcon';
import { red100 } from 'material-ui/styles/colors';

export default class FoodList extends PureComponent {
  render() {
    const { fooddata } = this.props;
    return (
      fooddata.length > 0 ?
        <Table
          className="reactable food-list width-full no-header"
        >
        {fooddata.map((food, idx) => (
          <Tr key={idx}>
            <Td column="검색된 음식" value={food.DESC_KOR}>
              <div className="tablelike container">
                <div
                  style={{
                    float: 'left', width: 'auto', paddingRight: '40px',
                    textAlign: 'left',
                  }}
                >
                  {food.DESC_KOR}
                  <span style={{ color: '#808080', paddingLeft: '10px' }}>
                    ( 1회 {food.SERVING_WT}g /
                    <span style={{ color: red100, marginLeft: '10px' }}>{food.NUTR_CONT1}kcal</span> )
                  </span>
                </div>
                <div style={{ width: '40px', position: 'absolute', right: '10px' }}>
                  <FontIcon
                    className="icon-plus-circle-line"
                    style={{ fontSize: '18px' }}
                    // onClick={this.onAddButtonClick}
                    // onTouchTap={this.addItem}
                  />
                </div>
              </div>
            </Td>
          </Tr>
        ))}
        </Table>
      :
        <div>
          not found
        </div>
    );
  }
}

FoodList.propTypes = {
  fooddata: React.PropTypes.array,
};
