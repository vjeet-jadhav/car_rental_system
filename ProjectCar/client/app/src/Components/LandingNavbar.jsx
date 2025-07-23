import '../assets/LandingNavbar.css'

function LandingNavbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Rental Cars</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarScroll">
                <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{"--bs-scroll-height" : "100px"}}>
                    <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="#">Book Car</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="#">Login</a>
                    </li>
                </ul>
                    <div className='search'>
                        <form action="">
                        <select name="" id="">
                        <option value="">-- Select Option --</option>
                        <option value="">Pune</option>
                        <option value="">Mumbai</option>
                        </select>
                        <button class="btn btn-outline-success ms-4" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default LandingNavbar