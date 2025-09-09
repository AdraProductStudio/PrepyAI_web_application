import ProgressBar from 'react-bootstrap/ProgressBar';

const ProgressBarComp = ({
  componentFrom,
  progressNow, className, animated = false
}) => {
  console.log(progressNow,'progressNow')
  return (
    <ProgressBar animated={animated} now={progressNow} className={className} />
  )
}

export default ProgressBarComp