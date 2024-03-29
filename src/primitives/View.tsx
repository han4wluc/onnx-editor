import * as React from 'react';

// import { View } from 'react-native-web';

class View extends React.Component<any, any> {
  render() {
    const { style, children } = this.props;

    let s = {};
    if(Array.isArray(style)){
      style.forEach((ss)=>{
        s = {
          ...s,
          ...ss
        }
      })
    }

    return (
      <div {...this.props} style={{
        display: 'flex',
        ...s
      }}>{children}</div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
  },
};

export default View;
