import React from 'react'
import './style.sass'

const Loader: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
	return <div className="loader">{children}</div>
}

export default Loader
