const GET_PROFILE = "/food/getPROFILE";
const CREATE_PROFILE = "/food/editPROFILE";
const EDIT_PROFILE = "/food/editPROFILE";
const RESET_PROFILE = "/food/resetPROFILE";

const getProfileAction = (profile) => ({
    type: GET_PROFILE,
    profile,
});

const createProfileAction = (profile) => ({
    type: CREATE_PROFILE,
    profile,
});

const editProfileAction = (profile) => ({
    type: EDIT_PROFILE,
    profile,
});

const resetProfileAction = (profile) => ({
    type: RESET_PROFILE,
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

export const createProfile = (payload) => async (dispatch) => {
    const { body } = payload
    const res = await fetch(`/api/profile/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    if (res.ok) {
        const profile = await res.json();
        dispatch(createProfileAction(profile));
        return profile;
    }
    return res
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

export const resetProfile = () => async (dispatch) => {
    const res = await fetch(`/api/profile/`, {
        method: "DELETE",
    });

    if (res.ok) {
        const profile = await res.json();
        dispatch(resetProfileAction(profile));
        return profile;
    }
    return res
};


const initialState = {};

export const profileReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_PROFILE: {
            newState = { ...action.profile }
            return newState;
        }
        case CREATE_PROFILE: {
            newState = { ...action.profile }
            return newState;
        }
        case EDIT_PROFILE: {
            newState = { ...action.profile }
            return newState;
        }
        case RESET_PROFILE: {
            newState = { ...action.profile }
            return newState;
        }
        default:
            return state;
    }

};
