import React, {Component} from 'react';
import {Map} from '../view';
import {connect} from 'react-redux';
import actions from '../../actions';

class MapNavigation extends Component {

  setNewLocation(location){
    //5console.log('Set New Location: ' + JSON.stringify(location));
    this.props.updateCurrentLocation(location);
  }

  // componentWillMount(){
  //   console.log('componentWillMount');
  //   this.props.fetchGeoLocation(null);
  // }

  componentDidMount(){
    this.props.fetchGeoLocation(null);
  }

  render() {
    return (
      <div>
        <Map center={this.props.posts.currentLocation} geo={this.props.posts.geoList} zoom={14} mapMoved={this.setNewLocation.bind(this)}/>
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    posts: state.post
  }
}

const dispatchToProps = (dispatch) => {
  return {
    updateCurrentLocation: (location) => dispatch(actions.updateCurrentLocation(location)),
    fetchGeoLocation: (params) => dispatch(actions.fetchGeoLocation(params))
  }
}

export default connect(stateToProps, dispatchToProps)(MapNavigation);
