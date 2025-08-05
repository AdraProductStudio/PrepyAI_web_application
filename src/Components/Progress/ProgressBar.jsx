import ProgressBar from 'react-bootstrap/ProgressBar';

const ProgressBarComp = ({
  componentFrom,
  progressNow, className, animated = false
}) => {
  
  return (
    <ProgressBar animated={animated} now={progressNow} className={className} />
  )
}

export default ProgressBarComp