const GET_EXERCISE_DIARY = "/exercise/getExerciseDiary";
const CREATE_EXERCISE_DIARY = "/exercise/createExerciseDiary";
const CLEAR_EXERCISE_DIARY = "/exercise/clearExerciseDiary";
const EDIT_EXERCISE_DIARY = "/exercise/editExerciseDiary";
const EDIT_EXERCISE_ENTRY = "/exercise/deleteExerciseEntry";


const getExerciseDiaryAction = (diary) => ({
    type: GET_EXERCISE_DIARY,
    diary,
});

const createExerciseDiaryAction = (diary) => ({
    type: CREATE_EXERCISE_DIARY,
    diary,
});

const clearExerciseDiaryAction = (diary) => ({
    type: CLEAR_EXERCISE_DIARY,
    diary,
});

const editExerciseDiaryAction = (diary) => ({
    type: EDIT_EXERCISE_DIARY,
    diary,
});

const editExerciseEntryAction = (diary) => ({
    type: EDIT_EXERCISE_ENTRY,
    diary,
});


export const getExerciseDiary = (payload) => async (dispatch) => {
    const { dateObj } = payload
    const res = await fetch(`/api/exercise/diary/${dateObj.year}/${dateObj.month}/${dateObj.day}`, {
        method: "GET",
    });

    if (res.ok) {
        const diary = await res.json();
        dispatch(getExerciseDiaryAction(diary));
        return diary;
    }
};

export const createExerciseDiary = (payload) => async (dispatch) => {
    const { body, dateObj } = payload
    const res = await fetch(`/api/exercise/diary/${dateObj.year}/${dateObj.month}/${dateObj.day}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    if (res.ok) {
        const diary = await res.json();
        dispatch(createExerciseDiaryAction(diary));
        return diary;
    }
};

export const clearExerciseDiary = (payload) => async (dispatch) => {
    const { dateObj } = payload
    const res = await fetch(`/api/exercise/diary/${dateObj.year}/${dateObj.month}/${dateObj.day}`, {
        method: "DELETE",
    });

    if (res.ok) {
        const diary = await res.json();
        dispatch(clearExerciseDiaryAction(diary));
        return diary;
    }
};

export const editExerciseDiary = (payload) => async (dispatch) => {
    const { dateObj, body } = payload
    const res = await fetch(`/api/exercise/diary/${dateObj.year}/${dateObj.month}/${dateObj.day}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    if (res.ok) {
        const diary = await res.json();
        dispatch(editExerciseDiaryAction(diary));
        return diary;
    }
};

export const editExerciseEntry = (payload) => async (dispatch) => {
    const { dateObj, body } = payload
    const res = await fetch(`/api/exercise/diary/${dateObj.year}/${dateObj.month}/${dateObj.day}/entry`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    if (res.ok) {
        const diary = await res.json();
        dispatch(editExerciseEntryAction(diary));
        return diary;
    }
};

const initialState = {};

export const searchExerciseDiaryReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_EXERCISE_DIARY: {
            newState = { ...action.diary }
            return newState;
        }
        case CREATE_EXERCISE_DIARY: {
            newState = { ...action.diary }
            return newState;
        }
        case CLEAR_EXERCISE_DIARY: {
            newState = { ...action.diary }
            return newState;
        }
        case EDIT_EXERCISE_DIARY: {
            newState = { ...action.diary }
            return newState;
        }
        case EDIT_EXERCISE_ENTRY: {
            newState = { ...action.diary }
            return newState;
        }
        default:
            return state;
    }

};
