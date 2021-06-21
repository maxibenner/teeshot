import { useEffect, useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { Link, useHistory } from "react-router-dom"
import Button from "../../components/button/Button"
import Container from "../../components/container/Container"
import Divider from "../../components/divider/Divider"
import InputText from "../../components/inputText/InputText"
import Navbar from "../../components/navbar/Navbar"
import styles from "./signup.module.css"
// import app from "../../constants/firebase"
// import firebase from "firebase/app"
// import useAuth from "../../constants/useAuth"

const SignUp = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const user = useAuth()

    useEffect(() => {
        console.log(user)
    }, [user])

    const history = useHistory()

    const handleSignUp = (e) => {
        e.preventDefault()
        console.log("submitting")
        app.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                setEmail("")
                setPassword("")
                // Redirect
                history.push("/")
            })
            .catch((err) => window.alert(err))
    }

    const handleGoogleSignup = () => {
        var provider = new firebase.auth.GoogleAuthProvider()
        app.auth()
            .signInWithPopup(provider)
            .then(() => {
                setEmail("")
                setPassword("")
                // Redirect
                history.push("/")
            })
            .catch((err) => window.alert(err))
    }

    return (
        <>
            <div className={styles.signup_wrapper}>
                <div className={styles.image} />
                <div className={styles.container}>
                    <Container title="Sign Up">
                        <Button
                            type="ghost"
                            icon={<FcGoogle />}
                            text="Sign up with Google"
                            onClick={handleGoogleSignup}
                        />
                        <Divider text="Or" />
                        <form onSubmit={handleSignUp}>
                            <InputText
                                id="email"
                                type="email"
                                label="Email"
                                value={email}
                                onChange={setEmail}
                                style={{ marginBottom: "10px" }}
                            />
                            <InputText
                                id="password"
                                type="password"
                                label="Password"
                                value={password}
                                onChange={setPassword}
                                style={{ marginBottom: "10px" }}
                            />
                            <Button type="filled" text="Create Account" />
                        </form>
                    </Container>
                    <div className={styles.sub}>
                        <div className={styles.sub_inner}>
                            <p>Already have an account?</p>
                            <Link to="/signin">Sign in</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Navbar absolute />
        </>
    )
}

export default SignUp
