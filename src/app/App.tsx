import * as React from 'react';

import { Edux, Provider } from './edux'

import Editor from './Editor';

export default class App extends React.Component {
  render() {
    return (
      <Provider>
        <Editor/>
      </Provider>
    );
  }
}

// import { View } from '../primitives';

// export default class App extends React.Component<any, any> {
//   render() {
//     return (
//       <View>{'ele'}</View>
//     );
//   }
// }
