import React, {createContext, useContext, useState} from 'react'

const SessionContext = createContext()

export const SessionProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const login = (userData) => {
        setUser(userData)
    }
    const logout = () => setUser(null)

    return (
        <SessionContext.Provider value={{user, login, logout}}>
            {children}
        </SessionContext.Provider>
    )
}


export const useSession = () => {
    const context = useContext(SessionContext)
    if(!context){
        throw new Error('useSession must be used within a SessionProvider')
    }

    return context
}