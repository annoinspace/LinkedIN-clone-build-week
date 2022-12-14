export const GET_USERS = "GET_USERS";
export const GET_EXPERIENCES = "GET_EXPERIENCES";

export const GET_MY_PROFILEDETAILS = "GET_MY_PROFILEDETAILS";
export const GET_IS_FETCHED = "GET_IS_FETCHED";
export const CHANGE_PROFILE_DETAILS = "CHANGE_PROFILE_DETAILS";
export const UPDATE_STATE_OF_EXPERIENCES = "UPDATE_STATE_OF_EXPERIENCES";

//constants to use for fetching data

const baseEndPoint = "https://striveschool-api.herokuapp.com/api/profile/";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzk2ZjAxM2M5NmRmYjAwMTUyMWE1YmEiLCJpYXQiOjE2NzA4MzYyNDMsImV4cCI6MTY3MjA0NTg0M30.y7kED45MhN6V7jWF7PwyZ4DryRe6OJ6b9-so68M-zaE",
    "Content-Type": "application/json",
  },
};

// action to get the info of users from the api

export const getUsersAction = () => {
  return async (dispatch) => {
    console.log("----------------fetching Users---------------------");

    try {
      let resp = await fetch(baseEndPoint, options);
      if (resp.ok) {
        let data = await resp.json();
        let fetchedUsers = data;

        console.log("Users are ->", fetchedUsers);
        dispatch({
          type: GET_USERS,
          payload: fetchedUsers,
        });
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

//action for getting the experiences

//change the userId with the original one from Redux State

export const getExperiencesAction = (userId) => {
  const experiencesUrl = `https://striveschool-api.herokuapp.com/api/profile/${userId}/experiences`;
  console.log("userID", userId);
  const getOptions = {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzk2ZjAxM2M5NmRmYjAwMTUyMWE1YmEiLCJpYXQiOjE2NzA4MzYyNDMsImV4cCI6MTY3MjA0NTg0M30.y7kED45MhN6V7jWF7PwyZ4DryRe6OJ6b9-so68M-zaE",
    },
  };
  console.log("fetching experiences - GET method");
  return async (dispatch) => {
    try {
      let response = await fetch(experiencesUrl, getOptions);
      if (response.ok) {
        let data = await response.json();
        console.log(
          "data from ----------experiences--------- fetch with GET method",
          data
        );
        dispatch({
          type: GET_EXPERIENCES,
          payload: data,
        });
      } else {
        console.log("en error occured while fetching the experiences");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// get My Profile Details Fetching Action

const baseUrlMe = "https://striveschool-api.herokuapp.com/api/profile/me";

export const getMyProfileDetailsAction = () => {
  return async (dispatch) => {
    console.log(
      "----------------fetching My Profile Details---------------------"
    );

    try {
      let response = await fetch(baseUrlMe, options);
      if (response.ok) {
        let data = await response.json();
        let myProfileDetailsData = data;

        console.log("My Profile Details are ->", myProfileDetailsData);
        dispatch({
          type: GET_MY_PROFILEDETAILS,
          payload: myProfileDetailsData,
        });
        dispatch({
          type: GET_IS_FETCHED,
          payload: true,
        });
      } else {
        console.log("error fetching data");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// Change Profile Details Fetching Action

export const changeProfileDetailsAction = (details) => {
  console.log("🚀 changeProfileDetailsAction ~ details", details);

  return async (dispatch) => {
    const optionsPut = {
      method: "PUT",
      body: JSON.stringify(details),
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzk2ZjAxM2M5NmRmYjAwMTUyMWE1YmEiLCJpYXQiOjE2NzA4MzYyNDMsImV4cCI6MTY3MjA0NTg0M30.y7kED45MhN6V7jWF7PwyZ4DryRe6OJ6b9-so68M-zaE",
        "Content-Type": "application/json",
      },
    };
    console.log(
      "----------------CHANGING My Profile Details------------------"
    );

    try {
      let response = await fetch(baseEndPoint, optionsPut);
      if (response.ok) {
        console.log("Profile Details sucessfully updated ->", response);
      } else {
        console.log("Error changing profile details");
      }
    } catch (error) {
      console.log("🚀 error", error);
    }
  };
};

//POST method for experience modal

export const addExperienceAction = (experience, userId) => {
  const postUrl = `https://striveschool-api.herokuapp.com/api/profile/:${userId}/experiences`;
  console.log("----------add experience-----------");
  return async (dispatch) => {
    const optionsPost = {
      method: "POST",
      body: JSON.stringify(experience),
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzk2ZjAxM2M5NmRmYjAwMTUyMWE1YmEiLCJpYXQiOjE2NzA4MzYyNDMsImV4cCI6MTY3MjA0NTg0M30.y7kED45MhN6V7jWF7PwyZ4DryRe6OJ6b9-so68M-zaE",
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(postUrl, optionsPost);
      if (response.ok) {
        console.log("new experience added successfully!");
        dispatch({
          type: UPDATE_STATE_OF_EXPERIENCES,
          payload: true,
        });
      } else {
        console.log(
          "sorry, an error occured while trying to add a new experience"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
};
