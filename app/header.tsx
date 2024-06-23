const Header = ({
  isDarkMode,
  setIsDarkMode,
}: {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <header className=''>
      <div className='flex flex-row items-center gap-4'>
        <img src='/pound.svg' width='50rem' alt='' />
        <span className='font-bold text-4xl text-brand-dark dark:text-brand-light'>
          Budgeting App
        </span>
      </div>
      <div className='toggle relative'>
        <input type='checkbox' onClick={() => setIsDarkMode(!isDarkMode)} />
        <label className='relative flex items-center'>
          <span className='px-2'>{isDarkMode ? "Dark" : "Light"} mode</span>
        </label>
      </div>
    </header>
  );
};

export default Header;
