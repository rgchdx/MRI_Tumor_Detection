import React from "react";

const TopBar = () => {
    return(
        <div className="flex items-center justify-between bg-gray-800 p-4 text-white">
            <h1 className="text-lg font-bold">MRI Bonanza</h1>
            <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-400">Home</a>
                <a href="#" className="hover:text-gray-400">About</a>
                <a href="#" className="hover:text-gray-400">Contact</a>
            </div>
        </div>
    )
}
export default TopBar;