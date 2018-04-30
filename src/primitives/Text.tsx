import * as React from 'react';
import StyleSheet from './StyleSheet';
import { StyleMap, StyleType } from './StyleSheet';

interface PropTypes {
  children: string,
  style?: StyleType | StyleType[]
}

class Text extends React.Component<PropTypes, {}> {
  render() {
    const { style, children } = this.props;

    let s: StyleType = {};
    if(Array.isArray(style)){
      style.forEach((ss: StyleType)=>{
        s = {
          ...s,
          ...ss
        }
      })
    }

    return (
      <div
        {...this.props}
        style={{
          ...styles.container,
          ...s
        }}
      >
        {children}
       </div>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
});

export default Text;
