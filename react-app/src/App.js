import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import FoodSearchBar from "./components/Food/FoodSearch/foodSearch";
import ExerciseSearchBar from "./components/Exercise/ExerciseSearch/exerciseSearch";
import FoodDiary from "./components/Food/FoodDiary/foodDiary";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UserProfile from "./components/profile/profile";
import ExerciseDiary from "./components/Exercise/ExerciseDiary/exerciseDiary";
import Footer from "./components/Footer/footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from "./components/HomePage";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/" >
            <HomePage/>
            <Footer/>
          </Route>
          <Route path="/login" >
            <LoginFormPage />
            <Footer/>
          </Route>
          <Route path="/signup">
            <SignupFormPage />
            <Footer/>
          </Route>
          <Route path="/food/search">
            <FoodSearchBar />
            <Footer/>
          </Route>
          {/* <Route path="/exercise/search">
            <ExerciseSearchBar />
          </Route> */}
          <Route path='/food/diary'>
            <ProtectedRoute>
              <FoodDiary />
              <Footer/>
            </ProtectedRoute>
          </Route>
          <Route path='/exercise/diary'>
            <ProtectedRoute>
              <ExerciseDiary />
              <Footer/>
            </ProtectedRoute>
          </Route>
          <Route path='/profile'>
            <ProtectedRoute>
              <UserProfile />
              <Footer/>
            </ProtectedRoute>
          </Route>
        </Switch>
      )}

    </>
  );
}

export default App;
