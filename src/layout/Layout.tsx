import React from 'react'

interface ILogoutButtonProps {
  onLogout: () => void
}

const LogoutButton = ({ onLogout }: ILogoutButtonProps) => {
  return (
    <div className="cursor-pointer" onClick={onLogout}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none">
        <path
          fill="#fff"
          d="M10 23a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1h8a1 1 0 0 1 0 2H2v20h7a1 1 0 0 1 1 1Zm13.707-11.707-5-5a1 1 0 1 0-1.415 1.414L20.587 11H9a1 1 0 0 0 0 2h11.586l-3.293 3.293a1 1 0 1 0 1.415 1.415l5-5a1.001 1.001 0 0 0 0-1.415Z"
        />
      </svg>
    </div>
  )
}

interface ILayoutProps {
  children: React.ReactNode
  onLogout: () => void
  userEmail: string | null
}

const Layout = ({ children, onLogout, userEmail }: ILayoutProps) => {
  return (
    <>
      <div className="font-INTER">
        <div className="flex h-16 w-full items-center justify-end !font-INTER text-26-20-600 lg:text-32-20-600">
          <div className="mr-[33px] mt-[40px] flex gap-[19px]">
            <p>{userEmail}</p>
            <LogoutButton onLogout={onLogout} />
          </div>
        </div>
        {children}
      </div>
    </>
  )
}

export default Layout
