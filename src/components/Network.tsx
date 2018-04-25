import React, { Component } from 'react';
import Node from './Node';
import Icon from './Icon';
import { View, Text } from '../primitives';

const data = {
  "irVersion": "3",
  "producerName": "onnx-examples",
  "graph": {
    "node": [
      {
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
      },
      {
        "input": [
          "Y"
        ],
        "output": [
          "Z"
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
    ],
    "name": "two-transposes",
    "input": [
      {
        "name": "X",
        "type": {
          "tensorType": {
            "elemType": "FLOAT",
            "shape": {
              "dim": [
                {
                  "dimValue": "2"
                },
                {
                  "dimValue": "3"
                },
                {
                  "dimValue": "4"
                }
              ]
            }
          }
        }
      }
    ],
    "output": [
      {
        "name": "Z",
        "type": {
          "tensorType": {
            "elemType": "FLOAT",
            "shape": {
              "dim": [
                {
                  "dimValue": "3"
                },
                {
                  "dimValue": "2"
                },
                {
                  "dimValue": "4"
                }
              ]
            }
          }
        }
      }
    ]
  },
  "opsetImport": [
    {
      "version": "6"
    }
  ]
}

class Network extends Component<any, any> {

  static propExamples = [{
    props: {
      data,
    }
  }]

  constructor(props : any) {
    super(props);
  
    this.state = {
      data: props.data,
    };
  }

  _onPressAdd = () => {
    const { data } = this.state;
    this.setState({
      data: {
        ...data,
        graph: {
          ...data.graph,
          node: data.graph.node.concat({
            opType: 'Custom'
          })
        }
      },
    })
  }

  _onPressRemove = (i:number) => {
    const { nodes } = this.state;

    const { data } = this.state;
    const newNode = data.graph.node.slice();
    newNode.splice(i, 1);

    this.setState({
      data: {
        ...data,
        graph: {
          ...data.graph,
          node: newNode
        }
      },
    })
  }

  render() {

    const { data } = this.state;
    const { style, onSelect } = this.props;
    const nodesComp = data.graph.node.map((node:any, i: number)=>{
      return (
        <Node key={i}
          name={node.opType}
          onClickDelete={()=>{
            this._onPressRemove(i)
          }}
          onClickSelect={()=>{
            onSelect && onSelect(node)
            // console.warn(node)
          }}
          style={{marginBottom: 8}}
        />
       )
    })
    return (
      <View style={[styles.container,style]}>
        { nodesComp }
        <Icon title={'+'}/>
      </View>
    );
  }
}

const styles = {
  container: {
    alignItems: 'center',
  }
}

export default Network;

