import axios from "axios";
axios.defaults.withCredentials = true
const api = import.meta.env.VITE_API_URL

window.$post = async (route, details) => {
    try{
        const result = await axios.post(`${api}/${route}`, details, {withCredentials: true})
        return result
    }
    catch(err){
        console.log(`Error: ${err.message}`)
    }
}

window.$get = async (route, details) => {
    try{
        const result = await axios.get(`${api}/${route}`, details, {withCredentials: true})
        return result
    }
    catch(err){
        console.log(`Error: ${err.message}`)
    }
}

window.capitalizedWords = (str) => {
    return str.toLowerCase().split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}



