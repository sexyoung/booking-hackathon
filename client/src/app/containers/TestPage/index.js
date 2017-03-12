import React, { PropTypes } from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import { points2 } from 'constants/FakeData';
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
// import blueHotel from './blue-hotel-icon.svg';
import blueHotel from './blue-bed-18-pro.png';
import greenStar from './green-start-18-pro.png';

// var blueHotel = {
//     path: 'M450.125,400.125c0,27.611-22.385,50-50,50c-27.614,0-50-22.389-50-50c0-27.617,22.386-50,50-50 C427.74,350.125,450.125,372.508,450.125,400.125z',
//     fillColor: '#003580',
//     // fillOpacity: 0.8,
//     // scale: 1,
//     // strokeColor: 'gold',
//     // strokeWeight: 14
// }

const center = {
  lat: 25.039348, lng: 121.549604
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
    zoom: 13,
  }

  loaded = ({ map, maps }) => {
    function addHeatMap(map, data, opts) {
        opts = opts || {};
        const heatmapData = data.map((d) => {
          return new maps.LatLng(d.lat, d.lng);
        });
        const heatmap = new maps.visualization.HeatmapLayer({
          data: heatmapData
        });

        heatmap.setMap(map);

        heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
        
        Object.keys(opts).map(function(opt_key) {
          heatmap.set(opt_key, opts[opt_key]);  
        })
    }

    const params = {
      lat: center.lat,
      lng: center.lng,
      radius: 3000
    };
    $.get('http://localhost:8000/api/attractions', params, (data) => {
        const raw_data = data.slice();
        
        // const i = 10;
        const threshold = 0.004;

        // attraction heatmap
        const rated_data = {};
        console.log('raw_data', raw_data)
        const attraction_heat_data = raw_data.map((data) => {
            if(data.rating) {
              const key = "" + Math.ceil(data.rating)
              if(!rated_data[key]) {
                rated_data[key] = [];
              }
              rated_data[key].push({ lat: data.location.lat + 0.0007, lng: data.location.lng });
            }
            // return { lat: data.location.lat, lng: data.location.lng };
        })
        // base heatmap
        const base_heat_data = []; //points2.slice();
        points2.map(function(d) {
          base_heat_data.push(d);
          // heat_data.push(d);
          // heat_data.push(d);
          // heat_data.push(d);
          let i=3;
          while(i-- > 0) {
            // console.log({
            //   location: {
            //     lat: d.lat + (Math.random() - 0.5) * threshold,
            //     lng: d.lng + (Math.random() - 0.5) * threshold,
            //   }
            // })
            
            base_heat_data.push({
              lat: d.lat + (Math.random() - 0.5) * threshold,
              lng: d.lng + (Math.random() - 0.5) * threshold,
            });
          }
        });
        console.log('rated_data', rated_data)
        Object.keys(rated_data).map((rating) => {
          console.log('rated_data[rating]', rated_data[rating])
          addHeatMap(map, rated_data[rating], {radius: parseInt(rating) * 20 - 60});
        })
        // addHeatMap(map, attraction_heat_data, {radius: 40});
        // addHeatMap(map, base_heat_data, {radius: 15});
        addHeatMap(map, base_heat_data, {});

        map.setOptions({ styles: stylers });

        raw_data.map((d) => {
          return new maps.Marker({
            position: new google.maps.LatLng(d.location.lat, d.location.lng),
            map,
                // icon: greenStart,
            icon: greenStar,
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
        icon: blueHotel,
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
              type="hotel"
              className={style.hotel}
              imgUrl="http://www.thefloridahotelorlando.com/var/floridahotelorlando/storage/images/media/images/photo-gallery/hotel-images/florida-hotel-orlando-night/27177-1-eng-US/Florida-Hotel-Orlando-Night.jpg"
              name="A Big Hotel"
              description={(
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent hendrerit purus neque, sed fermentum mauris tincidunt a. Sed vulputate scelerisque sem, quis venenatis elit elementum ut. Vivamus venenatis dolor lorem, vel finibus nunc accumsan vel. Nunc commodo facilisis condimentum. Nulla sed lobortis tellus. Suspendisse nec purus quis neque mollis porttitor. Phasellus sed augue risus. Donec id dignissim odio. Duis in aliquam ipsum. Maecenas tincidunt nibh et tortor sagittis pellentesque.</p>
              )}
              rating={4.1}
              price={1000}
              bookingUrl="http://www.booking.com/hotel/jp/hotel-she-kyoto.en-gb.html?label=gen173nr-1FCAEoggJCAlhYSDNiBW5vcmVmaOcBiAEBmAEuuAEHyAEM2AEB6AEB-AELqAID;sid=a076279596463f5a5d98ee0670a5fae2;all_sr_blocks=171061002_92623723_2_0_0;checkin=2017-03-22;checkout=2017-03-23;dest_id=-235402;dest_type=city;dist=0;group_adults=2;highlighted_blocks=171061002_92623723_2_0_0;hpos=2;no_rooms=1;room1=A%2CA;sb_price_type=total;srfid=b55747ed1e72162560fdf03ee9709b690025fcfcX2;type=total;ucfs=1&"
              FBComments={[
                {
                  picUrl: 'https://dummyimage.com/48x48/',
                  name: 'Shubo Chao',
                  rating: 4,
                  time: 'February 3, 2017',
                  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent hendrerit purus neque, sed fermentum mauris tincidunt a. Sed vulputate scelerisque sem, quis venenatis elit elementum ut. Vivamus venenatis dolor lorem, vel finibus nunc accumsan vel. Nunc commodo facilisis condimentum. Nulla sed lobortis tellus. Suspendisse nec purus quis neque mollis porttitor. Phasellus sed augue risus. Donec id dignissim odio. Duis in aliquam ipsum. Maecenas tincidunt nibh et tortor sagittis pellentesque.',
                },
                {
                  picUrl: 'https://dummyimage.com/48x48/',
                  name: 'Shubo Chao',
                  rating: 4,
                  time: 'February 3, 2017',
                  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent hendrerit purus neque, sed fermentum mauris tincidunt a. Sed vulputate scelerisque sem, quis venenatis elit elementum ut. Vivamus venenatis dolor lorem, vel finibus nunc accumsan vel. Nunc commodo facilisis condimentum. Nulla sed lobortis tellus. Suspendisse nec purus quis neque mollis porttitor. Phasellus sed augue risus. Donec id dignissim odio. Duis in aliquam ipsum. Maecenas tincidunt nibh et tortor sagittis pellentesque.',
                }
              ]}
            />
            {/* <HotelComponent
              type="place"
              className={style.hotel}
              imgUrl="http://visit-miyajima-japan.com/en/assets/images/torii-brume-big.jpg"
              name="A Nice Place"
              description={(
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent hendrerit purus neque, sed fermentum mauris tincidunt a. Sed vulputate scelerisque sem, quis venenatis elit elementum ut. Vivamus venenatis dolor lorem, vel finibus nunc accumsan vel. Nunc commodo facilisis condimentum. Nulla sed lobortis tellus. Suspendisse nec purus quis neque mollis porttitor. Phasellus sed augue risus. Donec id dignissim odio. Duis in aliquam ipsum. Maecenas tincidunt nibh et tortor sagittis pellentesque.</p>
              )}
              rating={4.1}
            /> */}
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
