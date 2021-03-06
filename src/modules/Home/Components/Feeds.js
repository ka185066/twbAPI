import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as tweeterActions from '../../../actions/tweeterActions';
import SearchField from './SearchField';
import FieldList from './FieldList';

class Feeds extends React.Component {
  constructor(props, context){
    super(props, context);

    this.state = {
      searchText: this.props.searchText,
      tweets: this.props.tweets,
      searching: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({tweets: Object.assign([], nextProps.tweets)});
  }

  componentDidMount(){
    this.setState({searching: false});
  }

  onChange(event){
    let searchText = event.target.value;
    return this.setState({searchText: searchText});
  }

  onSearch(){
    event.preventDefault();
    this.setState({searching: true});
    this.props.actions.getTweets(this.state.searchText);
  }

  render(){
    let feedListElement = null;
    if(this.state.searching && this.state.tweets.length === 0){
      feedListElement = <h1>No Record Found</h1>;
    }else{
      feedListElement = <FieldList
        tweets={this.state.tweets}
      />
    }
    return (
      <div className="row">
        <SearchField
          placeholder="Search here"
         value={this.state.searchText}
          onChange={this.onChange}
           onSearch={this.onSearch}/>
        <div className="clearfix"></div>
        {feedListElement}
      </div>
    );
  }
}

Feeds.propTypes = {
  searchText: PropTypes.string.isRequired,
  tweets: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};


function mapStateToProps(state, ownProps){
  let searchText = '';
  return {
    searchText: searchText,
    tweets: state.tweets
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(tweeterActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Feeds);
