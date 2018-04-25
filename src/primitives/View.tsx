import React, { Component } from 'react';

class View extends Component<any, any> {
  render() {
    const { style, children } = this.props;
    return (
      <div style={style}>{children}</div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
  },
};


export default View;
