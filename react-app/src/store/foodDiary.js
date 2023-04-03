const GET_FOOD_DIARY = "/food/getFoodDiary";
const CREATE_FOOD_DIARY = "/food/createFoodDiary";
const CLEAR_FOOD_DIARY = "/food/clearFoodDiary";
const EDIT_FOOD_DIARY = "/food/editFoodDiary";
const EDIT_FOOD_ENTRY = "/food/deleteFoodEntry";


const getFoodDiaryAction = (diary) => ({
    type: GET_FOOD_DIARY,
    diary,
});

const createFoodDiaryAction = (diary) => ({
    type: CREATE_FOOD_DIARY,
    diary,
});

const clearFoodDiaryAction = (diary) => ({
    type: CLEAR_FOOD_DIARY,
    diary,
});

const editFoodDiaryAction = (diary) => ({
    type: EDIT_FOOD_DIARY,
    diary,
});

const editFoodEntryAction = (diary) => ({
    type: EDIT_FOOD_ENTRY,
    diary,
});


export const getFoodDiary = (payload) => async (dispatch) => {
    const { dateObj } = payload
    const res = await fetch(`/api/food/diary/${dateObj.year}/${dateObj.month}/${dateObj.day}`, {
        method: "GET",
    });

    if (res.ok) {
        const diary = await res.json();
        dispatch(getFoodDiaryAction(diary));
        return diary;
    }
};

export const createFoodDiary = (payload) => async (dispatch) => {
    const { body, dateObj } = payload
    console.log('logging payload from createFoodDiary', payload)
    const res = await fetch(`/api/food/diary/${dateObj.year}/${dateObj.month}/${dateObj.day}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    if (res.ok) {
        const diary = await res.json();
        dispatch(createFoodDiaryAction(diary));
        return diary;
    }
};

export const clearFoodDiary = (payload) => async (dispatch) => {
    const { dateObj } = payload
    const res = await fetch(`/api/food/diary/${dateObj.year}/${dateObj.month}/${dateObj.day}`, {
        method: "DELETE",
    });

    if (res.ok) {
        const diary = await res.json();
        dispatch(clearFoodDiaryAction(diary));
        return diary;
    }
};

export const editFoodDiary = (payload) => async (dispatch) => {
    const { dateObj, body } = payload
    const res = await fetch(`/api/food/diary/${dateObj.year}/${dateObj.month}/${dateObj.day}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    if (res.ok) {
        const diary = await res.json();
        dispatch(editFoodDiaryAction(diary));
        return diary;
    }
};

export const editFoodEntry = (payload) => async (dispatch) => {
    const { dateObj, body } = payload
    const res = await fetch(`/api/food/diary/${dateObj.year}/${dateObj.month}/${dateObj.day}/entry`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    if (res.ok) {
        const diary = await res.json();
        dispatch(editFoodEntryAction(diary));
        return diary;
    }
};

const initialState = {};

export const searchFoodDiaryReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_FOOD_DIARY: {
            newState = { ...action.diary }
            return newState;
        }
        case CREATE_FOOD_DIARY: {
            newState = { ...action.diary }
            return newState;
        }
        case CLEAR_FOOD_DIARY: {
            newState = { ...action.diary }
            return newState;
        }
        case EDIT_FOOD_DIARY: {
            newState = { ...action.diary }
            return newState;
        }
        case EDIT_FOOD_ENTRY: {
            newState = { ...action.diary }
            return newState;
        }
        default:
            return state;
    }

};
