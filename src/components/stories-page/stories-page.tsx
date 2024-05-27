import { useEffect, useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';

// FPCC
import { FVStory } from '../common/data/types';
import fetchStoriesData from '../../services/storiesApiService';
import { LoadingSpinner } from '../common/loading-spinner/loading-spinner';

/* eslint-disable-next-line */
export interface StoriesPageProps {}

type ContextType = { storiesData: FVStory[] | [] };

export default function StoriesPage(props: StoriesPageProps) {
  const [storiesData, setStoriesData] = useState<FVStory[]>([]);
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

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Outlet context={{ storiesData } satisfies ContextType} />
      )}
    </>
  );
}

export function useStories() {
  return useOutletContext<ContextType>();
}
