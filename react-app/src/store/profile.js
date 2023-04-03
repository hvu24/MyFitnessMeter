const GET_PROFILE = "/food/getPROFILE";
const EDIT_PROFILE = "/food/editPROFILE";

const getProfileAction = (profile) => ({
    type: GET_PROFILE,
    profile,
});

const editProfileAction = (profile) => ({
    type: EDIT_PROFILE,
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

export const editProfile = (payload) => async (dispatch) => {
    const { body } = payload
    const res = await fetch(`/api/profile/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    if (res.ok) {
        const profile = await res.json();
        dispatch(editProfileAction(profile));
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
        case EDIT_PROFILE: {
            newState = { ...action.profile }
            return newState;
        }
        default:
            return state;
    }

};
