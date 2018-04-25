import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-primitives';

class Summary extends Component {
  
  static propExamples = [{
    props: {
      data: {
        "input": [
          "X"
        ],
        "output": [
          "Y"
        ],
        "opType": "Transpose",
        "attribute": [
          {
            "name": "perm",
            "ints": [
              "1",
              "0",
              "2"
            ],
            "type": "INTS"
          }
        ]
      }
    }    
  }]

  render() {
    const { data, style } = this.props;
    const { opType, attribute, input, output } = data;

    const attributesComp = attribute.map((attr)=>{
      const comps = Object.keys(attr).map((key)=>{
        return (
          <View style={{flexDirection:'row'}}>
            <Text style={{marginRight:8}}>{`${key}:`}</Text>
            <Text>{`${attr[key]}`}</Text>
          </View>
        )
      })
      return (
        <View style={{marginLeft: 16, marginTop: 8}}>
         { comps }
        </View>
      )
    })

    const inputsComp = input.map((inpt)=>{
      return (
        <View style={{marginLeft: 16, marginTop: 8}}>
          <Text>{inpt}</Text>
        </View>
      )
    })

    const outputsComp = output.map((oupt)=>{
      return (
        <View style={{marginLeft: 16, marginTop: 8}}>
          <Text>{oupt}</Text>
        </View>
      )
    })

    return (
      <View style={[styles.container,style]}>
        {/*<Text style={{whiteSpace: 'pre-wrap'}}>{JSON.stringify(data, null, 2)}</Text>*/}
        <Text>{opType}</Text>
        <View style={styles.separator}/>
        <Text style={styles.subtitle}>{'Attributes'}</Text>
        { attributesComp }
        <Text style={[styles.subtitle, {marginTop:8}]}>{'Inputs'}</Text>
        { inputsComp }
        <Text style={[styles.subtitle, {marginTop:8}]}>{'Outputs'}</Text>
        { outputsComp }
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 400,
    backgroundColor:'#eee',
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ccc',
    padding: 12
  },
  separator: {
    height:1,
    backgroundColor:'#ccc',
    marginVertical: 8
  },
  text: {
    color: '#aaa'
  },
  subtitle: {
    textDecoration: 'underline'
  }
});

export default Summary;


