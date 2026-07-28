import { useNavigate } from 'react-router'
import { FaChevronLeft } from 'react-icons/fa6'

export function BackButton() {
  const navigate = useNavigate()
  const goBack = () => navigate(-1)
  return (
    <button data-testid="back-btn" className="flex items-center" onClick={goBack}>
      <FaChevronLeft className="pr-2 text-xl" />
      <span className="text-lg">BACK</span>
    </button>
  )
}

export default BackButton
