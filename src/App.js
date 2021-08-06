import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import "./globalStyles.css"
import MobileNote from "./pages/mobileNote/MobileNote"
import SignUp from "./pages/signup/SignUp"
import SignIn from "./pages/signin/SignIn"
import Studio from "./pages/studio/Studio"

export default function App() {
    const mobile =
        !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
        )
    return (
        <>
            {mobile ? (
                <BrowserRouter>
                    <Switch>
                        <Route path={"/signup"}>
                            <SignUp />
                        </Route>
                        <Route path={"/signin"}>
                            <SignIn />
                        </Route>
                        <Route path={"/"}>
                            <Studio />
                        </Route>
                    </Switch>
                </BrowserRouter>
            ) : (
                <MobileNote />
            )}
        </>
    )
}
