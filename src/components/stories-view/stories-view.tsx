import { Link } from 'react-router'
import classNames from 'classnames'
import { FaChevronRight, FaBookOpen } from 'react-icons/fa6'

// FPCC
import { FVStory } from 'components/common/data/types'
import fetchStoriesData from 'services/storiesApiService'
import FvImage from 'components/common/image/image'
import { LoadingWrapper } from 'components/loadingWrapper/loadingWrapper'

export function StoriesView() {
  return (
    <LoadingWrapper fetchData={fetchStoriesData}>
      {(storiesData) => (
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
                  <div className="flex items-center justify-between space-x-2">
                    <div className="h-16 w-16 sm:h-24 sm:w-24 shrink-0">
                      {story?.relatedImages?.length > 0 ? (
                        <FvImage
                          className="h-full w-full object-contain shadow-lg"
                          disabledClassName="text-6xl"
                          src={story?.relatedImages[0]?.thumbnail?.path ?? ''}
                          alt={story?.title ?? ''}
                        />
                      ) : (
                        <div className="h-full w-full object-contain shadow-lg flex justify-center items-center">
                          <FaBookOpen className="text-6xl text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex text-center items-center justify-center">
                      <div>
                        <div className="font-bold">{story.title}</div>
                        <div className="truncate">{story.titleTranslation}</div>
                      </div>
                    </div>
                    <div className="self-center">
                      <FaChevronRight />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </LoadingWrapper>
  )
}
export default StoriesView
