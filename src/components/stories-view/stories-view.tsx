import classNames from 'classnames'
import { Link } from 'react-router-dom'

// FPCC
import { FVStory } from '../common/data/types'
import FvImage from '../common/image/image'

export interface StoriesViewProps {
  storiesData: FVStory[]
}

export function StoriesView({ storiesData }: Readonly<StoriesViewProps>) {
  return (
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
