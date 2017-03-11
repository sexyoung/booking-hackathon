import React, { PropTypes } from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GoogleMapReact from 'google-map-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {
  stylers,
  gradient,
} from 'constants/MapStylers';
import attractionActions from 'actions/attractionActions';

import {
  HotelComponent,
  FilterComponent,
} from 'components';

import style from './map-page.scss';
import blueBed from './blue-bed.png';
import pinkNewStart from './pink-start-new.png';

const center = {
  // lat: 41.9024427, lng: 12.450028
  lat: 25.0356791, lng: 121.5196742
};

/**
 * Template React Component
 */
class TestPage extends React.Component {

  static propTypes = {
    children:          PropTypes.object,
    center:            PropTypes.number,
    zoom:              PropTypes.number,
    attractionList:    PropTypes.object,
    attractionActions: PropTypes.object,
  };

  static defaultProps = {
    children: null,
    center,
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

    const params = {
      lat: center.lat,
      lng: center.lng,
      radius: 3000
    };
    $.get('http://localhost:8000/api/attractions', params, (data) => {
      const raw_data = data.slice();
      const i = 3;
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
      for (let r = 0; r < 5; r++) {
        const heatmapData = raw_data.filter((d) => {
          return d.rating >= r && d.rating < r + 1;
        }).map((d) => {
          return { location: new google.maps.LatLng(d.location.lat, d.location.lng), weight: d.rating * 10 - 30 };
          // return new maps.LatLng(d.location.lat, d.location.lng);
        });

        // const heatmapData = points.map((d) => {
        //   return new maps.LatLng(d.lat, d.lng);
        // });


        console.log(heatmapData.length, heatmapData);

        const heatmap = new maps.visualization.HeatmapLayer({
          data: heatmapData
        });

        heatmap.setMap(map);

        heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
        heatmap.set('radius', r * 20 - 30);
      }

      // heatmap.set('radius', 50);

      map.setOptions({ styles: stylers });

      data.map((d) => {
        return new maps.Marker({
          position: new google.maps.LatLng(d.location.lat, d.location.lng),
          map,
              // icon: greenStart,
          icon: pinkNewStart,
          title: 'Hello World!'
        });
      });
    });

    const rooms = [
      ['Bondi Beach', 25.0381671, 121.5189017, 1],
      ['Coogee Beach', 25.0450984, 121.5295265, 2],
      ['Cronulla Beach', 25.037983, 121.534612, 3]
    ];

    for (let i = 0; i < rooms.length; i++) {
      const beach = rooms[i];
      var markerRoom = new google.maps.Marker({
        position: { lat: beach[1], lng: beach[2] },
        map,
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
      infoWindow.open(map, marker);
    });

    // marker.setMap(null); // Delete marker

    // Adjust +/- position
    map.setOptions({
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_BOTTOM
      },
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className={style.wrapper}>
          <div>
            place inputer
          </div>
          <div className={style['map-container']}>
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
            </GoogleMapReact>
            <FilterComponent
              heatChecked
              scenaryChecked={false}
              hotelChecked
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
          </div>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}


function mapStateToProps(state) {
  return {
    attractionList: state.attraction.get('list'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    attractionActions: bindActionCreators(attractionActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TestPage);
