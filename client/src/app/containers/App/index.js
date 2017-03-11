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

import redStart from './red-start-18-pro.png';
import pinkStart from './pink-start-18-pro.png';
import greenStart from './green-start-18-pro.png';

import blueRoom from './blue-room-18-pro.png';

const center = {
  // lat: 41.9024427, lng: 12.450028
  lat: 25.0356791, lng: 121.5196742
  // lat: 25.037529, lng: 121.5456219
};

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
    center: center,
    zoom: 13,
  }

  loaded = ({ map, maps }) => {
    // const heatmapData = points.map((p) => {
    //   return new maps.LatLng(p.lat, p.lng);
    // });

    // const heatmap = new maps.visualization.HeatmapLayer({
    //   data: heatmapData
    // });

    // heatmap.setMap(map);

    // heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);

    // map.setOptions({ styles: stylers });
    
    // var params = {
    //   lat: center.lat,
    //   lng: center.lng,
    //   radius: 3000
    // }
    // $.get('http://localhost:8000/api/attractions', params, function(data) {
    //     data.data.map((d) => {
    //       return new maps.Marker({
    //           position: new google.maps.LatLng(d.location.lat, d.location.lng),
    //           map: map,
    //           icon: greenStart,
    //           // icon: pinkStart,
    //           title: 'Hello World!'
    //       });
    //   })
    // })
    
    var params = {
      lat: center.lat,
      lng: center.lng,
      radius: 3000
    }
    $.get('http://localhost:8000/api/attractions', params, function(data) {
      const heatmapData = data.data.map((d) => {
        return new maps.LatLng(d.location.lat, d.location.lng);
        
      });
      // const heatmapData = points.map((p) => {
      //   return new maps.LatLng(p.lat, p.lng);
      // });

      const heatmap = new maps.visualization.HeatmapLayer({
        data: heatmapData
      });

      heatmap.setMap(map);

      heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);

      map.setOptions({ styles: stylers });

        data.data.map((d) => {
          return new maps.Marker({
              position: new google.maps.LatLng(d.location.lat, d.location.lng),
              map: map,
              // icon: greenStart,
              icon: pinkStart,
              title: 'Hello World!'
          });
      })
    })

    var rooms = [
      ['Bondi Beach', 25.0381671,121.5189017, 1],
      ['Coogee Beach', 25.0450984,121.5295265, 2],
      ['Cronulla Beach', 25.037983, 121.534612, 3]
    ];

    for (var i = 0; i < rooms.length; i++) {
      var beach = rooms[i];
      var marker = new google.maps.Marker({
        position: {lat: beach[1], lng: beach[2]},
        map: map,
        icon: blueRoom,
      });
    }
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
            key: 'AIzaSyDsmyI6lT8VxDqiGN19T7HQRuGZtqeiehg',
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
