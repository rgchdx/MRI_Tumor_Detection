const TopBar = () => {
    return (
        <div className="fixed top-0 left-0 right-0 flex items-center justify-between bg-gray-800 p-4 text-white shadow-md">
            <h1 className="text-lg font-bold">MRI Bonanza</h1>
            <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-400">Home</a>
                <a href="#" className="hover:text-gray-400">About</a>
                <a href="#" className="hover:text-gray-400">Contact</a>
            </div>
        </div>
    );
};

export default TopBar;