import React from 'react'

function Layout({children}) {
  return (
    <div>
        <Navbar/>
        <div className='content'>
            {children}
        </div>
        <Footer/>

    </div>
  )
}

export default Layout