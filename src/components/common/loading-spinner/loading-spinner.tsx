export const LoadingSpinner = () => {
  return (
    <div className={`flex items-center justify-center mx-auto w-full h-40`}>
      <div>
        <div className="flex justify-center items-center">
          <div className="bg-song-500 w-6 h-6 lg:w-10 lg:h-10 rounded-full m-5 lg:m-8 animate-pulse-blur" />
          <div
            className="bg-phrase-500 w-6 h-6 lg:w-10 lg:h-10 rounded-full m-5 lg:m-8 animate-pulse-blur"
            style={{ animationDelay: '0.2s' }}
          />
          <div
            className="bg-story-500 w-6 h-6 lg:w-10 lg:h-10 rounded-full m-5 lg:m-8 animate-pulse-blur"
            style={{ animationDelay: '0.4s' }}
          />
          <div
            className="bg-word-500 w-6 h-6 lg:w-10 lg:h-10 rounded-full m-5 lg:m-8 animate-pulse-blur"
            style={{ animationDelay: '0.6s' }}
          />
        </div>
        <div className="text-center text-xl font-medium">Loading...</div>
      </div>
    </div>
  );
};
