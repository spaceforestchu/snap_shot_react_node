import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';

class Map extends Component {

  constructor(){
    super();
    this.state = {
      map: null
    }
  }

  mapDragged(){
    var latLng = this.state.map.getCenter().toJSON();
    //console.log(latLng);
    this.props.mapMoved(latLng);
  }


  render () {

    const mapContainer = <div style={{minHeight: 1000}}></div>

    var markers = null;
    var markerMap = this.props.geo;

    if (markerMap != null) {
      //console.log(JSON.stringify(markerMap));
      markers = markerMap.map((marker, i) => {
        marker['position'] = {
          lat: marker.lat,
          lng: marker.lng
        }
        return (
          <Marker
            key={i}
            {...marker}
            />
        )
      })
    }



    return (
      <GoogleMapLoader
        containerElement = { mapContainer }
        googleMapElement = {
          <GoogleMap

            ref={ (map) => {
              if (this.state.map != null)
                  return

                this.setState({map: map})
              }
            }
            defaultZoom={this.props.zoom}
            defaultCenter={this.props.center}
            options={{streetViewControl: true, mapTypeControl: true}}
            onDragend={this.mapDragged.bind(this)}
            >
            {markers}
          </GoogleMap>
        }
        />
    )
  }
}

export default Map;
