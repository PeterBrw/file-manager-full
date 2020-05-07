export const onClickPath = (payload) => {
    return {
        type: "ON_CLICK_PATH",
        payload,
    };
};

export const onBackClickPath = (payload) => {
    return {
        type: "ON_BACK_CLICK_PATH",
        payload,
    };
};
