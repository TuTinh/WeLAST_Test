import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {

    return (
        <div>
            <p>Home</p>
            <Link to={'repos'} >
                List of repositories
            </Link>
        </div>
    )
}

export default Home;