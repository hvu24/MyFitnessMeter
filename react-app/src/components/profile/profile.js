import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getProfile } from '../../store/profile';


const UserProfile = () => {
    const sessionUserProfile = useSelector(state => state?.session.profileReducer);
    const [feet, setFeet] = useState(0)
    const [inch, setInch] = useState(0)
    const [gender, setGender] = useState('')
    const [birthday, setBirthday] = useState()
    const [weight, setWeight] = useState()
    const [bodyfat, setBodyfat] = useState()
    const [weightGoalRate, setWeightGoalRate] = useState();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProfile())
            .then((res) => {
                setInch(res.heightInInches % 12)
                setFeet(Math.floor(res.heightInInches / 12))
                setGender(res.sex)
                const date = new Date(res.birthday)
                setBirthday(date.toISOString().substring(0, 10))
                setWeight(res.weightInPounds)
                setBodyfat(res.bodyFat)
                setWeightGoalRate(res.weightGoalRate)
            })
    }, [dispatch])

    const genderHandler = (e) => {
        setGender(e.target.value)
    }
    const weightGoalRateChange = (e) => {
        setWeightGoalRate(e.target.value);
    };

    return (
        <>
            <form>
                <div style={{ display: "flex", justifyContent: 'space-between' }}>{"Height "}
                    <label>feet
                        <select value={feet} onChange={(e) => { setFeet(e.target.value) }}>
                            {[...Array(8)].map((ele, index) => {
                                return <option value={index + 1}>{index + 1}</option>
                            })}
                        </select>
                    </label>
                    <label>inch
                        <select value={inch} onChange={(e) => { setInch(e.target.value) }}>
                            {[...Array(12)].map((ele, index) => {
                                return <option value={index}>{index}</option>
                            })}
                        </select>
                    </label>
                </div>
                <div onChange={genderHandler} style={{ display: "flex", justifyContent: 'space-between' }}>Sex
                    <label><input type='radio' name='sex' value='male' checked={gender === 'male'}></input>Male</label>
                    <label><input type='radio' name='sex' value='female' checked={gender === 'female'}></input>Female</label>
                </div>
                <div style={{ display: "flex", justifyContent: 'space-between' }}>Birthday
                    <label><input type='date' defaultValue={birthday}></input></label>
                </div>
                <div style={{ display: "flex", justifyContent: 'space-between' }}>Current Weight
                    <label><input type='number' step='0.1' defaultValue={weight}></input></label>
                </div>
                <div style={{ display: "flex", justifyContent: 'space-between' }}>Body Fat %
                    <label><input type='number' step='0.1' defaultValue={bodyfat}></input></label>
                </div>
                <div>
                    <label>
                        Weight Goal Rate:
                        <input
                            type="range"
                            min="-2"
                            max="2"
                            step='0.25'
                            value={weightGoalRate}
                            onChange={weightGoalRateChange}
                        />
                        {weightGoalRate}lbs / week
                    </label>
                </div>
            </form>
        </>
    );
};

export default UserProfile;
