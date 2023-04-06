import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useModal } from "../../context/Modal";
import { useHistory } from 'react-router-dom';
import "./exerciseSearchModal.css";
import { getSearchExercises } from '../../store/exerciseSearch';
import { createExerciseDiary } from '../../store/exerciseDiary';
import { getProfile } from '../../store/profile';

function ExerciseSearchModal({ date, onModalSubmit }) {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    const [searchTerm, setSearchTerm] = useState('');
    const [exerciseAmount, setExerciseAmount] = useState('')
    const [entries, setEntries] = useState([]);
    const [exercises, setExercises] = useState({});
    const [recommendations, setRecommendations] = useState([]);
    const [weight, setWeight] = useState(0)
    const [calories, setCalories] = useState(0)


    let exercisesObj = useSelector(state => state.searchExercisesReducer);
    let exercisesArr = exercisesObj['exercises']
    let exerciseNameMetObj = {}
    for (let i = 0; i < exercisesArr?.length; i++) {
        exerciseNameMetObj[exercisesArr[i]['name']] = exercisesArr[i]['met']
    }
    let searchNamesArr = exercisesArr?.map(exercise => exercise.name)

    const payload = {
        dateObj: {
            'year': date.getFullYear(),
            'month': date.getMonth() + 1,
            'day': date.getDate()
        }
    }

    useEffect(() => {
        dispatch(getSearchExercises())
        dispatch(getProfile())
            .then((res)=>{
                if(res.id){
                    setWeight(res?.weightInPounds)
                }
            })
    }, [dispatch, searchTerm]);

    const handleInputChange = async (event) => {
        setSearchTerm(event.target.value);
        setRecommendations(getRecommendations(event.target.value));
        // console.log('logging searchTerm from input change', searchTerm)
    };

    const getRecommendations = (searchTerm) => {
        return searchNamesArr.filter(
            (recommendation) =>
                recommendation.toLowerCase().includes(searchTerm.toLowerCase()) && searchTerm !== ''
        );
    };

    const handleSearch = async (exercise) => {
        setSearchTerm(exercise)
    }

    const entrySubmit = (e) => {
        e.preventDefault();
        payload.body = {
            "name": searchTerm,
            "amount": exerciseAmount
        }
        dispatch(createExerciseDiary(payload))
            .then((res) => {
                setEntries(res?.foodEntries)
                onModalSubmit()
            })
    }

    return (
        <div style={{ width: "600px", height: "600px" }}>
            <div>
                <form onSubmit={entrySubmit}>
                    <div style={{ display: "flex", justifyContent: 'center' }}>
                        <input className='search-bar' placeholder='Search an exercise...' type="text" value={searchTerm} onChange={handleInputChange} />
                    </div>
                    <div style={{ display: "flex", justifyContent: 'space-between' }}>
                        <div className='exercise-search' style={{ display: "flex", justifyContent: 'space-between' }}>
                            <div className='search-list' style={{ width: "300px", height: "300px" }}>
                                {recommendations.map((recommendation, index) => (
                                    <div className='search-entry' key={index} onClick={() => handleSearch(recommendation)}>{recommendation}</div>
                                ))}
                            </div>
                            {searchTerm && <div style={{ width: "300px", height: "300px" }}>
                                <div>Exercise Name: <b>{searchTerm}</b></div>
                                <div>Exercise MET: <b>{exerciseNameMetObj[searchTerm] || 0}</b></div>
                                <div>Exercise calories = (MET level of activity x 3.5 x Weight (lb) x 0.45359237 x minutes of activity) / 200</div>
                                <div>
                                    <label className=''>Amount:
                                        <input
                                            type="number"
                                            placeholder="Amount in minutes..."
                                            required
                                            onChange={(e) => {
                                                setExerciseAmount(e.target.value)
                                                setCalories((exerciseNameMetObj[searchTerm] * 3.5 * weight * 0.45359237 * exerciseAmount) / 200)
                                            }}
                                        />
                                        <button type="submit" className='search-bar-button'>
                                            <i class="fa-solid fa-dumbbell"></i>
                                        </button>
                                    </label>
                                </div>
                                <div>Calories: {((exerciseNameMetObj[searchTerm] * 3.5 * weight * 0.45359237 * exerciseAmount) / 200) || 0}</div>
                            </div>}
                        </div>
                    </div>
                    {/* {exercises && exercises[0] && <h5>Exercises</h5>}
            <div className='search-common-list'>
                {exercises && exercises[0] && exercises?.map((exercise, index) => (
                    <div className='search-entry' key={index} onClick={() => handleSearch(exercise.name)}>{exercise.name}</div>
                ))}
            </div> */}
                </form>
            </div>
        </div>


    );
};

export default ExerciseSearchModal;
