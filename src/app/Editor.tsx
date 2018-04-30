import * as React from 'react';
import Edux, { connect } from './edux';

import { View, Text } from '../primitives'

import Network from '../components/Network';
import Summary from '../components/Summary';


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

class Editor extends React.Component<any,any> {
  render() {
    const { title, selectedData, selectedNodeIndex, selectedNodeData } = this.props.editor;
    console.warn('selectedNodeIndex', selectedNodeIndex);
    return (
      <View onClick={()=>{
        // Edux.action('editor/setState', {
        //   title: Math.random()
        // })
      }}
        style={{flexDirection: 'row'}}
      >
        <Network
          data={data}
          style={{marginLeft: 16, marginRight: 100}}
          onSelect={Edux.actions.selectNode}
          selectedNodeIndex={selectedNodeIndex}
        />
        <Summary data={selectedData}/>
      </View>
    );
  }
}

export default connect({
  namespace: 'editor',
  stateMapper: (state:any) => {
    return {
      editor: state.editor
    }
  },
  container: Editor,
})
