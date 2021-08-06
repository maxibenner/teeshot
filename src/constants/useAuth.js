import { auth } from "./firebase"
import { useEffect, useState } from "react"

const useAuth = () => {
    const [authUser, setAuthUser] = useState(null)

    useEffect(() => {
        const unlisten = auth.onAuthStateChanged((authUser) => {
            authUser ? setAuthUser(authUser) : setAuthUser(null)
        })
        return () => {
            unlisten()
        }
    })

    return authUser
}

export default useAuth
