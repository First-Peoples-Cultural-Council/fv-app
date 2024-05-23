import { useState } from 'react';

// FPCC
import { FVStory, FVPage } from '../common/data/types';
import CoverView from '../story-view/cover-view';
import PageView from '../story-view/page-view';

export interface StoryViewProps {
  story: FVStory;
  goBack: () => any;
}

export function StoryView({ story, goBack }: Readonly<StoryViewProps>) {
  const [currentPage, setCurrentPage] = useState<number>(-2);

  const introPage: FVPage = {
    ordering: -1,
    notes: [],
    text: story?.introduction,
    translation: story?.introductionTranslation,
    relatedAudio: story?.relatedAudio,
    relatedVideos: [],
    relatedImages: story?.relatedImages,
  };

  const pageToRender = (page: number) => {
    switch (currentPage) {
      case -2: // Cover
        return (
          <CoverView story={story} startReading={() => setCurrentPage(-1)} />
        );
      case -1: // Introduction
        return (
          <PageView
            page={introPage}
            isLastPage={currentPage === (story?.pages?.length ?? -1) - 1}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            goBack={goBack}
          >
            <div>
              <div className="space-y-1 p-2">
                <div className="w-full text-center text-xl font-bold">
                  {story?.title}
                </div>
                <div className="w-full text-center">
                  {story?.titleTranslation}
                </div>
              </div>
              {story?.introduction && <div className="my-4">Introduction</div>}
            </div>
          </PageView>
        );

      default: // All inner pages
        return (
          <PageView
            page={story?.pages[currentPage]}
            isLastPage={currentPage === (story?.pages?.length ?? -1) - 1}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            goBack={goBack}
          />
        );
    }
  };

  return <div data-testid="story-view">{pageToRender(currentPage)}</div>;
}
export default StoryView;
