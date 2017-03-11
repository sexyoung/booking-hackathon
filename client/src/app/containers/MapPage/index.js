import cx from 'classnames';
import React, { PropTypes } from 'react';
import { is } from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GoogleMapReact from 'google-map-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {
  HotelComponent,
  FilterComponent,
} from 'components';

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
    isEdit:            PropTypes.boolean,
    center:            PropTypes.number,
    zoom:              PropTypes.number,
    attractionList:    PropTypes.object,
    attractionActions: PropTypes.object,
  };

  static defaultProps = {
    isEdit: false,
    location: null,
    center,
    zoom: 13,
    attractionList: {},
    attractionActions: {},
  }

  static contextTypes = {
    router: PropTypes.object,
  }

  componentDidUpdate(prevProps) {
    if (!is(prevProps.attractionList, this.props.attractionList)) {
      this.updateHeapMap();
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.context.router.push(`edit?search=${this.input.value}`);
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
    const {
      isEdit,
      location: { query: { search } }
    } = this.props;

    const mapPageClass = cx({
      [style['map-page']]: true,
      [style['at-edit']]: isEdit,
    });
    const placeholder = isEdit ?
      'Destination or address' :
      'You deserve a vacation - and it start here!';
    return (
      <MuiThemeProvider>
        <div className={mapPageClass}>
          <form onSubmit={this.onSubmit} className={style['input-block']}>
            <input
              ref={elem => this.input = elem}
              className={style.input}
              placeholder={placeholder}
              defaultValue={search}
            />
            <button>GO</button>
          </form>
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
          {isEdit &&
          <FilterComponent
            heatChecked
            scenaryChecked={false}
            hotelChecked
          />}
          {isEdit && <HotelComponent />}
        </div>
      </MuiThemeProvider>
    );
  }
}


function mapStateToProps(state) {
  return {
    isEdit: state.routing.locationBeforeTransitions.pathname.includes('edit'),
    attractionList: state.attraction.get('list'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    attractionActions: bindActionCreators(attractionActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
