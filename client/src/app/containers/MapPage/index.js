import cx from 'classnames';
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

import hotelImg from './blue-bed-18-pro.png';

import {
  stylers,
  gradient,
} from 'constants/MapStylers';

import mapActions from 'actions/mapActions';
import attractionActions from 'actions/attractionActions';
import hotelActions from 'actions/hotelActions';

import style from './map-page.scss';

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
    hotelList:         PropTypes.object,
    hotelActions:      PropTypes.object,
    hotelIndex:        PropTypes.number.isRequired,
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
    hotelList: {},
    hotelActions: {},
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

  onSubmit = (e) => {
    e.preventDefault();
    const { refs: { input: { value } } } = this.input;
    this.goPlace(value);
    this.context.router.push(`edit?search=${value}`);
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
                };

                return (
                  <Marker
                    lat={hotel.location.lat}
                    lng={hotel.location.lng}
                    imgSrc={hotelImg}
                    onClick={handleClick}
                    focused={index === hotelIndex}
                  ></Marker>
                )
              }
            )}
            { app.scenaryChecked && attractionList.size > 0 && attractionList.toJS().map((attraction) => {
              return (
                <AnyReactComponent
                  lat={attraction.location.lat}
                  lng={attraction.location.lng}
                />
              );
            })}
          </GoogleMapReact>
          {isEdit &&
          <FilterComponent {...app} />}
          {mapIsLoading && <div className={style['is-loading']}>Loading...</div>}
          {/* {isEdit && <HotelComponent />} */}
          {
            currentHotel &&
              <HotelComponent
                type="hotel"
                className={style.hotel}
                imgUrl={currentHotel.detail.imgUrl}
                name={currentHotel.name}
                description={currentHotel.detail.description}
                rating={currentHotel.detail.rating}
                price={currentHotel.price}
                bookingUrl={currentHotel.detail.bookingUrl}
                FBComments={currentHotel.detail.FBComments}
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
    hotelList: state.hotel.get('list'),
    hotelIndex: state.hotel.get('index'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    mapActions: bindActionCreators(mapActions, dispatch),
    attractionActions: bindActionCreators(attractionActions, dispatch),
    hotelActions: bindActionCreators(hotelActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
