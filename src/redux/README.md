# Redux

State management

## How create new Redux state?

1. Create your own folder in redux folder with name of your feature, for example there is `counter` folder
2. Create slice with `nameOfYourFeature.slice.js` after that code your slice and reducer
3. Create actions with `nameOfYourFeature.action.js` after that code your actions
4. After everything is finished, go to `store.js` in [here](../store.js)
5. Import your reducer in `store.js`
6. Put it in the reducer object like this for example

```js
//store.js
import { configureStore } from '@reduxjs/toolkit';

import counterReducer from './redux/counter/counter.slice';
// Import your reducer first
import myNewFeatureReducer from './redux/myNewFeature/myNewFeature.slice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    // put here as an key value pair like this
    myNewFeature: myNewFeatureReducer
  }
});
```

7. After that you're good to go, to dispatch some action or get some state in this project

## Usage

Check out [this](./counter/Counter.jsx) component for example

## Links

Check out their docs for better understanding Redux

- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Redux](https://redux.js.org/)
- [React Redux](https://react-redux.js.org/)
