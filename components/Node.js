import React, { Component } from 'react';

export default class Node extends Component {

  static propExamples = [{

  }]

  render() {
    const { onClickSelect, onClickDelete, name, style } = this.props;
    return (
      <div style={style}>
        <div onClick={onClickDelete}>{'-'}</div>
        <div onClick={onClickSelect} style={styles.container}>
          { name }
        </div>
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
