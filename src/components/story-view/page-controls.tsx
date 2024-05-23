import classNames from 'classnames';

export interface PageControlsProps {
  currentPage: number;
  setCurrentPage: (pageNumber: number) => any;
  goBack: () => any;
  isLastPage: boolean;
}

export function PageControls({
  currentPage,
  setCurrentPage,
  goBack,
  isLastPage,
}: Readonly<PageControlsProps>) {
  const nextLabel = isLastPage ? 'Done' : 'Next Page';
  const currentLabel = currentPage === -1 ? 'Intro' : `Page ${currentPage + 1}`;
  const backLabel = (function () {
    switch (currentPage) {
      case -1:
        return 'Cover';
      case 0:
        return 'Intro';
      default:
        return 'Previous Page';
    }
  })();

  const nextClick = () => {
    isLastPage ? goBack() : setCurrentPage(currentPage + 1);
  };

  const backClick = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flex justify-between pt-4">
      <button
        onClick={backClick}
        type="button"
        className="btn-contained bg-color-alphabet-light w-32 md:w-48"
      >
        {backLabel}
      </button>

      <div className="flex items-center justify-center flex-grow">
        <div className="italic text-fv-charcoal-light">{currentLabel}</div>
      </div>

      <button
        onClick={nextClick}
        type="button"
        className={classNames(
          'btn-contained bg-color-alphabet-light w-32 md:w-48',
          {
            'bg-primary': isLastPage,
          }
        )}
      >
        {nextLabel}
      </button>
    </div>
  );
}
export default PageControls;
