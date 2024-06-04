import { useState, useEffect } from 'react';

const useSiteTitleFromManifest = (manifestUrl: string) => {
  const [siteTitle, setSiteTitle] = useState<string>('');

  useEffect(() => {
    const fetchManifest = async () => {
      try {
        const response = await fetch(manifestUrl);
        const json = await response.json();
        setSiteTitle(json.name);
      } catch (error) {
        console.error('Error fetching manifest:', error);
      }
    };

    fetchManifest();
  }, [manifestUrl]);

  return siteTitle;
};

export default useSiteTitleFromManifest;
