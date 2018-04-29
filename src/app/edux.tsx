
import { createStore, combineReducers } from 'redux';
import { Provider as ConnectProvider, connect as reactReduxConnect } from 'react-redux';
import * as React from 'react';

export class Edux2 {
  store: any;
  actions: any;
  reducers: any = {};

  constructor() {
    this.actions = {
      // add: () => {},
      // minus: () => {}
    };
    // this.reducers = {};
    // this.store = createStore({});
  }
  create = (props: {
    namespace: string,
    actions: any,
    initialState: any;
    // logics: any,
    // reducers:any
  }) => {
    this.actions = props.actions;

    this.reducers[props.namespace] = (state: any = props.initialState, action: any) => {
      switch(action.type) {
        case `${props.namespace}/setState`:
          return {
            ...state,
            ...action.payload,
          };
        case `${props.namespace}/resetState`: {
          return props.initialState;
        }
        default: {
          return state;
        }
      }
    }
  }
  // dl = (type: ActionTypes, payload?: object) => {
  //   this.store.dispatch({
  //     type,
  //     payload,
  //   })
  // }

  getActions = () => {
    return this.actions;
  }


  init = () => {
    const store = createStore(combineReducers(this.reducers));
    this.store = store;
  }

  // getStore = () => {
  //   return this.store;
  // }

  action = (type: string, payload?: object) => {
    this.store.dispatch({
      type,
      payload,
    })
  }
  // getActions () => void = {
    // return this.actions;
  // }
}


const edux22 = new Edux2();
edux22.create({
  namespace: 'editor',
  actions: {
  },
  initialState: {
    title: 'Editor',
    selectedData: {}
  },
})


edux22.init();

// console.log(edux22.store)
// console.log(edux22.store.getState())
// edux22.action('count/setState', {
//   title: 'hello'
// })
// console.log(edux22.store.getState())

export default edux22;

export const Edux = edux22;
export class Provider extends React.Component {
  render() {
    return (
      <ConnectProvider store={edux22.store}>
        {this.props.children}
      </ConnectProvider>
    )
  }
} 

export const connect = function(props: {
  namespace: string,
  stateMapper: any,
  // actions: any = {},
  container: any
}) {
  if (!props.namespace) {
    throw new Error('connect name is required');
  }
  if (!props.stateMapper) {
    props.stateMapper = function(state: any) {
      return {
        state: state[name],
        global: state.global,
      };
    };
  }
  // const allActions = {
  //   ...props.actions,
  //   logic,
  // };
  return reactReduxConnect(props.stateMapper)(props.container);
};





