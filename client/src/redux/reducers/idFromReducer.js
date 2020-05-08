const initialState = [];

const ADD_ID = "ADD_ID";

export const idFromReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ID:
            return [...state, action.payload];
        default:
            return state;
    }
};
