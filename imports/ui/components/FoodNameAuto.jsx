import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import IconButton from 'material-ui/IconButton';
import IconContentClear from 'material-ui/svg-icons/content/clear';
import trackerReact from 'meteor/ultimatejs:tracker-react';
import ToggleDisplay from 'react-toggle-display';
import { FoodOpenData } from '../../api/collections/FoodOpenData.js';

// const FoodData2 = new Mongo.Collection('food_open_data');
// const dataSource1 = [123, 5213, 54653];
const styles = {
  icon: {
    tiny: {
      width: 12,
      height: 12,
    },
    small: {
      width: 16,
      height: 16,
    },
  },
  button: {
    tiny: {
      width: 16,
      height: 16,
      padding: 0,
      marginLeft: '-20px',
    },
    small: {
      width: 32,
      height: 32,
    },
  },
};

export default class FoodNameAuto extends trackerReact(Component) {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      foodNameAutoClear: false,
      searchText: '',
    };
    this.textid = this.props.id;
    this.onTextChange = this.onTextChange.bind(this);
    this.setSuggestionData = this.setSuggestionData.bind(this);
  }
  componentWillReceiveProps(props) {
    if (props.searchText === '') {
      this.setState({ foodNameAutoClear: false, searchText: '' });
    }
  }
  setSuggestionData(name) {
    const query = name.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
    // const query = name;
    // console.log('query', query);
    this.setState({
      // dataSource: FoodData.find({}).fetch(),
      // dataSource: FoodData.find({ $text: { $search: query } }
      // dataSource: FoodOpenData.find({ DESC_KOR: { $regex: `^${query}` } }
      //  , { fields: { DESC_KOR: 1, _id: 0 } }).fetch(),
      dataSource: [],
    });
  }
  onTextChange(searchText) {
    this.setState({ searchText });
    if (searchText !== '') {
      this.setState({ foodNameAutoClear: true });
    } else {
      this.setState({ foodNameAutoClear: false });
    }
    this.setSuggestionData(searchText);
    // console.log(this.state.dataSource);
  }
  render() {
    return (
      <span>
        <AutoComplete
          ref="foodNameAutoText"
          id={this.props.id}
          floatingLabelText={this.props.floatingLabelText}
          dataSource={this.state.dataSource}
          dataSourceConfig={{ text: 'DESC_KOR', value: 'DESC_KOR' }}
          onUpdateInput={this.onTextChange}
          onKeyPress={this.props.onKeyPress}
          searchText={this.state.searchText}
        />
        <ToggleDisplay show={this.state.foodNameAutoClear}>
          <IconButton
            iconStyle={styles.icon.tiny}
            style={styles.button.tiny}
            onClick={this.props.onTextClear}
          >
            <IconContentClear />
          </IconButton>
        </ToggleDisplay>
      </span>
    );
  }
}

FoodNameAuto.propTypes = {
  id: React.PropTypes.string,
  floatingLabelText: React.PropTypes.string,
  searchText: React.PropTypes.string,
  // dataSource: React.PropTypes.array,
  onKeyPress: React.PropTypes.func,
  onTextClear: React.PropTypes.func,
};
