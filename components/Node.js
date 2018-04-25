
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-primitives';
import Icon from './Icon';

export default class Node extends Component {

  static propExamples = [{
    description: 'Unselected',
    props: {
      name: 'Input',
    }
  }, {
    description: 'Selected',
    props: {
      name: 'Convolution',
      selected: true,
    }
  }];

  static defaultProps = {
    selected: false
  };

  render() {
    const {
      onClickNode,
      onPressRemove,
      onPressAdd,
      name,
      style,
      selected
    } = this.props;
    
    const selectedState = selected ? {
      backgroundColor:'#ddd'
    } : {}

    return (
      <View style={[styles.container, style]}>
        <View onClick={onClickNode} style={[styles.node,selectedState]}>
          <Text>{ name }</Text>
        </View>

        { selected && <Icon onPress={onPressRemove} style={{marginLeft:8,marginRight:8}} title={'-'}/> }
        { selected && <Icon onPress={onPressAdd} title={'+'}/> }
      </View>
    );
  }
}

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  node: {
    width: 120,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  }
}

