import React from 'react';

export interface ShareButtonProps {
  title: string;
  text: string;
  url: string;
}

export function ShareButton(shareData: Readonly<ShareButtonProps>) {
  return (
    <div className="pl-2 pr-2">
      <button
        data-testid="share-button"
        onClick={() => {
          if (navigator.share && navigator.canShare(shareData)) {
            navigator.share(shareData).catch((err: any) => {
              console.error(err);
            });
          } else {
            navigator.clipboard.writeText(shareData.url).catch((err: any) => {
              console.error(err);
            });
          }
        }}
      >
        <i className="fv-share pr-2" />
        <span className="text-xl">SHARE</span>
      </button>
    </div>
  );
}
