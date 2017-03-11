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

const center = {
  lat: 25.037529, lng: 121.5456219
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
      lat: center.lat,
      lng: center.lng,
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
