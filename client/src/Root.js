import React, { useState } from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import ConfigsContext from "./contexts/ConfigsContext";
import getClient from "./data/apolloClient";
import { InMemoryCache } from "apollo-cache-inmemory";
import ListDirectory from "./components/ListDirectory";
import { MyContext, display } from "./react-context/display.context";

import { combineReducers, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { pathReducer } from "./redux/reducers/pathReducer";
import { idFromReducer } from "./redux/reducers/idFromReducer";
import { onClickPath, onBackClickPath } from "./redux/actions/pathAction";
import { addId } from "./redux/actions/idAction";

const rootReducer = combineReducers({
    pathReducer,
    idFromReducer,
});

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export const onClick = (id, name) => {
    return (dispatch) => {
        dispatch(onClickPath({ id, name }));
    };
};

export const onBackClick = (pathInput) => {
    return (dispatch) => {
        dispatch(onBackClickPath(pathInput));
    };
};

export const addIdFrom = (id) => {
    return (dispatch) => {
        dispatch(addId(id));
    };
};

const Root = (appConfigs) => {
    const { api } = appConfigs;
    const client = getClient({
        cache: new InMemoryCache(),
        graphqlOptions: {
            ...api,
        },
    });

    const [view, setView] = useState(display);

    const onClickContext = () => {
        setView({ row: !view.row });
    };

    return (
        <ConfigsContext.Provider value={appConfigs}>
            <ApolloProvider client={client}>
                <Provider store={store}>
                    <MyContext.Provider value={view.row}>
                        <ListDirectory />
                    </MyContext.Provider>
                    <button onClick={onClickContext}>Change Me!</button>
                </Provider>
            </ApolloProvider>
        </ConfigsContext.Provider>
    );
};

export default Root;
