import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "./exerciseDiary.css"
import { getExerciseDiary, createExerciseDiary, clearExerciseDiary, editExerciseDiary, deleteExerciseEntry, editExerciseEntry } from '../../../store/exerciseDiary';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import OpenModalButton from '../../OpenModalButton';
import ExerciseSearchModal from '../../ExerciseSearchModal/exerciseSearchModal';
import { getProfile } from '../../../store/profile';

const ExerciseDiary = () => {
    const [date, setDate] = useState(new Date());
    const [entries, setEntries] = useState([]);
    const [showCalender, setShowCalender] = useState(false)
    const [calenderButton, setCalenderButton] = useState('Show Calender')
    const [exerciseName, setExerciseName] = useState('')
    const [exerciseAmount, setExerciseAmount] = useState('')
    const [exerciseId, setExerciseId] = useState(0)
    const [calories, setCalories] = useState(0)
    const [weight, setWeight] = useState(0)
    const [mets, setMets] = useState(0)
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
                setCalories(res?.totalCalories || 0)
            })
        dispatch(getProfile())
            .then((res) => {
                if (res.id) {
                    setWeight(res?.weightInPounds)
                }
            })
        // dispatch(getExerciseDiary(payload))
        //     .then((res) => {
        //         setEntries(res?.exerciseEntries)
        //         setCalories(res?.totalCalories || 0)
        //     })
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
            "amount": exerciseAmount,
            // 'calories': ((mets * 3.5 * weight * 0.45359237 * exerciseAmount) / 200),
            'mets': mets
        }
        dispatch(createExerciseDiary(payload))
            .then((res) => {
                setEntries(res?.exerciseEntries)
                setCalories(res?.totalCalories || 0)
            })
    }

    const entryDeleteHandler = (id) => {
        payload.body = {
            "id": id
        }
        dispatch(editExerciseDiary(payload))
            .then((res) => {
                setEntries(res?.exerciseEntries)
                setCalories(res?.totalCalories || 0)
            })
    }

    const diaryDeleteHandler = () => {
        dispatch(clearExerciseDiary(payload))
        setEntries([])
        setCalories(0)
    }

    const entryEditSubmit = () => {
        payload.body = {
            "id": exerciseId,
            "name": exerciseName,
            "amount": exerciseAmount,
            // 'calories': ((mets * 3.5 * weight * 0.45359237 * exerciseAmount) / 200),
            'mets': mets
        }
        dispatch(editExerciseEntry(payload))
            .then((res) => {
                setEntries(res?.exerciseEntries)
                setCalories(res?.totalCalories || 0)
            })
    }

    const handleModalSubmit = () => {
        dispatch(getExerciseDiary(payload))
            .then((res) => {
                setEntries(res?.exerciseEntries)
                setCalories(res?.totalCalories || 0)
            })
    };

    return (
        <div className='exercise-diary-background'>
            <div className='exercise-diary-div'>
                <h1>{date.toLocaleString('en-US', { month: 'long', year: 'numeric', day: 'numeric' })}</h1> {' '}
                <input className='calendar-button' type="submit" value={calenderButton} onClick={onClick} />
                {showCalender ? <Calendar className='calendar' onChange={onChange} value={date} /> : null}
                <h5></h5>
                <div className='add-exercise'>
                    <OpenModalButton
                        buttonText="Add exercise from database"
                        modalComponent={<ExerciseSearchModal onModalSubmit={handleModalSubmit} date={date} />}
                    />
                </div>
                <h5></h5>
                <form method='POST' onSubmit={entrySubmit}>
                    <label className=''>Exercise Name:
                        <input
                            type="text"
                            placeholder="Exercise name..."
                            required
                            onChange={(e) => setExerciseName(e.target.value)}
                        />
                    </label>{' '}
                    <label className=''>Amount:
                        <input
                            type="number"
                            placeholder="Amount in minutes..."
                            required
                            onChange={(e) => setExerciseAmount(e.target.value)}
                        />
                    </label>{' '}
                    <label className=''>MET:
                        <input
                            type="number"
                            placeholder="Set MET score..."
                            required
                            step='0.1'
                            onChange={(e) => setMets(e.target.value)}
                        />
                    </label>
                    <button className='exercise-entry-button' type="submit">Submit exercise entry</button>
                </form>
                <h5>Exercise Entries</h5>
                <div className='exercise-diary-list'>
                    {entries && entries.length > 0 ? entries.map((entry, index) => {
                        return <div style={{ display: "flex", justifyContent: 'space-between' }}>
                            <div style={{ width: '234px', height: '100%' }} className='exercise-entry' key={index} >
                                {entry.name}
                            </div>
                            <div style={{ width: '234px', height: '100%', display: 'flex', justifyContent: 'center' }}>
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
                                        setMets(entry.mets)
                                    }}
                                    onKeyPress={(e) => {
                                        if (e.key === "Enter") {
                                            entryEditSubmit();
                                            e.target.blur();
                                        }
                                    }}
                                />minutes {' '}
                            </div>
                            <div style={{ width: '234px', height: '100%', display: 'flex', justifyContent: 'right' }}>
                                {Math.round(entry.calories)}{' kcal'}<button type="submit" onClick={() => entryDeleteHandler(entry.id)}><i class="fa-solid fa-trash-can"></i></button>
                            </div>

                        </div>
                    }) : <>No exercise entries for this date.</>}
                </div>
                <button className='clear-diary' type="submit" onClick={() => diaryDeleteHandler()}>Clear Diary</button>
                <h1>Calories burned: {Math.round(calories)}</h1>
            </div>
        </div>
    );
};

export default ExerciseDiary;
