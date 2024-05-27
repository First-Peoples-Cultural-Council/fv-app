import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

// FPCC
import { FVStory } from '../common/data/types';
import FvImage from '../common/image/image';
import { useStories } from '../stories-page/stories-page';

/* eslint-disable-next-line */
export interface StoriesViewProps {}

export function StoriesView(props: StoriesViewProps) {
  const { storiesData } = useStories();
  console.log(storiesData);

  return (
    <div className="grid grid-cols-1 w-full">
      <div className="flex flex-col overflow-y-auto max-h-calc-185 md:max-h-calc-125">
        {storiesData.map((story: FVStory) => {
          return (
            <Link
              key={story.id}
              to={story.id}
              className={classNames(
                'rounded-lg bg-white p-6 m-2 shadow-lg hover:bg-slate-100 cursor-pointer'
              )}
            >
              <div className="grid grid-cols-10 gap-4">
                <div className="col-span-3 h-[75px] w-[75px] sm:h-[100px] sm:w-[100px]">
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
                <div className="col-span-5">
                  <div>
                    <h1 className="font-bold">{story.title}</h1>
                  </div>
                  <h1 className="truncate">{story.titleTranslation}</h1>
                </div>
                <div className="self-center col-span-1"></div>
                <div className="place-self-end self-center">
                  <i className="fv-right-open" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
export default StoriesView;
