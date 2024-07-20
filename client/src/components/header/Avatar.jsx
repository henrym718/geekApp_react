import { useState } from "react";
import { Link } from "react-router-dom";

export default function AvatarButtom() {
  const [open, setOpen] = useState(false);

  return (
    <div className='flex justify-center'>
      <div>
        <button
          onClick={() => setOpen(!open)}
          className='relative z-10 flex items-center p-2 '
        >
          <span className='mx-1'>Jane Doe</span>
          <svg
            className='w-5 h-5 mx-1'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          ></svg>
        </button>
      </div>

      <div>
        {open && (
          <div className='absolute ml-[-180px] w-56 py-2 mt-12 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-800'>
            <a
              href='#'
              className='flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'
            >
              <img
                className='flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9'
                src='https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8d29tYW4lMjBibHVlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=face&w=500&q=200'
                alt='jane avatar'
              />
              <div className='mx-1'>
                <h1 className='text-sm font-semibold text-gray-700 dark:text-gray-200'>
                  Jane Doe
                </h1>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  janedoe@exampl.com
                </p>
              </div>
            </a>

            <hr className='border-gray-200 dark:border-gray-700 ' />

            <Link
              className='block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'
              to={"/newgig"}
              onClick={() => setOpen(false)}
            >
              Agregar producto
            </Link>
            <a
              href='#'
              className='block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'
            >
              Perfil
            </a>

            <a
              href='#'
              className='block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'
            >
              Dasboard
            </a>
            <hr className='border-gray-200 dark:border-gray-700 ' />
            <a
              href='#'
              className='block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'
            >
              Sign Out
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
