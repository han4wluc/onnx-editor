import React, { Component } from 'react';

import { Edux, Provider } from './edux'

import Editor from './Editor';

export default class App extends Component {
  render() {
    return (
      <Provider>
        <Editor/>
      </Provider>
    );
  }
}