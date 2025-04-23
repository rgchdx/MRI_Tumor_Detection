import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';

const BottomBar = () => {
  return (
    <footer className='bg-black-100 px-4 md:px-16 lg:px-28'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 text-center'>
        <div>
          <h2 className='text-lg font-bold mb-4 text-white'>Richie Dix</h2>
          <ul className='flex justify-center space-x-4'>
            <li>
              <FaLinkedin className='text-green-500' />{" "}
              <a
                href='https://www.linkedin.com/in/richie-dix/'
                className='hover:underline text-gray-300 hover:text-green-500'
              >
                LinkedIn
              </a>
            </li>
            <li>
              <FaGithub className='text-green-500' />{" "}
              <a
                href='https://github.com/rgchdx'
                className='hover:underline text-gray-300 hover:text-green-500'
              >
                GitHub
              </a>
            </li>
            <li>
              <FaInstagram className='text-green-500' />{" "}
              <a
                href='https://www.instagram.com/rychydx/?locale=zh-hans'
                className='hover:underline text-gray-300 hover:text-green-500'
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className='text-lg font-bold mb-4 text-white'>Isaac Freeman</h2>
          <ul className='flex justify-center space-x-4'>
            <li>
              <FaLinkedin className='text-green-500' />{" "}
              <a
                href='https://www.linkedin.com/in/isaac-freeman-75271a197/'
                className='hover:underline text-gray-300 hover:text-green-500'
              >
                LinkedIn
              </a>
            </li>
            <li>
              <FaGithub className='text-green-500' />{" "}
              <a
                href='https://github.com/Isaac-Freeman'
                className='hover:underline text-gray-300 hover:text-green-500'
              >
                GitHub
              </a>
            </li>
            <li>
              <FaInstagram className='text-green-500' />{" "}
              <a
                href='https://www.instagram.com/isaacfreeman_/'
                className='hover:underline text-gray-300 hover:text-green-500'
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className='border border-t p-4 border-green-500'>
        <p className='text-white text-center'>
          @ 2025 Code with Richie Dix and Isaac Freeman. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default BottomBar;