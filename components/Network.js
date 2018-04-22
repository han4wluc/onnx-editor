import React, { Component } from 'react';
import Node from './Node';

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

export default class Network extends Component {

  static propExamples = [{
    props: {
      data,
    }
  }]

  constructor(props) {
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

  _onPressRemove = (i) => {
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
    const nodesComp = data.graph.node.map((node, i)=>{
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
        />)
    })
    return (
      <div style={style}>
        <div onClick={this._onPressAdd}>{'+'}</div>
        <Node
          name={'input: ' + data.graph.input[0].name}
          onClickSelect={()=>{
            onSelect && onSelect(data.graph.input[0])
            // console.warn(data.graph.input[0])
          }}
        />
        { nodesComp }
        <Node
          name={'output: ' + data.graph.output[0].name}
          onClickSelect={()=>{
            // console.warn(data.graph.output[0])
            onSelect && onSelect(data.graph.output[0])
          }}
        />
      </div>
    );
  }
}

const styles = {
  container: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'black'
  }
}
