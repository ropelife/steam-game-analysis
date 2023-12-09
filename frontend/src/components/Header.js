export default function Header() {
    // const userData = useContext(Context)
    return (
        <nav className="nav-bar">
        <p><a href="/"><img src="../steam-white.png" alt="logo" height="40" /></a></p>
        <h1 className="text-color">Steam Game Analysis</h1>
        <ul>
            {/* <li><a href="/">HOME</a></li> */}
            <li><a href="/">SUPPORT</a></li>
            {/* <li><a href="/">ABOUT</a></li> */}
        </ul>
        </nav>
    )
}
