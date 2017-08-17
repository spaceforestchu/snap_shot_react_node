import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap } from 'react-google-maps';

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

          </GoogleMap>
        }
        />
    )
  }
}

export default Map;
