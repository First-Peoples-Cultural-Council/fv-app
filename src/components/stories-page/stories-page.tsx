import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'

// FPCC
import { FVStory } from '../common/data/types'
import fetchStoriesData from '../../services/storiesApiService'
import { LoadingSpinner } from '../common/loading-spinner/loading-spinner'

import StoriesView from '../stories-view/stories-view'
import StoryView from '../story-view/story-view'

export default function StoriesPage() {
  const [storiesData, setStoriesData] = useState<FVStory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const result = await fetchStoriesData()
        setStoriesData(result)
        setLoading(false)
      } catch (error) {
        // Handle error scenarios
        console.error(error)
      }
    }

    fetchDataAsync()
  }, [])

  return loading ? (
    <LoadingSpinner />
  ) : (
    <Routes>
      <Route path="" element={<StoriesView storiesData={storiesData} />} />
      <Route path=":id" element={<StoryView storiesData={storiesData} />} />
    </Routes>
  )
}
