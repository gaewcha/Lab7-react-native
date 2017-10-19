/**
 * l9 Map 10
 * https://github.com/kobkrit/learn-react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native';
var {height, width} = Dimensions.get('window');
import MapView from 'react-native-maps';
import LocationButton from './LocationButton.js';

export default class app extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 13.764884,
        longitude: 100.538265,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
      },
    //  markersLa: [
        // {
        //   latlng: {
        //     latitude: 13.764884,
        //     longitude: 100.538265
        //   },
        //   image: require('./images/attention.png'),
        //   photo: require('./images/Victory_Monument.jpg'),
        //   title: "Victory Monument",
        //   description: "A large military monument in Bangkok, Thailand."
        // },
        // {
        //   latlng: {
        //     latitude: 13.763681,
        //     longitude: 100.538125
        //   },
        //   image: require('./images/music.png'),
        //   photo: require('./images/Saxophone.jpg'),
        //   title: "Saxophone Club",
        //   description: "A music pub for saxophone lover"
        // }, {
        //   latlng: {
        //     latitude: 13.764595,
        //     longitude: 100.537438
        //   },
        //   image: require('./images/shopping.png'),
        //   photo: require('./images/coco.jpg'),
        //   title: "Coco Depertment Store",
        //   description: "Fashion Department Store"
        // }
    //  ],
      //markersLon:[],
      markers:[]
    };
    this.onRegionChange = this.onRegionChange.bind(this);
    this.moveMaptoLocation=this.moveMaptoLocation.bind(this);
    this.handleButPress=this.handleButPress.bind(this);
  }

  onRegionChange(region) {
    this.setState({region});
  }

  handleButPress() {



    this.setState({

    //  markersLa: this.state.markersLa.concat([this.state.region.latitude/2,]),
      //markersLon: this.state.markersLon.concat([this.state.region.longitude]),
      markers: this.state.markers.concat([{latitude:this.state.region.latitude,longitude:this.state.region.longitude}]),

    });
    console.log(this.state.markers);
  }

  moveMaptoLocation(latlng,key){
    this.refs.map.animateToRegion({

        latitudeDelta:0.002,
        longitudeDelta:0.002,
        ...latlng

    },1000);
    setTimeout(() => {
      this.refs[key].showCallout();
  }, 1000);



  }


  render() {
    let coordinates = this.state.markers.map(marker => marker.latlng);
    return (
      <View style={styles.container}>
        <MapView ref="map" style={styles.map} region={this.state.region}


          onRegionChange={this.onRegionChange}>

          {this.state.markers.map((marker, i) => (
            <MapView.Marker key={i} ref={i}
             coordinate={marker}>

            </MapView.Marker>


          ))}
<MapView.Polyline coordinates={this.state.markers} strokeWidth={5} strokeColor="#00fa"></MapView.Polyline >
        </MapView>

<View style={styles.container}>
<TouchableOpacity style={styles.button}
   underlayColor="gray" onPress={this.handleButPress}>
     <Text>
       Drop Marker!
       {this.state.markersLa}
     </Text>
   </TouchableOpacity>

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  button:{
   borderRadius: 10,
   padding: 10,
   backgroundColor: 'lightgray',
   borderColor: 'black',
   margin: 10
 },
  map: {
    width: width,
    height: height*2/3
  },
  pin: {
    //backgroundColor: '#fffa',
    justifyContent: 'center',
    alignItems: 'center',
    //borderColor: 'black',
    borderWidth: 2,
    padding: 5,
    borderRadius: 10
  },
  pinImage: {
    width: 25,
    height: 25
  },
  pinText: {
    color: 'red'
  },
  callout:{
    flex: 1,
    paddingRight: 10,
    paddingBottom: 10,
    marginRight: 10,
    marginBottom: 10
  },
  calloutPhoto:{
    flex: 1,
    width: 166,
    height: 83
  },
  calloutTitle:{
    fontSize: 16,
  }
});

AppRegistry.registerComponent('l9_map', () => l9_map);
