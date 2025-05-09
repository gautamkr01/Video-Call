import React from 'react'
import "../App.css"
import { Link, useNavigate } from 'react-router-dom'
export default function LandingPage() {


    const router = useNavigate();

    return (
        <div className='landingPageContainer'>
            <nav>
                <div className='navHeader'>
                    <h2>Easy Meet</h2>
                    
                </div>
                <div className='navlist'>
                    <p onClick={() => {
                        router("/gautamkr")
                    }}>Join as Guest</p>
                    <p onClick={() => {
                        router("/auth")

                    }}>Register</p>
                    <div onClick={() => {
                        router("/auth")

                    }} role='button'>
                        <p>Login</p>
                    </div>
                </div>
            </nav>


            <div className="landingMainContainer">
                <div>
                    <h1><span style={{ color: "#FF9839"}}>Connect</span> with your loved Ones</h1>

                    <p style={{paddingTop: "1rem"}}>Cover a distance by Easy Meet Video Call </p>
                    
                    <div role='button' className='getStarted'>
                        <Link to={"/auth"}>Get Started</Link>
                    </div>
                </div>
                <div className='mobileImage'>

                    <img src="/mobile.png" alt="" />

                </div>
            </div>



        </div>
    )
}