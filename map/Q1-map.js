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
      markers: [
        {
          latlng: {
            latitude: 13.764884,
            longitude: 100.538265
          },
          image: require('./images/attention.png'),
          photo: require('./images/Victory_Monument.jpg'),
          title: "Victory Monument",
          description: "A large military monument in Bangkok, Thailand."
        },
        {
          latlng: {
            latitude: 13.763681,
            longitude: 100.538125
          },
          image: require('./images/music.png'),
          photo: require('./images/Saxophone.jpg'),
          title: "Saxophone Club",
          description: "A music pub for saxophone lover"
        }, {
          latlng: {
            latitude: 13.764595,
            longitude: 100.537438
          },
          image: require('./images/shopping.png'),
          photo: require('./images/coco.jpg'),
          title: "Coco Depertment Store",
          description: "Fashion Department Store"
        }
      ]
    };
    this.onRegionChange = this.onRegionChange.bind(this);
    this.moveMaptoLocation=this.moveMaptoLocation.bind(this);
  }

  onRegionChange(region) {
    this.setState({region});
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
  renderCallout(marker) {
    return (
      <MapView.Callout tooltip>
        <View>
        <Text>Hello</Text>
        </View>
      </MapView.Callout>
    );
  }

  render() {
    let coordinates = this.state.markers.map(marker => marker.latlng);
    return (
      <View style={styles.container}>
        <MapView ref="map" style={styles.map} region={this.state.region}


          onRegionChange={this.onRegionChange}>

          {this.state.markers.map((marker, i) => (
            <MapView.Marker key={i} ref={i}
             coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}>
               <View >
                 <Image style={styles.pinImage} source={marker.image}/>

               </View>
{
              // <MapView.Callout>
              //   <View style={styles.callout}>
              //     <Image style={styles.calloutPhoto} source={marker.photo}/>
              //     <Text style={styles.calloutTitle}>{marker.title}</Text>
              //     <Text>{marker.description}</Text>
              //   </View>
              // </MapView.Callout>
            }
            </MapView.Marker>
          ))}
        </MapView>

<View style={styles.container}>
{this.state.markers.map((marker,i)=>(
  //  <MapView.Callout>
  //   <View style={styles.callout}>
  //      <Image style={styles.calloutPhoto} source={marker.photo}/>
  //      <Text style={styles.calloutTitle}>{marker.title}</Text>
  //      <Text>{marker.description}</Text>
  //    </View>
  //  </MapView.Callout>

  <LocationButton key={i} re={i}
  moveMaptoLocation={this.moveMaptoLocation}
  marker={marker}/>))}

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
