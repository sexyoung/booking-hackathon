import React, { PropTypes } from 'react';
import GoogleMapReact from 'google-map-react';
import AnyReactComponent from 'components/AnyReactComponent';
import $ from 'jquery';
import {
  stylers,
  gradient,
} from 'constants/MapStylers';
import { points } from 'constants/FakeData';
import HotelComponent from 'components/HotelComponent';

import style from './app.scss';

import redStart from './red-start-18-pro.png';
import pinkStart from './pink-start-18-pro.png';
import pinkNewStart from './pink-start-new-18-pro.png';
import greenStart from './green-start-18-pro.png';

import blueRoom from './blue-room-18-pro.png';
import blueBed from './blue-bed-18-pro.png';

const center = {
  // lat: 41.9024427, lng: 12.450028
  lat: 25.0356791, lng: 121.5196742
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
    zoom: 14,
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

    map.setOptions({ styles: stylers });

    var params = {
      lat: center.lat,
      lng: center.lng,
      radius: 3000
    }
    $.get('http://localhost:8000/api/attractions', params, function(data) {
      let raw_data = data.data.slice();
      let i = 3;
      const threshold = 0.0001;
      // while(i-- > 0) {
      //   data.data.map(function(d) {
      //     raw_data.push(d);
      //     raw_data.push({
      //       location: {
      //         lat: d.location.lat + i * threshold,
      //         lng: d.location.lng + i * threshold,
      //       }
      //     });
      //     raw_data.push({
      //       location: {
      //         lat: d.location.lat - i * threshold,
      //         lng: d.location.lng + i * threshold,
      //       }
      //     });
      //     raw_data.push({
      //       location: {
      //         lat: d.location.lat - i * threshold,
      //         lng: d.location.lng - i * threshold,
      //       }
      //     });
      //     raw_data.push({
      //       location: {
      //         lat: d.location.lat + i * threshold,
      //         lng: d.location.lng - i * threshold,
      //       }
      //     });
      //   });
      // }
      // console.log(raw_data.length, raw_data)
      for(var r=0 ; r<5 ; r++) {
        const heatmapData = raw_data.filter((d) => {
          return d.rating >= r && d.rating < r+1;
        }).map((d) => {
          return {location: new google.maps.LatLng(d.location.lat, d.location.lng), weight: d.rating*10 - 30}
          // return new maps.LatLng(d.location.lat, d.location.lng);
        });

        // const heatmapData = points.map((d) => {
        //   return new maps.LatLng(d.lat, d.lng);
        // });

        
        console.log(heatmapData.length, heatmapData)

        const heatmap = new maps.visualization.HeatmapLayer({
          data: heatmapData
        });

        heatmap.setMap(map);

        heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
        heatmap.set('radius', r * 20 - 30);
      }
      
      // heatmap.set('radius', 50);

      map.setOptions({ styles: stylers });

        data.data.map((d) => {
          return new maps.Marker({
              position: new google.maps.LatLng(d.location.lat, d.location.lng),
              map: map,
              // icon: greenStart,
              icon: pinkNewStart,
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
      var markerRoom = new google.maps.Marker({
        position: {lat: beach[1], lng: beach[2]},
        map: map,
        icon: blueBed,
      });
    }

    markerRoom.setMap(map);

    const marker = new maps.Marker({
      position: { lat: 37.775, lng: -122.434 },
      title: 'Hello World!',
      // icon: 'path/to/image' or Icon (https://developers.google.com/maps/documentation/javascript/3.exp/reference?hl=zh-tw#Icon)
    });

    const infoWindow = new google.maps.InfoWindow({
      content: '<h1>Location Info</h1>'
    });

    marker.setMap(map);
    marker.addListener('click', () => {
      infoWindow.open(map, marker)
    });

    // marker.setMap(null); // Delete marker

    // Adjust +/- position
    map.setOptions({
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_BOTTOM
      },
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
            key: 'AIzaSyDrsuNPWMH0mBz-IsGg2T3UnppKcjTbMXI',
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
          <HotelComponent
            className={style.hotel}
            imgUrl="http://www.thefloridahotelorlando.com/var/floridahotelorlando/storage/images/media/images/photo-gallery/hotel-images/florida-hotel-orlando-night/27177-1-eng-US/Florida-Hotel-Orlando-Night.jpg"
            name="A Big Hotel"
            description={(
              <div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent hendrerit purus neque, sed fermentum mauris tincidunt a. Sed vulputate scelerisque sem, quis venenatis elit elementum ut. Vivamus venenatis dolor lorem, vel finibus nunc accumsan vel. Nunc commodo facilisis condimentum. Nulla sed lobortis tellus. Suspendisse nec purus quis neque mollis porttitor. Phasellus sed augue risus. Donec id dignissim odio. Duis in aliquam ipsum. Maecenas tincidunt nibh et tortor sagittis pellentesque.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent hendrerit purus neque, sed fermentum mauris tincidunt a. Sed vulputate scelerisque sem, quis venenatis elit elementum ut. Vivamus venenatis dolor lorem, vel finibus nunc accumsan vel. Nunc commodo facilisis condimentum. Nulla sed lobortis tellus. Suspendisse nec purus quis neque mollis porttitor. Phasellus sed augue risus. Donec id dignissim odio. Duis in aliquam ipsum. Maecenas tincidunt nibh et tortor sagittis pellentesque.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent hendrerit purus neque, sed fermentum mauris tincidunt a. Sed vulputate scelerisque sem, quis venenatis elit elementum ut. Vivamus venenatis dolor lorem, vel finibus nunc accumsan vel. Nunc commodo facilisis condimentum. Nulla sed lobortis tellus. Suspendisse nec purus quis neque mollis porttitor. Phasellus sed augue risus. Donec id dignissim odio. Duis in aliquam ipsum. Maecenas tincidunt nibh et tortor sagittis pellentesque.</p>
              </div>
            )}
          />
        </GoogleMapReact>
        {this.props.children}
      </div>
    );
  }
}
