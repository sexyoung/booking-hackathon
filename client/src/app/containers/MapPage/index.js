import React, { PropTypes } from 'react';
import { is } from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GoogleMapReact from 'google-map-react';

import {
  stylers,
  gradient,
} from 'constants/MapStylers';
import attractionActions from 'actions/attractionActions';

import style from './map-page.scss';

const center = {
  // lat: 41.9024427, lng: 12.450028
  lat: 25.0356791, lng: 121.5196742
};

/**
 * Template React Component
 */
class App extends React.Component {

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
      <div className={style['map-page']}>
        <div className={style['input-block']}>
          <input
            className={style.input}
            placeholder="You deserve a vacation - and it start here!"
          />
        </div>
        <GoogleMapReact
          id="map"
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          bootstrapURLKeys={{
            key: 'AIzaSyDrsuNPWMH0mBz-IsGg2T3UnppKcjTbMXI',
            language: 'zh',
            libraries: 'visualization,places',
          }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={this.loaded}
        />
        {this.props.children}
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
