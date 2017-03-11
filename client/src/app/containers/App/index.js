import React, { PropTypes } from 'react';
import GoogleMapReact from 'google-map-react';
import AnyReactComponent from 'components/AnyReactComponent';
import $ from 'jquery';
import {
  stylers,
  gradient,
} from 'constants/MapStylers';
import { points } from 'constants/FakeData';

import style from './app.scss';

/**
 * Template React Component
 */
export default class App extends React.Component {
  static propTypes = {
    children: PropTypes.object,
    center: PropTypes.number,
    zoom: PropTypes.number,
  };
  static defaultProps = {
    children: null,
    center: { lat: 25.037529, lng: 121.5456219 },
    zoom: 13,
  }

  loaded = ({ map, maps }) => {
    const heatmapData = points.map((p) => {
      return new maps.LatLng(p.lat, p.lng);
    });

    const heatmap = new maps.visualization.HeatmapLayer({
      data: heatmapData
    });

    heatmap.setMap(map);

    heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);

    map.setOptions({ styles: stylers });
    
    var params = {
      lat: 25.037529,
      lng: 121.5456219,
      radius: 3000
    }
    $.get('http://localhost:8000/api/attractions', params, function(data) {
        data.data.map((d) => {
          return new maps.Marker({
              position: new google.maps.LatLng(d.location.lat, d.location.lng),
              map: map,
              title: 'Hello World!'
          });
      })
    })
  }

  render() {
    return (
      <div className={style.wrapper}>
        <div>
          logo, place inputer
        </div>
        <GoogleMapReact
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          bootstrapURLKeys={{
            key: 'AIzaSyBvTV47vAYcRpCq8JP-5NiMHz-Gw8SCiB8',
            language: 'zh',
            libraries: 'visualization,places',
          }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={this.loaded}
        >
          <AnyReactComponent
            lat={25.037529}
            lng={121.5456219}
            text={'Kreyser Avrora'}
          />
        </GoogleMapReact>
        {this.props.children}
      </div>
    );
  }
}
