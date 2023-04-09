import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "./foodDiary.css"
import { getFoodDiary, createFoodDiary, clearFoodDiary, editFoodDiary, deleteFoodEntry, editFoodEntry } from '../../../store/foodDiary';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import OpenModalButton from '../../OpenModalButton';
import FoodSearchModal from '../../FoodSearchModal/foodSearchModal';

const FoodDiary = () => {
    const [date, setDate] = useState(new Date());
    const [entries, setEntries] = useState([]);
    const [showCalender, setShowCalender] = useState(false)
    const [calenderButton, setCalenderButton] = useState('Show Calender')
    const [foodName, setFoodName] = useState('')
    const [foodAmount, setFoodAmount] = useState('')
    const [foodId, setFoodId] = useState(0)
    const [calorieAmount, setCalorieAmount] = useState('')
    const [calories, setCalories] = useState(0)
    const dispatch = useDispatch();
    // const diary = useSelector((state) => state?.searchFoodDiaryReducer)

    const payload = {
        dateObj: {
            'year': date.getFullYear(),
            'month': date.getMonth() + 1,
            'day': date.getDate()
        }
    }

    useEffect(() => {
        dispatch(getFoodDiary(payload))
            .then((res) => {
                setEntries(res?.foodEntries)
                setCalories(res?.totalCalories || 0)
            })
    }, [dispatch, date]);

    const handleModalSubmit = () => {
        dispatch(getFoodDiary(payload))
            .then((res) => {
                setEntries(res?.foodEntries)
                setCalories(res?.totalCalories)
            })
    };

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
            "name": foodName,
            "amount": foodAmount,
            "calories_per_gram": calorieAmount
        }
        dispatch(createFoodDiary(payload))
            .then((res) => {
                setEntries(res?.foodEntries)
                setCalories(res?.totalCalories)
            })
    }

    const entryDeleteHandler = (id) => {
        payload.body = {
            "id": id
        }
        dispatch(editFoodDiary(payload))
            .then((res) => {
                setEntries(res?.foodEntries)
                setCalories(res?.totalCalories)
            })
    }

    const diaryDeleteHandler = () => {
        dispatch(clearFoodDiary(payload))
        setEntries([])
        setCalories(0)
    }

    const entryEditSubmit = () => {
        payload.body = {
            "id": foodId,
            "name": foodName,
            "amount": foodAmount,
            "calories_per_gram": calorieAmount
        }
        dispatch(editFoodEntry(payload))
            .then((res) => {
                setEntries(res?.foodEntries)
                setCalories(res?.totalCalories)
            })
    }

    return (
        <div><h1>{date.toLocaleString('en-US', { month: 'long', year: 'numeric', day: 'numeric' })}</h1> {' '}
            <input type="submit" value={calenderButton} onClick={onClick} />
            {showCalender ? <Calendar className='calendar' onChange={onChange} value={date} /> : null}
            <h5></h5>
            <OpenModalButton
                buttonText="Add food from database"
                modalComponent={<FoodSearchModal onModalSubmit={handleModalSubmit} date={date} />}
            />
            <h5></h5>
            <form method='POST' onSubmit={entrySubmit}>
                <label className=''>Food Name:
                    <input
                        type="text"
                        placeholder="Food name..."
                        required
                        onChange={(e) => setFoodName(e.target.value)}
                    />
                </label>
                <label className=''>Amount:
                    <input
                        type="number"
                        placeholder="Amount in grams..."
                        required
                        step='0.01'
                        onChange={(e) => setFoodAmount(e.target.value)}
                    />
                </label>
                <label className=''>Calories per gram:
                    <input
                        type="number"
                        placeholder="Amount in kcal..."
                        required
                        step='0.01'
                        onChange={(e) => setCalorieAmount(e.target.value)}
                    />
                </label>
                <button className="" type="submit">Submit food entry</button>
            </form>
            <h5>Food Entries</h5>
            <div className='food-diary-list'>
                {entries && entries.length > 0 ? entries.map((entry, index) => {
                    return <div style={{ display: "flex", justifyContent: 'space-between' }}>
                        <div className='food-entry' key={index} >
                            {entry.name}
                        </div>
                        <div>
                            <input
                                className='food-entry-amount'
                                type="number"
                                defaultValue={entry.amount}
                                required
                                onChange={(e) => {
                                    setFoodAmount(e.target.value)
                                    setFoodId(entry.id)
                                    setFoodName(entry.name)
                                    setCalorieAmount(entry.caloriesPerGram)
                                }}
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        entryEditSubmit();
                                        e.target.blur();
                                    }
                                }}
                            />grams {' '}
                        </div>
                        <div>
                            {Math.round(entry.calories) + ' kcal'}
                            <button type="submit" onClick={() => entryDeleteHandler(entry.id)}><i class="fa-solid fa-trash-can"></i></button>
                        </div>
                    </div>

                }) : <>No food entries for this date.</>}
            </div>
            <button type="submit" onClick={() => diaryDeleteHandler()}>Clear Diary</button>
            <h1>Calories consumed: {Math.round(calories)}</h1>
        </div>
    );
};

export default FoodDiary;
