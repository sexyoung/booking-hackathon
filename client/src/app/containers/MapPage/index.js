import cx from 'classnames';
import { is } from 'immutable';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GoogleMapReact from 'google-map-react';
import { MuiThemeProvider } from 'material-ui/styles';
import { mapKey } from 'constants';

import Autocomplete from 'react-google-autocomplete';

import {
  HotelComponent,
  FilterComponent,
  Marker,
  AnyReactComponent,
} from 'components';


import {
  stylers,
  gradient,
} from 'constants/MapStylers';

import mapActions from 'actions/mapActions';
import heatActions from 'actions/heatActions';
import attractionActions from 'actions/attractionActions';
import hotelActions from 'actions/hotelActions';

import style from './map-page.scss';
import hotelImg from './blue-bed-18-pro.png';
import attractionImg from './green-start-18-pro.png';

class App extends React.Component {

  static propTypes = {
    app:               PropTypes.object,
    location:          PropTypes.object,
    mapIsLoading:      PropTypes.boolean,
    mapLocation:       PropTypes.boolean,
    isEdit:            PropTypes.boolean,
    mapActions:        PropTypes.object,
    zoom:              PropTypes.number,
    attractionList:    PropTypes.object,
    attractionActions: PropTypes.object,
    heatActions:       PropTypes.object,
    hotelList:         PropTypes.object,
    hotelActions:      PropTypes.object,
    hotelIndex:        PropTypes.number.isRequired,
    heatList:          PropTypes.array,
  };

  static defaultProps = {
    app: {},
    isEdit: false,
    location: {},
    mapIsLoading: false,
    mapLocation: {},
    mapActions: {},
    zoom: 13,
    attractionList: {},
    attractionActions: {},
    heatActions: {},
    hotelList: {},
    hotelActions: {},
    heatList: [],
  }

  static contextTypes = {
    router: PropTypes.object,
  }

  constructor() {
    super();
    this.state = {
      mapApiLoaded: false,
    };
  }

  componentDidMount() {
    const { location: { query: { search } } } = this.props;
    if (search) {
      this.checkGeocoder(search);
    }
  }

  componentDidUpdate(prevProps) {
    if (!is(prevProps.heatList, this.props.heatList)) {
      this.updateHeatMap();
    }

    if (this.props.isEdit !== prevProps.isEdit && !this.props.isEdit) {
      this.props.hotelActions.setIndex(-1);
      this.props.attractionActions.setIndex(-1);
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { refs: { input: { value } } } = this.input;
    this.goPlace(value);
    this.context.router.push(`edit?search=${value}`);
  }

  addHeatMap = (data, opts) => {
    opts = opts || {};
    const heatmapData = data.map((d) => {
      return new this.maps.LatLng(d.lat, d.lng);
    });
    const heatmap = new this.maps.visualization.HeatmapLayer({
      data: heatmapData
    });

    heatmap.setMap(this.map);

    heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);

    Object.keys(opts).map((opt_key) => {
      heatmap.set(opt_key, opts[opt_key]);
    });
  }

  updateHeatMap = () => {
    const heatmapData = this.props.heatList.toJS().map((d) => {
      return new this.maps.LatLng(d.lat, d.lng);
    });
    const heatmap = new this.maps.visualization.HeatmapLayer({
      data: heatmapData
    });

    heatmap.setMap(this.map);
    // 放大
    const rated_data = {};
    const attraction_heat_data = this.props.attractionList.toJS().map((data) => {
      if (data.rating) {
        const key = `${Math.ceil(data.rating)}`;
        if (!rated_data[key]) {
          rated_data[key] = [];
        }
        rated_data[key].push({ lat: data.location.lat + 0.0007, lng: data.location.lng });
      }
    });

    Object.keys(rated_data).map((rating) => {
      this.addHeatMap(rated_data[rating], { radius: parseInt(rating) * 20 - 60 });
    });

    heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
  }

  checkGeocoder(search) {
    if (!this.geocoder) {
      setTimeout(() => {
        this.checkGeocoder(search);
      }, 300);
    } else {
      this.goPlace(search);
    }
  }

  goPlace = (address) => {
    this.geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK') {
        const location = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        };
        this.props.mapActions.setLocation(location);
        this.props.attractionActions.getList({
          ...location,
          radius: 10000,
        });

        this.props.heatActions.getList({
          ...location,
          radius: 10000,
        });
      }
    });
  }

  loaded = ({ map, maps }) => {
    this.map = map;
    this.maps = maps;

    this.map.setOptions({ styles: stylers });

    this.geocoder = new this.maps.Geocoder();

    this.setState({
      mapApiLoaded: true,
    });


    // 預設 call 台北 hotel
    this.props.hotelActions.getList({
      lat: 25.0453076,
      lng: 121.53079500000001,
      radius: 1,
    });
  }

  render() {
    const {
      app,
      isEdit,
      mapLocation,
      mapIsLoading,
      location: { query: { search } },
      hotelList,
      hotelActions,
      hotelIndex,
      attractionList,
      attractionActions,
      attractionIndex,
    } = this.props;

    const {
      mapApiLoaded,
    } = this.state;

    const mapPageClass = cx({
      [style['map-page']]: true,
      [style['at-edit']]: isEdit,
    });

    const placeholder = isEdit ?
      'Destination or address' :
      'You deserve a vacation - and it start here!';

    const currentHotel = hotelIndex >= 0 ? hotelList.get(hotelIndex).toJS() : null;
    const currentAttraction = attractionIndex >= 0 ? attractionList.get(attractionIndex).toJS() : null;

    console.log(currentHotel)

    return (
      <MuiThemeProvider>
        <div className={mapPageClass}>
          { mapApiLoaded && <form onSubmit={this.onSubmit} className={style['input-block']}>
            <Autocomplete
              ref={elem => this.input = elem}
              className={style.input}
              placeholder={placeholder}
              defaultValue={search}
            />
            <button>GO</button>
          </form>}
          <GoogleMapReact
            id="map"
            center={{
              lat: mapLocation.get('lat'),
              lng: mapLocation.get('lng'),
            }}
            defaultZoom={this.props.zoom}
            bootstrapURLKeys={{
              key: mapKey,
              language: 'zh-TW',
              libraries: 'visualization,places',
            }}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={this.loaded}
          >
            {
              app.hotelChecked && hotelList.size > 0 && hotelList.toJS().map((hotel, index) => {
                const handleClick = () => {
                  hotelActions.setIndex(index);
                  attractionActions.setIndex(-1);
                };

                return (
                  <Marker
                    lat={hotel.location.lat}
                    lng={hotel.location.lng}
                    imgSrc={hotelImg}
                    onClick={handleClick}
                    focused={index === hotelIndex}
                  />
                );
              }
            )}
            { app.scenaryChecked && attractionList.size > 0 && attractionList.toJS().map((attraction, index) => {
              const handleClick = () => {
                attractionActions.setIndex(index);
                hotelActions.setIndex(-1);
              }

              return (
                <Marker
                  lat={attraction.location.lat}
                  lng={attraction.location.lng}
                  imgSrc={attractionImg}
                  onClick={handleClick}
                  focused={index === attractionIndex}
                />
              );
            })}
          </GoogleMapReact>
          {isEdit &&
          <FilterComponent {...app} />}
          {mapIsLoading && <div className={style['is-loading']}>Loading...</div>}
          {
            isEdit && currentHotel &&
              <HotelComponent
                type="hotel"
                className={style.hotel}
                imgUrl={`http://localhost:8000${currentHotel.detail.imgUrl}`}
                name={currentHotel.name}
                description={currentHotel.detail.description}
                rating={currentHotel.detail.rating}
                price={currentHotel.price}
                bookingUrl={currentHotel.detail.bookingUrl}
                fbComments={currentHotel.detail.FBComments}
                onClose={() => hotelActions.setIndex(-1)}
              />
          }
          {
            isEdit && currentAttraction &&
              <HotelComponent
                type="place"
                className={style.hotel}
                imgUrl={`http://localhost:8000${currentAttraction.detail.imgUrl}`}
                name={currentAttraction.name}
                description={currentAttraction.detail.description}
                rating={currentAttraction.detail.rating}
                fbComments={currentAttraction.FBComments}
              />
          }
        </div>
      </MuiThemeProvider>
    );
  }
}


function mapStateToProps(state) {
  return {
    app: state.app.toJS(),
    mapLocation: state.map.get('location'),
    mapIsLoading: state.map.get('isLoading', false),
    isEdit: state.routing.locationBeforeTransitions.pathname.includes('edit'),
    attractionList: state.attraction.get('list'),
    attractionIndex: state.attraction.get('index'),
    hotelList: state.hotel.get('list'),
    hotelIndex: state.hotel.get('index'),
    heatList: state.heat.get('list'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    mapActions: bindActionCreators(mapActions, dispatch),
    heatActions: bindActionCreators(heatActions, dispatch),
    attractionActions: bindActionCreators(attractionActions, dispatch),
    hotelActions: bindActionCreators(hotelActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
