import { useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { Link, useHistory } from "react-router-dom"
import Button from "../../components/button/Button"
import Container from "../../components/container/Container"
import Divider from "../../components/divider/Divider"
import InputText from "../../components/inputText/InputText"
import Navbar from "../../components/navbar/Navbar"
import styles from "./signin.module.css"
// import app from "../../constants/firebase"
// import firebase from "firebase/app"

const SignIn = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const history = useHistory()

    const handleSignin = (e) => {
        e.preventDefault()
        console.log("submitting")
        app.auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                setEmail("")
                setPassword("")
                // Redirect
                history.push("/")
            })
            .catch((err) => window.alert(err))
    }

    const handleGoogleSignin = () => {
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
            <div className={styles.signin_wrapper}>
                <div className={styles.image} />
                <div className={styles.container}>
                    <Container title="Sign In">
                        <Button
                            type="ghost"
                            icon={<FcGoogle />}
                            text="Sign in with Google"
                            onClick={handleGoogleSignin}
                        />
                        <Divider text="Or" />
                        <form onSubmit={handleSignin}>
                            <InputText
                                id="email"
                                type="email"
                                label="Email"
                                onChange={setEmail}
                                value={email}
                                style={{ marginBottom: "10px" }}
                            />
                            <InputText
                                id="password"
                                type="password"
                                label="Password"
                                onChange={setPassword}
                                value={password}
                                style={{ marginBottom: "10px" }}
                            />
                            <Button type="filled" text="Sign In" />
                        </form>
                    </Container>
                    <div className={styles.sub}>
                        <div className={styles.sub_inner}>
                            <p>Don't have an account, yet?</p>
                            <Link to="/signup">Sign up</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Navbar absolute />
        </>
    )
}

export default SignIn
