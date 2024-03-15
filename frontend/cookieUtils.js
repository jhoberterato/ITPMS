import Cookies from "universal-cookie"

const cookies = new Cookies()

export const setAuthToken = (token) => {
    cookies.set('authToken', token, {path: '/', secure: true, httpOnly: true})
    
}

export const getAuthToken = () => {
    return cookies.get('authToken')
}

export const removeAuthToken = () => {
    cookies.remove('authToken', {path: '/'})
}