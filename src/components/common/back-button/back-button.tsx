import { useNavigate } from 'react-router-dom'

export function BackButton() {
  const navigate = useNavigate()
  const goBack = () => navigate(-1)
  return (
    <button data-testid="back-btn" className="flex items-center" onClick={goBack}>
      <i className="fv-left-open pr-2 text-xl" />
      <span className="text-lg">BACK</span>
    </button>
  )
}

export default BackButton
