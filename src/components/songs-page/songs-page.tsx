import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

// FPCC
import { FVSong } from '../common/data/types';
import fetchSongsData from '../../services/songsApiService';
import { LoadingSpinner } from '../common/loading-spinner/loading-spinner';

import SongsView from '../songs-view/songs-view';
import SongPage from '../song-page/song-page';

/* eslint-disable-next-line */
export interface SongsPageProps {}

export default function SongsPage(props: SongsPageProps) {
  const [songsData, setSongsData] = useState<FVSong[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const result = await fetchSongsData();
        setSongsData(result);
        setLoading(false);
      } catch (error) {
        // Handle error scenarios
      }
    };

    fetchDataAsync();
  }, []);

  return loading ? (
    <LoadingSpinner />
  ) : (
    <Routes>
      <Route path="" element={<SongsView songsData={songsData} />} />
      <Route path=":id" element={<SongPage songsData={songsData} />} />
    </Routes>
  );
}
