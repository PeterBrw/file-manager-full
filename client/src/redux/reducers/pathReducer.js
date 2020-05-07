const ON_CLICK_PATH = "ON_CLICK_PATH";
const ON_BACK_CLICK_PATH = "ON_BACK_CLICK_PATH";

const initialState = [{ id: "root" }];

export const pathReducer = (state = initialState, action) => {
    switch (action.type) {
        case ON_CLICK_PATH: {
            return [
                ...state,
                {
                    id: action.payload,
                },
            ];
        }
        case ON_BACK_CLICK_PATH: {
            const newPath = [...state];
            return newPath.slice(
                0,
                newPath.findIndex((item) => item.id === action.payload) + 1
            );
        }
        default:
            return state;
    }
};
