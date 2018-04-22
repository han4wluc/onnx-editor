import React, { Component } from 'react';
import Edux, { connect } from './edux';

import { View, Text } from 'react-primitives'
import Network from '../../components/Network';
import Summary from '../../components/Summary';

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

class Editor extends Component {
  render() {
    const { title, selectedData } = this.props.editor;
    console.warn('selectedData', selectedData);
    return (
      <View onClick={()=>{
        Edux.action('editor/setState', {
          title: Math.random()
        })
      }}
        style={{flexDirection: 'row'}}
      >
        <Network
          data={data}
          style={{marginLeft: 16, marginRight: 100}}
          onSelect={(data)=>{
            console.warn('data', data);
            Edux.action('editor/setState', {
              selectedData: data
            })
          }}
        />
        <Summary data={selectedData}/>
      </View>
    );
  }
}

export default connect({
  namespace: 'editor',
  stateMapper: (state) => {
    return {
      editor: state.editor
    }
  },
  container: Editor,
})