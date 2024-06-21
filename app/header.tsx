
const Header = ({ isDarkMode, setIsDarkMode }: { isDarkMode: boolean, setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>> }) => {
    return (
        <header>
            <span className='font-bold text-4xl'>Budgeting App</span>
            <div className="toggle">
                <input type="checkbox" onClick={() => setIsDarkMode(!isDarkMode)} />
                <label>{isDarkMode ? ' Light' : ' Dark'} mode</label>
            </div>
        </header>
    )
}

export default Header;
