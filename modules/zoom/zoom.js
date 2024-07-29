const jwt = require("jsonwebtoken")
const axios = require("axios").default


//Use the ApiKey and APISecret from config.js
const payload = {
  iss: process.env.ZOOM_API_KEY,
  exp: new Date().getTime() + 5000,
}
const token = jwt.sign(payload, process.env.ZOOM_API_SECRET)

const createUser = (userInfo, callback) => {

  const options = {
    method: "POST",
    url: "https://api.zoom.us/v2/users",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    data: {
      action: "custCreate",
      user_info: userInfo,
    },
    json: true,
  }
  axios(options)
    .then(function (response) {
      console.log("response", response)
      const{ id, first_name, last_name} = response.data
      return callback({id})
    }).catch(function ({response}) {
      //handle error
      return callback({error: response})
    })
}

const getUser = (email) => {
  return new Promise((resolve, reject) => {
    let options = {
      method: "GET",
      // A non-existing sample userId is used in the example below.
      url: `https://api.zoom.us/v2/users/${email}`,
      headers: {
        "User-Agent": "Zoom-api-Jwt-Request",
        "content-type": "application/json",
        authorization: `Bearer ${token}`, // Do not publish or share your token publicly.
      },
    }
    axios(options)
      .then(function (response) {
        resolve(response.data)
      })
      .catch(function (response) {
        //handle error
        reject({error: response.data.message})
      })
  })
}

const newMeeting = async (meetingData, id) => {
  const options = {
    method: "POST",
    url: `https://api.zoom.us/v2/users/${id}/meetings`,
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    data: meetingData,
    json: true,
  }
  return axios(options).then( function (response, body) {
    return response.data 
  }).catch(function (error){
    //handle error
    return new Error("Unable to create meeting", error)
  })
}

module.exports = { createUser, getUser, newMeeting}