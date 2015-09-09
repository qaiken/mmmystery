var React = require('react-native');
var { Icon, } = require('react-native-icons');
var Colors = require('../../../globalVariables');


var {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} = React;

class CustomPrev extends React.Component {
  render() {
    return (
      // Need to pass in a handler that actually takes you to the menu
      <TouchableOpacity onPress={() => alert('menu') }>
        <Icon name={'ion|' + this.props.iconName} size={this.props.size} color={this.props.color} style={styles.icon}/>
      </TouchableOpacity>
    );
  }
}

let styles = StyleSheet.create({
  icon: {
    width: 35,
    height: 35,
    left: 10,
    top: 22
  },
});

module.exports = CustomPrev;