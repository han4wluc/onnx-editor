import React, { Component } from 'react';

export default class Summary extends Component {
  
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
    const { data } = this.props;
    return (
      <div style={{ whiteSpace: 'pre-wrap', width: 300, height: 400 }}>
        {JSON.stringify(data, null, 2)}
      </div>
    );
  }
}
