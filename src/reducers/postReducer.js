import constants from '../constants';

var initialState = {
  currentLocation: {
    lat: 40.7504753,
    lng: -73.9932668,
  },
  list: null,
  geoList: []
}

export default (state = initialState, action) => {
  let updated = Object.assign({}, state);

  switch(action.type) {
    case constants.POSTS_RECEIVED:
      //console.log('POSTS_RECEIVED ' + JSON.stringify(action.posts));

      updated['list'] = action.posts;

      return updated;

    case constants.CURRENT_LOCATION_CHANGED:

      //console.log('CURRENT_LOCATION_CHANGED: ' + JSON.stringify(action.location));
      updated['currentLocation'] = action.location;
      updated['list'] = null;

      return updated;

    case constants.POST_CREATED:

      // let updatedList = null;
      //
      // if (updated['list'] == null)
      //   updatedList = [];
      // else
      //   updatedList = Object.assign([], updated['list']);

      let updatedList = (updated['list'] == null) ? [] : Object.assign([], updated['list']);
      //console.log(JSON.stringify(updatedList));
      updatedList.unshift(action.post);

      updated['list'] = updatedList;

      return updated

    case constants.FETCH_GEO:

      let geoList = (updated['geoList'] == null ) ? [] : Object.assign( [], updated['geoList']);
      let geoListMap = action.geos;
      //console.log(JSON.stringify(geoListMap));
      let geoObject = {}
      geoListMap.map((element, index) => {
        //console.log(JSON.stringify(geoList));
        geoObject['lat'] = element.geo[0];
        geoObject['lng'] = element.geo[1];
        geoList.push(geoObject);
        geoObject = {};
      });
      //console.log(JSON.stringify(geoList));
      updated['geoList'] = geoList
      //console.log(JSON.stringify(updated));
    return updated

    default:
      return updated;
  }
}
