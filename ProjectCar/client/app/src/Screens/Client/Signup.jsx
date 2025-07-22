import '../../assets/Signup.css'

function Signup() {
    return (
        <div className="main">
            <div className='header'>
                <div className='text'>Register Here!</div>
                <div className='underline'></div>
            </div>
            <div className="fields">
                <div className="field">
                    <label htmlFor="fname" className='lables'>First Name</label>
                    <input type="text" placeholder="First Name" className="inputs" id="fname"/>
                </div>
            </div>
            <div className="fields">
                <div className="field">
                    <label htmlFor="lname" className='lables'>Last Name</label>
                    <input type="text" placeholder="Last Name" className="inputs" id="lname"/>
                </div>
            </div>
            <div className="fields">
                <div className="field">
                    <label htmlFor="email" className='mail'>Email</label>
                    <input type="email" placeholder="Email" className="inputs" id="email"/>
                </div>
            </div>
            <div className="fields">
                <div className="field">
                    <label htmlFor="pass" className='lables'>Password</label>
                    <input type="password" placeholder="Password" className="inputs" id="pass"/>
                </div>
            </div>
            <div className="fields">
                <div className="field">
                    <label htmlFor="cnfpass" className='cfn'>Confirm Password</label>
                    <input type="password" placeholder="Password" className="cfninp" id="cnfpass"/>
                </div>
            </div>
            <div className="forgot-password">Forget Password ? <span>Click Here!</span></div>
            <div className="submit-container">
                <div className="submit">Signup</div>
                <div className="submit">Login</div>
            </div>
        </div>
    );
}

export default Signup