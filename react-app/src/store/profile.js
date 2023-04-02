const GET_PROFILE = "/food/getPROFILE";

const getProfileAction = (profile) => ({
    type: GET_PROFILE,
    profile,
});

export const getProfile = () => async (dispatch) => {
    const res = await fetch(`/api/profile/`, {
        method: "GET",
    });

    if (res.ok) {
        const profile = await res.json();
        dispatch(getProfileAction(profile));
        return profile;
    }
};


const initialState = {};

export const profileReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_PROFILE: {
            newState = { ...action.profile }
            return newState;
        }
        default:
            return state;
    }

};
