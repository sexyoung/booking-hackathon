import React, { PropTypes } from 'react';
import GoogleMapReact from 'google-map-react';
import AnyReactComponent from 'components/AnyReactComponent';
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
    center: { lat: 37.775, lng: -122.434 },
    zoom: 11,
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
            key: 'AIzaSyBtBoWF2Wt-_njKZzH9PIx43jShNWS3U54',
            language: 'zh',
            libraries: 'visualization',
          }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={this.loaded}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text={'Kreyser Avrora'}
          />
        </GoogleMapReact>
        {this.props.children}
      </div>
    );
  }
}
