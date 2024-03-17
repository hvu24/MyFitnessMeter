import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getSearchExercises } from '../../../store/exerciseSearch';
import { getExerciseDetails } from '../../../store/exerciseDetails';

const ExerciseSearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [exercises, setExercises] = useState({});
    const [recommendations, setRecommendations] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory()

    let exercisesObj = useSelector(state => state.searchExercisesReducer);
    let exercisesArr = exercisesObj['exercises']
    let exerciseNameMetObj = {}
    for (let i = 0; i < exercisesArr?.length; i++) {
        exerciseNameMetObj[exercisesArr[i]['name']] = exercisesArr[i]['met']
    }
    let searchNamesArr = exercisesArr?.map(exercise => exercise.name)

    useEffect(() => {
        dispatch(getSearchExercises())
    }, [dispatch, searchTerm]);

    const handleInputChange = async (event) => {
        setSearchTerm(event.target.value);
        setRecommendations(getRecommendations(event.target.value));
    };

    const getRecommendations = (searchTerm) => {
        return searchNamesArr.filter(
            (recommendation) =>
                recommendation.toLowerCase().includes(searchTerm.toLowerCase()) && searchTerm !== ''
        );
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
    }

    const handleSearch = async (exercise) => {
        setSearchTerm(exercise)
    }


    return (

        <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", justifyContent: 'center' }}>
                <input className='search-bar' placeholder='Search...' type="text" value={searchTerm} onChange={handleInputChange} />
                <button type="submit" className='search-bar-button'>
                    <i class="fa-solid fa-dumbbell"></i>
                </button>
            </div>
            <div className='exercise-search' style={{ display: "flex", justifyContent: 'space-between' }}>
                <div className='search-list' >
                    {recommendations.map((recommendation, index) => (
                        <div className='search-entry' key={index} onClick={() => handleSearch(recommendation)}>{recommendation}</div>
                    ))}
                </div>
                {searchTerm && <div>
                    <div>Exercise Name: <b>{searchTerm}</b></div>
                    <div>Exercise MET: <b>{exerciseNameMetObj[searchTerm] || 0}</b></div>
                    <div>Exercise calories = (MET level of activity x 3.5 x Weight (lb) x 0.45359237 x minutes of activity) / 200</div>
                </div>}
            </div>
        </form>

    );
};

export default ExerciseSearchBar;
