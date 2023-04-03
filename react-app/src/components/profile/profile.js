import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getProfile, editProfile } from '../../store/profile';


const UserProfile = () => {
    const sessionUserProfile = useSelector(state => state?.session.profileReducer);
    const [feet, setFeet] = useState(0)
    const [inch, setInch] = useState(0)
    const [gender, setGender] = useState('')
    const [birthday, setBirthday] = useState()
    const [weight, setWeight] = useState()
    const [bodyfat, setBodyfat] = useState()
    const [weightGoalRate, setWeightGoalRate] = useState();
    const [bmi, setBmi] = useState()
    const [bmr, setBmr] = useState()
    const [activity, setActivity] = useState()
    const [activityCalories, setActivityCalories] = useState()
    const [weightGoal, setWeightGoal] = useState()
    const [weightGoalCalories, setWeightGoalCalories] = useState()
    const [proteinTarget, setProteinTarget] = useState()
    const [carbTarget, setCarbTarget] = useState()
    const [fatTarget, setFatTarget] = useState()
    const [age, setAge] = useState()
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
                setBmi(res.bodyMassIndex)
                setBmr(res.basalMetabolicRate)
                setActivity(res.activityLevel)
                setActivityCalories(res.activityCalories)
                setWeightGoal(res.weightGoal)
                setWeightGoalCalories(res.weightGoalCalories)
                setProteinTarget(res.proteinRatio)
                setCarbTarget(res.carbohydrateRatio)
                setFatTarget(res.fatRatio)
                setAge(res.age)
            })
    }, [dispatch])

    const genderHandler = (e) => {
        setGender(e.target.value)
    }
    const weightHandler = (e) => {
        setWeight(e.target.value)
    }
    const birthdayHandler = (e) => {
        setBirthday(e.target.value)
    }
    const bodyfatHandler = (e) => {
        setBodyfat(e.target.value)
    }
    const weightGoalHandler = (e) => {
        setWeightGoal(e.target.value)
    }
    const weightGoalRateChange = (e) => {
        setWeightGoalRate(e.target.value);
    };

    const entrySubmit = (e) => {
        // e.prevent.default()
        const payload = {
            body: {
                "height_in_inches": feet * 12 + inch,
                "sex": gender,
                "birthday": birthday,
                "weight_in_pounds": weight,
                "body_fat": bodyfat,
                "weight_goal_rate": weightGoalRate,
                "activity_level": activity,
                "weight_goal": weightGoal,
                "protein_ratio": proteinTarget,
                "carbohydrate_ratio": carbTarget,
                "fat_ratio": fatTarget
            }
        }
        dispatch(editProfile(payload))
    }

    return (
        <>
            <form onSubmit={entrySubmit}>
                <div onChange={genderHandler} style={{ display: "flex", justifyContent: 'space-between' }}>Sex
                    <label><input type='radio' name='sex' value='male' checked={gender === 'male'}></input>Male</label>
                    <label><input type='radio' name='sex' value='female' checked={gender === 'female'}></input>Female</label>
                </div>
                <div style={{ display: "flex", justifyContent: 'space-between' }}>Birthday
                    <label><input onChange={birthdayHandler} type='date' defaultValue={birthday}></input></label>
                </div>
                <div style={{ display: "flex", justifyContent: 'space-between' }}>Age
                    <label>{age}{' years old'}</label>
                </div>
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
                <div style={{ display: "flex", justifyContent: 'space-between' }}>Current Weight
                    <label><input onChange={weightHandler} type='number' step='0.1' defaultValue={weight}></input></label>
                </div>
                <div style={{ display: "flex", justifyContent: 'space-between' }}>Body Fat %
                    <label><input onChange={bodyfatHandler} type='number' step='0.1' defaultValue={bodyfat}></input></label>
                </div>
                <div style={{ display: "flex", justifyContent: 'space-between' }}>Body Mass Index
                    <label>{bmi}</label>
                </div>
                <div style={{ display: "flex", justifyContent: 'space-between' }}>Basal Metabolic Rate
                    <label>{bmr}{" kcal"}</label>
                </div>
                <div style={{ display: "flex", justifyContent: 'space-between' }}>Activity Level
                    <label>{activityCalories} {" kcal"}
                    </label>
                    <label>
                        <select value={activity} onChange={(e) => { setActivity(e.target.value) }}>
                            {["sedentary", "lightly_active", "moderately_active", "very_active"].map((ele, index) => {
                                return <option value={ele}>{ele}</option>
                            })}
                        </select>
                    </label>
                </div>
                <div style={{ display: "flex", justifyContent: 'space-between' }}>Total Energy Burned without exercise
                    <label>{bmr + activityCalories}{" kcal"}</label>
                </div>
                <div style={{ display: "flex", justifyContent: 'space-between' }}>Weight Goal
                    <label><input onChange={weightGoalHandler} type='number' step='0.1' defaultValue={weightGoal}></input></label>
                </div>
                <div style={{ display: "flex", justifyContent: 'space-between' }}>
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
                    {weightGoalCalories}{' kcal daily'}
                </div>
                <div style={{ display: "flex", justifyContent: 'space-between' }}>Protein Target %
                    <label><input onChange={(e) => { setProteinTarget(e.target.value) }} type='number' defaultValue={proteinTarget}></input></label>
                </div>
                <div style={{ display: "flex", justifyContent: 'space-between' }}>Carbohydrate Target %
                    <label><input onChange={(e) => { setCarbTarget(e.target.value) }} type='number' defaultValue={carbTarget}></input></label>
                </div>
                <div style={{ display: "flex", justifyContent: 'space-between' }}>Fat Target %
                    <label><input onChange={(e) => { setFatTarget(e.target.value) }} type='number' defaultValue={fatTarget}></input></label>
                </div>
                <div style={{ display: "flex", justifyContent: 'space-between' }}>Daily calorie goal without exercise
                    <label>{bmr + activityCalories + weightGoalCalories}{" kcal"}</label>
                </div>
                <button className="" type="submit">Submit edit profile</button>
            </form>
        </>
    );
};

export default UserProfile;
