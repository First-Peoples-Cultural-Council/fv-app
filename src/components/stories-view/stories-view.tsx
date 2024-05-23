import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';

// FPCC
import { FVStory } from '../common/data/types';
import IndexedDBService from '../../services/indexedDbService';
import FullScreenModal from '../common/full-screen-modal/full-screen-modal';
import { useModal } from '../common/use-modal/use-modal';
import fetchStoriesData from '../../services/storiesApiService';
import FvImage from '../common/image/image';
import { LoadingSpinner } from '../common/loading-spinner/loading-spinner';
import StoryView from '../story-view/story-view';

/* eslint-disable-next-line */
export interface StoriesViewProps {}

export function StoriesView(props: StoriesViewProps) {
  const location = useLocation();
  const { setShowModal, showModal, closeModal } = useModal();

  const [db, setDb] = useState<IndexedDBService>();
  const [storiesData, setStoriesData] = useState<FVStory[]>([]);
  const [selectedStory, setSelectedStory] = useState<FVStory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const result = await fetchStoriesData();
        setStoriesData(result);
        setLoading(false);
      } catch (error) {
        // Handle error scenarios
      }
    };

    fetchDataAsync();
  }, []);

  useEffect(() => {
    if (
      (location.hash === `#${selectedStory?.id}` ||
        location.hash === `#${selectedStory?.id}?source=/bookmarks`) &&
      window.matchMedia('(min-width: 1024px').matches
    ) {
      setShowModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    setDb(new IndexedDBService('firstVoicesIndexedDb'));
  }, []);

  useEffect(() => {
    const storyId = location.hash.slice(1).split('?')[0];
    const story = storiesData.find((story) => story.id === storyId);
    if (story) {
      setSelectedStory(story);
      setShowModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storiesData, location]);

  return (
    <>
      <div className="grid grid-cols-1 w-full">
        <div className="flex flex-col overflow-y-auto max-h-calc-185 md:max-h-calc-125">
          {loading && <LoadingSpinner />}
          {!loading &&
            storiesData.map((story: FVStory) => {
              return (
                <button
                  key={story.id}
                  className={classNames(
                    'rounded-lg bg-white p-6 m-2 shadow-lg hover:bg-slate-100 cursor-pointer'
                  )}
                  onClick={() => {
                    setSelectedStory(story);
                    setShowModal(true);
                  }}
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
                </button>
              );
            })}
        </div>
      </div>

      {showModal && selectedStory && db !== undefined && (
        <FullScreenModal onClose={() => closeModal()}>
          <StoryView
            db={db}
            selectedStory={selectedStory}
            goBack={() => closeModal()}
          />
        </FullScreenModal>
      )}
    </>
  );
}
export default StoriesView;
