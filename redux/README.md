# Waha Redux Store

Waha uses the Redux state container to manage data within the app.

Additions to the basic Redux setup include:

- **Redux Persist**: Automatically persists the data store to local storage to save the state across app restarts.
- **Redux Thunk**: Redux middleware to assist in the execution of asynchronous tasks like API calls.

## Directory Structure

This `redux/` folder has the following structure:

- `redux/reducers/`: This folder contains all the reducers that transform the state. These are separated based on logical separations of data.
- `redux/combiner.ts`: This file takes all of the separate reducers in `reducers/` and combines them into one reducer.
- `redux/common.ts`: This file contains type definitions for some of the most common props used by most components. We have these separately so that we can easily import them into components and not have to define their props each time. They're in this folder because they're almost exclusively props from redux.
- `redux/hooks.ts`: The file contains the hooks used to access redux state in components.
- `redux/store.ts`: This file takes the combined reducer created in `combiner.js`, makes it persisted, adds the thunk middleware, and finally creates the store.

## Reducers

For information about what each reducer does and what data it stores, see each individual reducer file.

## Accessing Data in Components/Screens

Screens, modal screens, and navigators all access/update the redux store using the selector hook and useDispatch hooks outlined in `hooks/`. Child components do not access the redux state on their own but have the necessary redux data passed as props by their parent components in order to keep the child components light.
