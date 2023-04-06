import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "./exerciseDiary.css"
import { getExerciseDiary, createExerciseDiary, clearExerciseDiary, editExerciseDiary, deleteExerciseEntry, editExerciseEntry } from '../../../store/exerciseDiary';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import OpenModalButton from '../../OpenModalButton';
import ExerciseSearchModal from '../../ExerciseSearchModal/exerciseSearchModal';
import { getFoodDiary } from '../../../store/foodDiary';

const ExerciseDiary = () => {
    const [date, setDate] = useState(new Date());
    const [entries, setEntries] = useState([]);
    const [showCalender, setShowCalender] = useState(false)
    const [calenderButton, setCalenderButton] = useState('Show Calender')
    const [exerciseName, setExerciseName] = useState('')
    const [exerciseAmount, setExerciseAmount] = useState('')
    const [exerciseId, setExerciseId] = useState(0)
    const dispatch = useDispatch();


    const payload = {
        dateObj: {
            'year': date.getFullYear(),
            'month': date.getMonth() + 1,
            'day': date.getDate()
        }
    }

    useEffect(() => {
        dispatch(getExerciseDiary(payload))
            .then((res) => {
                setEntries(res?.exerciseEntries)
            })
    }, [dispatch, date]);

    // const handleModalSubmit = () => {
    //     dispatch(getExerciseDiary(payload))
    //         .then((res) => {
    //             setEntries(res?.exerciseEntries)
    //         })
    // };

    const onClick = () => {
        setShowCalender(!showCalender)
        if (showCalender === false) {
            setCalenderButton('Hide Calendar')
        }
        if (showCalender === true) {
            setCalenderButton('Show Calendar')
        }
    }

    const onChange = (date) => {
        setDate(date);
    };

    const entrySubmit = (e) => {
        e.preventDefault();
        payload.body = {
            "name": exerciseName,
            "amount": exerciseAmount
        }
        dispatch(createExerciseDiary(payload))
            .then((res) => {
                setEntries(res?.exerciseEntries)
            })
    }

    const entryDeleteHandler = (id) => {
        payload.body = {
            "id": id
        }
        dispatch(editExerciseDiary(payload))
            .then((res) => {
                setEntries(res?.exerciseEntries)
            })
    }

    const diaryDeleteHandler = () => {
        dispatch(clearExerciseDiary(payload))
        setEntries([])
    }

    const entryEditSubmit = () => {
        payload.body = {
            "id": exerciseId,
            "name": exerciseName,
            "amount": exerciseAmount
        }
        dispatch(editExerciseEntry(payload))
            .then((res) => {
                setEntries(res?.exerciseEntries)
            })
    }

    const handleModalSubmit = () => {
        dispatch(getExerciseDiary(payload))
            .then((res) => {
                setEntries(res?.exerciseEntries)
            })
    };

    return (
        <div><h1>{date.toLocaleString('en-US', { month: 'long', year: 'numeric', day: 'numeric' })}</h1> {' '}
            <input type="submit" value={calenderButton} onClick={onClick} />
            {showCalender ? <Calendar className='calendar' onChange={onChange} value={date} /> : null}
            <h5></h5>
            <OpenModalButton
                buttonText="Add exercise from database"
                modalComponent={<ExerciseSearchModal onModalSubmit={handleModalSubmit} date={date} />}
            />
            <h5></h5>
            <form method='POST' onSubmit={entrySubmit}>
                <label className=''>Exercise Name:
                    <input
                        type="text"
                        placeholder="Exercise name..."
                        required
                        onChange={(e) => setExerciseName(e.target.value)}
                    />
                </label>
                <label className=''>Amount:
                    <input
                        type="number"
                        placeholder="Amount in minutes..."
                        required
                        onChange={(e) => setExerciseAmount(e.target.value)}
                    />
                </label>
                <button className="" type="submit">Submit exercise entry</button>
            </form>
            <h5>Exercise Entries</h5>
            <div className='exercise-diary-list'>
                {entries && entries.length > 0 ? entries.map((entry, index) => (
                    <div className='exercise-entry' key={index} >
                        {entry.name}
                        <div>
                            <input
                                className='exercise-entry-amount'
                                type="number"
                                // placeholder={entry.amount}
                                defaultValue={entry.amount}
                                required
                                onChange={(e) => {
                                    setExerciseAmount(e.target.value)
                                    setExerciseId(entry.id)
                                    setExerciseName(entry.name)
                                }}
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        entryEditSubmit();
                                        e.target.blur();
                                    }
                                }}
                            />minutes {' '}
                            <button type="submit" onClick={() => entryDeleteHandler(entry.id)}><i class="fa-solid fa-trash-can"></i></button>
                        </div>
                    </div>
                )) : <>No exercise entries for this date.</>}
            </div>
            <button type="submit" onClick={() => diaryDeleteHandler()}>Clear Diary</button>
        </div>
    );
};

export default ExerciseDiary;
