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
  goBack: () => any;
  isLastPage: boolean;
  children?: ReactNode;
}

function PageView({
  page,
  currentPage,
  setCurrentPage,
  goBack,
  isLastPage,
  children,
}: Readonly<PageViewProps>) {
  const [showPictureModal, setShowPictureModal] = useState<boolean>(false);
  const [pictureUrl, setPictureUrl] = useState<string>('');
  return (
    <div className="max-w-5xl mx-auto p-2 md:p-6 m-2 md:m-4 rounded-lg bg-white shadow-lg">
      <div className="flex flex-wrap w-full justify-center">
        {page.relatedImages?.map((img) => {
          return (
            <FvImage
              key={img.id}
              className="h-[300px] p-2"
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
      <div className="grid grid-cols-1 p-4 divide-y-2">
        <div className="col-span-1 p-4">
          {convertJsonToComponent(page?.text ?? '{}')}
        </div>
        <div className="col-span-1 p-4">
          {convertJsonToComponent(page?.translation ?? '{}')}
        </div>
      </div>

      <div className="flex w-full justify-center my-4 h-10 space-x-1">
        {page?.relatedAudio?.map((audio) => {
          return (
            <AudioControl
              className="inline-flex"
              key={audio.original.path}
              audio={audio}
            />
          );
        })}
      </div>

      <PageControls
        isLastPage={isLastPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        goBack={goBack}
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
