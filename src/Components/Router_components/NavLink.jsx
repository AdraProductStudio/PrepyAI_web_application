import { NavLink } from 'react-router-dom'

const NavLinkComp = ({
  to, title, end, children,
  className, clickFunction,

}) => {

  return (
    <NavLink to={to} className={`${className}`} onClick={clickFunction} end={end || false}>
      {children || title}
    </NavLink>
  )
}

export default NavLinkComp