import React from 'react-native';
import RestaurantSelection from './Restaurant-Selection';
import NavigationBar from 'react-native-navbar';

var {
  StyleSheet,
  View,
  ActivityIndicatorIOS,
  ScrollView,
  Image,
  CameraRoll,
  TouchableHighlight,
  NativeModules
} = React;

var Dimensions = require('Dimensions');
var window = Dimensions.get('window');
var globals = require('../../globalVariables');

class CameraRollView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      loading: false,
      selectedImageUri: '',
      selectedImageBase64: null
    };
  }

  componentDidMount() {
    var fetchParams = {
      first: 25
    };

    this.setState({
      loading: true
    });

    CameraRoll.getPhotos(fetchParams, this.storeImages.bind(this), this.logError);
  }

  storeImages (data) {
    var assets = data.edges;
    var images = assets.map((asset) => asset.node.image);
    this.setState({
      loading: false,
      images: images
    });
  }

  logError (error) {
    console.log(error);
  }

  goToRestaurantSelection(props) {
    this.props.navigator.push({
      component: RestaurantSelection,
      props,
      navigationBar: (
        <NavigationBar
          title="Where are you at?" />
      )
    });
  }

  selectImage (image) {
    this.setState({
      loading: true
    });

    NativeModules.ReadImageData.readImage(image.uri, (base64) => {
      this.setState({
        loading: false
      });

      var props = {
        image: {
          base64,
          uri: image.uri
        }
      };

      this.goToRestaurantSelection(props);
    });
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.imageGrid}>
          { this.state.images.map((image, i) => {
            return (
              <TouchableHighlight
                key={i}
                underlayColor={'orange'}
                style={styles.button}
                onPress={this.selectImage.bind(this, image)}>
                <Image
                  style={[styles.image, this.state.selected === image.uri && styles.selectedImage]}
                  source={{ uri: image.uri}} />
              </TouchableHighlight>
            );
          })}
        </View>
        <ActivityIndicatorIOS
          animating={this.state.loading}
          style={styles.loadingIcon}
          size="large"
        />
      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: globals.secondary,
    position: 'relative',
  },
  imageGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  loadingIcon: {
    position: 'absolute',
    top: (window.height/2 - 36),
    left: (window.width/2 - 36),
    backgroundColor: "transparent",
  },
  button: {
    width: 110,
    height: 110,
    margin: 5
  },
  image: {
    width: 110,
    height: 110,
    borderWidth: 5,
    borderColor: '#ffffff'
  },
  selectedImage: {
    borderColor: 'orange'
  }
});

module.exports = CameraRollView;