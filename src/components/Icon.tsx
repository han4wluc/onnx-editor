'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from '../primitives';
class Icon extends Component<any, any> {

  static propExamples = [{
    props: {
      title: '+'
    }
  }];

  render() {
    const { style, title, onPress } = this.props;
    return (
      <View onClick={onPress} style={[styles.container, style]}>
        <Text style={styles.text}>{title}</Text>
      </View>
    );
  }
}

const styles = {
  container: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#aaa'
  }
};


export default Icon;