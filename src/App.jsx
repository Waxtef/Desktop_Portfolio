import React from 'react'
import {Navbar, Welcome} from "#components";

const App = () => {
    return (
        <main className="App">
            <Navbar />
            <Welcome/>
            <Dock/>
        </main>
    )
}
export default App
