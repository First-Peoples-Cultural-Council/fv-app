import { ReactNode, useState } from 'react';

// FPCC
import { FVPage } from '../common/data';
import FvImage from '../common/image/image';
import { convertJsonToComponent } from '../common/convert-json/convert-json';
import AudioControl from '../common/audio-control/audio-control';
import Modal from '../common/modal/modal';
import PageControls from '../story-view/page-controls';

export interface PageViewProps {
  page: FVPage;
  currentPage: number;
  setCurrentPage: (pageNumber: number) => any;
  isLastPage: boolean;
  children?: ReactNode;
}

function PageView({
  page,
  currentPage,
  setCurrentPage,
  isLastPage,
  children,
}: Readonly<PageViewProps>) {
  const [showPictureModal, setShowPictureModal] = useState<boolean>(false);
  const [pictureUrl, setPictureUrl] = useState<string>('');
  console.log(page);
  return (
    <div
      data-testid="story-page-view"
      className="max-w-5xl w-full md:w-[85vw] mx-auto p-2 md:p-6 m-2 md:m-4 rounded-lg bg-white shadow-lg"
    >
      <div className="flex flex-wrap w-full justify-center">
        {page.relatedImages?.map((img) => {
          return (
            <FvImage
              key={img.id}
              className="h-80 p-2"
              src={img.original.path}
              alt={img.title}
              onClick={() => {
                setPictureUrl(img.original.path);
                setShowPictureModal(true);
              }}
            />
          );
        })}
      </div>
      {/* To display Introduction header */}
      {children}
      <div className="p-4 divide-y-2">
        <div className="w-full p-4">
          {convertJsonToComponent(page?.text ?? '{}')}
        </div>
        <div className="w-full p-4">
          {convertJsonToComponent(page?.translation ?? '{}')}
        </div>
      </div>

      <div className="flex w-full justify-center my-4 h-10 space-x-1">
        {page?.relatedAudio?.map((audio) => {
          return (
            <AudioControl
              className="inline-flex"
              key={audio.id}
              audio={audio}
            />
          );
        })}
      </div>

      <PageControls
        isLastPage={isLastPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {showPictureModal && (
        <Modal onClose={() => setShowPictureModal(false)}>
          <FvImage className="w-full" src={pictureUrl} alt="" />
        </Modal>
      )}
    </div>
  );
}

export default PageView;
