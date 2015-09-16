var React = require('react-native');
var Dimensions = require('Dimensions');
var {
  width,
  height
} = Dimensions.get('window');

var {
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
} = React;

var Colors = require('../../../globalVariables');
var { Icon, } = require('react-native-icons');

class FetchingItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      panAnim: new Animated.Value(0),
      secondPanAnim: new Animated.Value(0),
      itemIcons: [0]
    };
  }
  componentWillMount() {
    this._yAnimation = this.state.panAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [-75, 75]
    });
    this._secondYAnimation = this.state.secondPanAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 300]
    });
  }
  componentDidMount() {
    Animated.sequence([
      Animated.timing(this.state.panAnim, {
        toValue: 1,
        duration: 500
      })
    ]).start(this.props.onComplete);
  }
  getPan() {
    return {
      transform: [
        {translateY: this._yAnimation},
        {translateY: this._secondYAnimation}
      ],
    };
  }

  render() {
    return (
      <Animated.View style={[this.getPan(), this.props.style]}>
        <Icon name={'ion|' + this.props.icon} size={45} color={Colors.primary} style={styles.locationPinAnim}/>
      </Animated.View>
    )
  }
}

let styles = StyleSheet.create({
  locationPinAnim: {
    width: 45,
    height: 45
  }
});

module.exports = FetchingItems;