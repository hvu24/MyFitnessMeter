import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import "./SearchBar.css"
import { getSearchExercises } from '../../../store/exerciseSearch';
import { getExerciseDetails } from '../../../store/exerciseDetails';

const ExerciseSearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [exercises, setExercises] = useState({});
    const dispatch = useDispatch();
    const history = useHistory()

    useEffect(() => {
        // dispatch(getSearchExercises(searchTerm))
    }, [dispatch, searchTerm]);

    const handleInputChange = async (event) => {
        setSearchTerm(event.target.value);
        // console.log('logging searchTerm from input change', searchTerm)
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = await dispatch(getSearchExercises(searchTerm))
        if (data) setExercises(data)
    }

    const handleSearch = async (exercise) => {
        // setSearchTerm(exercise)
        const payload = {
            "query": exercise
        }
        console.log(await dispatch(getExerciseDetails(payload)))
    }


    return (

        <form onSubmit={handleSubmit}>
            <input className='search-bar' placeholder='Search...' type="text" value={searchTerm} onChange={handleInputChange} />
            <button type="submit" className='search-bar-button'>
                <i class="fa-solid fa-utensils"></i>
            </button>
            {exercises && exercises[0] && <h5>Exercises</h5>}
            <div className='search-common-list'>
                {exercises && exercises[0] && exercises?.map((exercise, index) => (
                    <div className='search-entry' key={index} onClick={() => handleSearch(exercise.name)}>{exercise.name}</div>
                ))}
            </div>
        </form>

    );
};

export default ExerciseSearchBar;
