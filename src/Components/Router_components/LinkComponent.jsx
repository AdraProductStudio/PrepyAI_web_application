import { Link } from 'react-router-dom'

const LinkComponent = ({
  children, to,
  className, title,
  onLinkClick
}) => {
  return (
    <Link to={to} onClick={onLinkClick} className={className}>{children || title}</Link>
  )
}

export default LinkComponent