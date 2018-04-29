import * as React from 'react';
import { View, Text, StyleSheet } from '../primitives';

class Summary extends React.Component<any,any> {

  constructor(props:any) {
    super(props);
  
    this.state = {
      hasError: false,
      errorMessage: '',
    };
  }
  
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

  componentDidCatch(error:any, info:any) {
    console.warn(error, info);
    this.setState({ hasError: true, errorMessage: error });
  }

  render() {
    const { data, style } = this.props;
    const { opType, attribute, input, output } = data;


    if(this.state.hasError){
      return (
        <View style={[styles.container,style]}>
          <Text>{'Error: ' + this.state.errorMessage}</Text>
        </View>
      )
    }

    try {
      const attributesComp:any = attribute.map((attr:any)=>{
        const comps:any = Object.keys(attr).map((key:any)=>{
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

      const inputsComp :any = input.map((inpt:any)=>{
        return (
          <View style={{marginLeft: 16, marginTop: 8}}>
            <Text>{inpt}</Text>
          </View>
        )
      })

      const outputsComp :any = output.map((oupt:any)=>{
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
    } catch (error){
      return (
        <View style={[styles.container,style]}>
          <Text>{'Error: ' + error}</Text>
        </View>
      )
    }
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


