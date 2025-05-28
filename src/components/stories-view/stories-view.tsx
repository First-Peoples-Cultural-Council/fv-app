import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

// FPCC
import { FVStory } from 'components/common/data/types'
import fetchStoriesData from 'services/storiesApiService'
import FvImage from 'components/common/image/image'
import { LoadingSpinner } from 'components/common/loading-spinner/loading-spinner'

export function StoriesView() {
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
    <div className="grid grid-cols-1 w-full">
      <div className="flex flex-col overflow-y-auto max-h-calc-185 md:max-h-calc-125 md:space-y-2 md:p-2">
        {storiesData.map((story: FVStory) => {
          return (
            <Link
              key={story.id}
              to={`/learn/stories/${story.id}`}
              className={classNames(
                'border border-gray-200 md:rounded-lg bg-white p-4 shadow-lg hover:bg-gray-100 cursor-pointer'
              )}
            >
              <div className="grid grid-cols-10 gap-4">
                <div className="col-span-3 h-16 w-16 sm:h-24 sm:w-24">
                  {story?.relatedImages === null && (
                    <div className="h-full w-full object-contain shadow-lg flex justify-center items-center">
                      <div className="fv-stories text-6xl"></div>
                    </div>
                  )}
                  {story?.relatedImages[0] && (
                    <FvImage
                      className="h-full w-full object-contain shadow-lg"
                      disabledClassName="text-6xl"
                      src={story?.relatedImages[0]?.thumbnail?.path ?? ''}
                      alt={story?.title ?? ''}
                    />
                  )}
                </div>
                <div className="col-span-5 flex text-center items-center justify-center">
                  <div>
                    <div className="font-bold">{story.title}</div>
                    <div className="truncate">{story.titleTranslation}</div>
                  </div>
                </div>
                <div className="self-center col-span-1"></div>
                <div className="place-self-end self-center">
                  <i className="fv-right-open" />
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
export default StoriesView
