
import { createStore, combineReducers, applyMiddleware, Action, ReducersMapObject, Reducer } from 'redux';
import React from 'react';
import { Provider, connect } from 'react-redux';

const middleware = applyMiddleware();

type asdf = (initialState: AppState, action: Action) => AppState;

type State = object;

type AppState = {
  title?: string,
}

type UserState = {
  username?: string,
  age?: number,
}

let initialState : AppState = {
  title: 'hello there'
}

interface MyAction {
  type: ActionType,
  payload: AppState,
};


type States = object;


type BasicReducer<S = States, A = MyAction> = (state: S | undefined, action: A) => S;


type GenerateReducer = (setStateActionType: ActionType, resetStateActionType: ActionType, initialState: State) =>  BasicReducer;

const generateReducer :GenerateReducer = (setStateActionType, resetStateActionType, initialState) => {
  return (state = initialState, action) => {
    if(action.type == AppSetState) {
      const finalState: AppState = {
        ...state,
        ...action.payload,
      }
    }
    if(action.type == AppResetState) {
      return initialState;
    }
    return state;
  }
}

// const app: BasicReducer<AppState,MyAction> = (state = initialState, action) => {
//   if(action.type == AppSetState) {
//     const finalState: AppState = {
//       ...state,
//       ...action.payload,
//     }
//   }
//   if(action.type == AppResetState) {
//     return initialState;
//   }
//   return state;
// }

type ActionType = string;
type AppNamespace = string;

const App : AppNamespace = 'app';
const User : AppNamespace = 'user';

const AppSetState: ActionType = `${App}/setState`;
const AppResetState: ActionType = `${App}/resetState`;

const UserSetState: ActionType = `${User}/setState`;
const UserResetState: ActionType = `${User}/resetState`;

const reducers = {
  App: generateReducer(AppSetState, AppResetState, {}),
  User: generateReducer(UserSetState, UserResetState, {}),
}

const reducer = combineReducers(reducers);

const store = createStore(combineReducers(reducers), middleware);

const spaces = [{
  namespace: App,
  setStateActionType: AppSetState,
  resetStateActionType: AppResetState,
}]


const Manager : any = {};
spaces.forEach((obj: any)=>{
  Manager[obj.namespace] = {
    setState: (state: AppState) => {
       store.dispatch({
         type: AppSetState,
         payload: state
       })
    },
    resetState: (state: AppState) => {
       store.dispatch({
         type: AppResetState,
       })
    }
  }
})

const StoreManager = {
  App: {
    setState: (state: AppState) => {
       store.dispatch({
         type: AppSetState,
         payload: state
       })
    },
    resetState: (state: AppState) => {
       store.dispatch({
         type: AppResetState,
       })
    }
  }
}

// store.dispatch({
//   type: AppSetState,
//   payload: {
//     'sdf': 'asdf'
//   }
// })

const AppStore = {
  // constructor(initialState: StateType) {
  //   super(initialState);
  // }

  // setState = (state: StateType) => {

  // }

  selectNode: (i : number, data : object) => {
    StoreManager.App.setState({
      title: 'asf',
    })
    // store.dispatch({
    //   type: AppSetState,
    //   payload: {
    //     selectedNodeIndex: i,
    //     selectedNodeData: data,
    //   }
    // })
    // this.setState({
    //   selectedNodeIndex: i,
    //   selectedNodeData: data,
    // });
  },

  onPressAddNode: () => {
    StoreManager.App.setState({
      title: 'asdf'
    })
    // this.setState({
    //   showNodeSelector: true,
    // });
  },

  onPressHideNode: () => {
    // this.setState({
    //   showNodeSelector: false,
    // });
  }
}

class MyComponent extends React.Component {
  render() {
    return (
      <div onClick={AppStore.onPressHideNode}>
      </div>
    )
  }
}

const Connector = connect((state)=>{
  return {

  }
}, {})(MyComponent)

const render = () => {
  return (
    <Provider store={store}>
      <Connector/>
    </Provider>
  )
}



