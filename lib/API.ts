import axios from "axios"


const  server =  axios.create({
    baseURL: "/api",
    withCredentials: true,
    timeout: 10000,
    headers:{
"Content-Type": "application/json"
    }
})

export default server;