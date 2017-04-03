import React, { Component, PureComponent } from 'react';
import MediaQuery from 'react-responsive';
import { Table } from 'reactable';

const styles = {
  columnDefault: {
    width: '50px',
    paddingLeft: '5px',
    paddingRight: '5px',
    textAlign: 'center',
  },
};

export default class FoodList extends PureComponent {
  render() {
    const { fooddata } = this.props;
    return (
      <Table
        className="table"
        data={fooddata}
      />
    );
  }
}

FoodList.propTypes = {
  fooddata: React.PropTypes.array,
};
