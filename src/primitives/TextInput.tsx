import * as React from 'react';

class TextInput extends React.Component<any, any> {
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
      <input {...this.props} type={'text'} style={{
        display: 'flex',
        ...s
      }} >{children}</input>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
  },
};

// export {
//   TextInput
// };

export default TextInput;

// export default Text;
