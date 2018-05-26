
import { createStore, combineReducers } from 'redux';
import { Provider as ConnectProvider, connect as reactReduxConnect } from 'react-redux';
import * as React from 'react';
import _ from 'lodash';

export type ActionsType = {
   selectNode: (i: number, data: object) => void,
   onPressAddNode: () => void,
   onPressHideNode: () => void,
}

export const Component = React.PureComponent;

export class Edux2 {
  store: any;
  actions: ActionsType = {
    selectNode: (i, data) => {
      this.setState({
        selectedNodeIndex: i,
        selectedNodeData: data,
      });
    },
    onPressAddNode: () => {
      this.setState({
        showNodeSelector: true,
      });
    },
    onPressHideNode: () => {
      this.setState({
        showNodeSelector: false,
      });
    }
  };
  reducers: any = {};

  setState: (state: StateType) => void = (state) => {
    this.store.dispatch({
      type: 'editor/setState',
      payload: state,
    })
  };

  constructor() {
  }
  create = (props: {
    namespace: string,
    actions: any,
    initialState: StateType;
  }) => {

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

  init = () => {
    const store = createStore(combineReducers(this.reducers));
    this.store = store;
  }

}


export type StateType = {
  title?: string,
  selectedData?: any,
  selectedNodeIndex?: number,
  selectedNodeData?: object,
  showNodeSelector?: boolean,
}

const edux22 = new Edux2();
edux22.create({
  namespace: 'editor',
  actions: {
  },
  initialState: {
    title: 'Editor',
    selectedData: {},
    selectedNodeIndex: 0,
    selectedNodeData: undefined,
    showNodeSelector: false,
  },
})


edux22.init();

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
  return reactReduxConnect(props.stateMapper)(props.container);
};



