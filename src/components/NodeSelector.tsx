'use strict';

import * as React from 'react';

import {
  View,
  Text,
  TextInput
} from '../primitives';

class NodeSelector extends React.Component<any,any> {

  static propExamples = [{
    props: {
      data: {
        'Input': {

        },
        'Output': {

        },
        'Convolution': {

        },
        'Transpose': {

        }
      }
    }
  }];

  render() {
    const { style, title, onPressClose, onPressChoice, data } = this.props;

    const comps = Object.keys(data).map((key, i)=>{
      return (
        <View onClick={()=>onPressChoice(key, data[key])} style={styles.choice}>
          <Text>{key}</Text>
        </View>
      )
    })

    return (
      <View style={[styles.container, style]}>
        <Text style={styles.title}>{'Node Selector'}</Text>
        <TextInput style={{marginTop:16,}}/>
        <View style={styles.choiceContainer}>
          { comps }
        </View>
        <Text onPress={onPressClose} style={styles.closeIcon}>{'X'}</Text>
      </View>
    );
  }
}

const styles = {
  container: {
    width: 300,
    height: 400,
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  title: {
    alignSelf: 'center',
  },
  searchInput: {
    marginTop: 16,
  },
  choice: {
    height: 32,
    borderBottomWidth: 1,
    borderLeftWidth:1,
    borderRightWidth:1,
    borderColor:'#ccc',
    borderStyle: 'solid',
    justifyContent: 'center',
    paddingLeft: 8,
  },
  choiceContainer: {
    borderTopWidth:1,
    borderColor:'#ccc',
    borderStyle: 'solid',
    marginTop: 16,
  },
  closeIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
    color: '#ccc'
  }
};


export default NodeSelector;