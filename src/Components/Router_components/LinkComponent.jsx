import { Link } from 'react-router-dom'

const LinkComponent = ({
  children, to,
  className, title
}) => {
  return (
    <Link to={to} className={className}>{children || title}</Link>
  )
}

export default LinkComponent