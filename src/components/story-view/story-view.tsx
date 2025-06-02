import { useState } from 'react'
import { useParams } from 'react-router'

// FPCC
import { FVStory, FVPage } from 'components/common/data/types'
import CoverView from 'components/story-view/cover-view'
import PageView from 'components/story-view/page-view'
import BackButton from 'components/common/back-button/back-button'
import PageNotFound from 'components/page-not-found/page-not-found'
import fetchStoriesData from 'services/storiesApiService'
import { LoadingWrapper } from 'components/loadingWrapper/loadingWrapper'

export function StoryView() {
  const { id } = useParams()

  const [currentPage, setCurrentPage] = useState<number>(-2)

  const pageToRender = (page: number, story: FVStory) => {
    const introPage: FVPage = {
      ordering: -1,
      notes: [],
      text: story?.introduction,
      translation: story?.introductionTranslation,
      relatedAudio: story?.relatedAudio,
      relatedVideos: [],
      relatedImages: story?.relatedImages,
    }

    switch (page) {
      case -2: // Cover
        return <CoverView story={story} startReading={() => setCurrentPage(-1)} />
      case -1: // Introduction
        return (
          <PageView
            page={introPage}
            isLastPage={currentPage === (story?.pages?.length ?? -1) - 1}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          >
            <div>
              <div className="space-y-1 p-2">
                <div className="w-full text-center text-xl font-bold">{story?.title}</div>
                <div className="w-full text-center">{story?.titleTranslation}</div>
              </div>
              {story?.introduction && <div className="my-4">Introduction</div>}
            </div>
          </PageView>
        )

      default: // All inner pages
        return (
          <PageView
            page={story?.pages[currentPage]}
            isLastPage={currentPage === (story?.pages?.length ?? -1) - 1}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )
    }
  }

  return (
    <LoadingWrapper fetchData={fetchStoriesData}>
      {(storiesData) => {
        const story = storiesData.find((story) => story.id === id)
        return (
          <div data-testid="story-view" className="max-w-3xl w-full mx-auto">
            <div className="p-2 md:p-3">
              <BackButton />
            </div>
            <div className="w-full mx-auto p-2 md:p-4 mb-4 md:border border-gray-300 rounded-lg md:shadow-lg bg-white">
              {story === undefined ? <PageNotFound /> : pageToRender(currentPage, story)}
            </div>
          </div>
        )
      }}
    </LoadingWrapper>
  )
}
export default StoryView
