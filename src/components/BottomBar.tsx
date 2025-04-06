import React from 'react'
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';

const BottomBar = () => {
  return (
    <footer className='bg-black-100 px-4 md:px-16 lg:px-28'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div>
                <h2 className='text-lg font-bold mb-4 text-white'>
                    Brows other pages
                </h2>
                <ul>
                    <li><a href='' className='hover:underline text-gray-300 hover:text-green-500'>Home</a></li>
                    <li><a href='' className='hover:underline text-gray-300 hover:text-green-500'>About me</a></li>
                    <li><a href='' className='hover:underline text-gray-300 hover:text-green-500'>Projects</a></li>
                    <li><a href='' className='hover:underline text-gray-300 hover:text-green-500'>Chat with me!</a></li>
                </ul>
            </div>
            <div>
                <h2 className='text-lg font-bold text-white mb-4'>
                    Links
                </h2>
                <ul>
                    <li><a href='https://sis.kwansei.ac.jp/' className='hover:underline text-gray-300 hover:text-green-500'>My high school</a></li>
                    <li><a href='https://www.knox.edu/' className='hover:underline text-gray-300 hover:text-green-500'>My college</a></li>
                    <li><a href='https://lcculinary.org/' className='hover:underline text-gray-300 hover:text-green-500'>My previous work</a></li>
                </ul>
            </div>
            <div>
                <h2 className='text-lg font-bold mb-4 text-white'>
                    Socials
                </h2>
                <ul className='flex space-x-4'>
                    <li>
                        <FaLinkedin className='text-green-500'/>{" "}
                        <a href='https://www.linkedin.com/in/richie-dix/' className='hover:underline text-gray-300 hover:text-green-500'>LinkedIn</a>
                    </li>
                    <li>
                        <FaGithub className='text-green-500'/>{" "}
                        <a href='https://github.com/rgchdx' className='hover:underline text-gray-300 hover:text-green-500'>GitHub</a>
                    </li>
                    <li>
                        <FaInstagram className='text-green-500'/>{" "}
                        <a href='https://www.instagram.com/rychydx/?locale=zh-hans' className='hover:underline text-gray-300 hover:text-green-500'>Instagram</a>
                    </li>
                </ul>
            </div>
        </div>
        <div className='border border-t p-4 border-green-500'>
            <p className='text-white text-center'>@ 2024 Code with Richie. All rights reserved. Developed with React.js</p>
        </div>
    </footer>
  )
}

export default BottomBar