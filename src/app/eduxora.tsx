
import * as React from 'react';
import { createStore, combineReducers } from 'redux';


const store = createStore(()=>{});
// store.dispatch
// store.subscribe
// store.getState();
// store.

type ComponentsMap = { [s: number]: FunctionCallback; }
type FunctionCallback = () => void;

class BasicStore<T> {

  state: T;
  components: ComponentsMap;

  constructor(initialState: T) {
    this.state = initialState;
    this.components = [];
  }

  forceUpdate = () => {
    for (let k : number in this.components){
      this.components[k]();
    }
  }

  setState = (state: T) => {
    for (let k in state){
      this.state[k] = state[k];
    }
    this.forceUpdate();
  }

  getState = () => {
    return this.state;
  }

  subscribe = (uniqueId: number, callback: FunctionCallback) => {
    this.components[uniqueId] = callback;
    // this.components.push(component)
    // comp.forceUpdate();
  }

  unsubscribe = (uniqueId: number) => {
    delete this.components[uniqueId];
  }

}

type StateType = {
  title?: string,
  selectedData?: any,
  selectedNodeIndex?: number,
  selectedNodeData?: object,
  showNodeSelector?: boolean,
}




class AppStore extends BasicStore<StateType> {
  constructor(initialState: StateType) {
    super(initialState);
  }

  // setState = (state: StateType) => {

  // }

  selectNode = (i : number, data : object) => {
    this.setState({
      selectedNodeIndex: i,
      selectedNodeData: data,
    });
  }

  onPressAddNode = () => {
    this.setState({
      showNodeSelector: true,
    });
  }

  onPressHideNode = () => {
    this.setState({
      showNodeSelector: false,
    });
  }
}

const appStore = new AppStore({
  title: 'hello'
});

class Editor extends React.Component<any,any> {

  uniqueId: number;
  public storeState: StateType;

  constructor(props: any){
    super(props);
    this.storeState = appStore.getState();
    this.uniqueId = Date.now();
  }

  componentWillMount() {
    appStore.subscribe(this.uniqueId, () => {
      this.storeState = appStore.getState();
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    appStore.unsubscribe(this.uniqueId);
  }

  render() {

    // this.state.title
    // const {  } = this.props.editor;
    // console.warn('selectedNodeIndex', selectedNodeIndex);
    return (
      <div
        style={{flexDirection: 'row'}}
      >
        {this.storeState.title}
      </div>
    );
  }
}
