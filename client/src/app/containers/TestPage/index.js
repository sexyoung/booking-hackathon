import React, { PropTypes } from 'react';
import { is } from 'immutable';
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
    zoom: 13,
    attractionList: {},
    attractionActions: {},
  }

  componentDidUpdate(prevProps) {
    if (!is(prevProps.attractionList, this.props.attractionList)) {
      this.updateHeapMap();
    }
  }

  updateHeapMap = () => {
    const { attractionList } = this.props;
    const heatmapData = attractionList.toJS().map((a) => {
      return new this.maps.LatLng(
        a.location.lat,
        a.location.lng,
      );
    });

    const heatmap = new this.maps.visualization.HeatmapLayer({
      data: heatmapData
    });

    heatmap.setMap(this.map);
    heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
  }

  loaded = ({ map, maps }) => {
    this.map = map;
    this.maps = maps;

    this.map.setOptions({ styles: stylers });

    // 抓測試用景點
    this.props.attractionActions.getList({
      lat: 25.0453076,
      lng: 121.53079500000001,
      radius: 10000,
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className={style.wrapper}>
          <div>
            place inputer
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
          </GoogleMapReact>
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
