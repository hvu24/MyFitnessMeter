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
            })
    }, [dispatch, date]);

    const handleModalSubmit = () => {
        dispatch(getFoodDiary(payload))
            .then((res) => {
                setEntries(res?.foodEntries)
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
            "amount": foodAmount
        }
        dispatch(createFoodDiary(payload))
            .then((res) => {
                setEntries(res?.foodEntries)
            })
    }

    const entryDeleteHandler = (id) => {
        payload.body = {
            "id": id
        }
        dispatch(editFoodDiary(payload))
            .then((res) => {
                setEntries(res?.foodEntries)
            })
    }

    const diaryDeleteHandler = () => {
        dispatch(clearFoodDiary(payload))
        setEntries([])
    }

    const entryEditSubmit = () => {
        payload.body = {
            "id": foodId,
            "name": foodName,
            "amount": foodAmount
        }
        dispatch(editFoodEntry(payload))
            .then((res) => {
                setEntries(res?.foodEntries)
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
                        onChange={(e) => setFoodAmount(e.target.value)}
                    />
                </label>
                <button className="" type="submit">Submit food entry</button>
            </form>
            <h5>Food Entries</h5>
            <div className='food-diary-list'>
                {entries && entries.length > 0 ? entries.map((entry, index) => (
                    <div className='food-entry' key={index} >
                        {entry.name}
                        <div>
                            <input
                                className='food-entry-amount'
                                type="number"
                                // placeholder={entry.amount}
                                defaultValue={entry.amount}
                                required
                                onChange={(e) => {
                                    setFoodAmount(e.target.value)
                                    setFoodId(entry.id)
                                    setFoodName(entry.name)
                                }}
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        entryEditSubmit();
                                        e.target.blur();
                                    }
                                }}
                            />grams {' '}
                            <button type="submit" onClick={() => entryDeleteHandler(entry.id)}><i class="fa-solid fa-trash-can"></i></button>
                        </div>
                    </div>
                )) : <>No food entries for this date.</>}
            </div>
            <button type="submit" onClick={() => diaryDeleteHandler()}>Clear Diary</button>
        </div>
    );
};

export default FoodDiary;
