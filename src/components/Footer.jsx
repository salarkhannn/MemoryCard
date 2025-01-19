import logo from "../assets/githubLogo.png"

export default function Footer(){
    return (
        <div className="footer flex flex-row items-center justify-center">
            <h1>Made by yours truly</h1>
            <p><a href="https://github.com/salarkhannn/MemoryCard">
                <img src={logo} className="github-icon" href="https://github.com/salarkhannn/MemoryCard"/>
            </a></p>
        </div>
    )
}