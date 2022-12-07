import React, { useState, useEffect } from "react";
import { Track } from "./interfaces";

function useFetchTopTracks(pageNum: number, data: Track[], mbid: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [tracks, setTracks] = useState<Track[]>(data);
  useEffect(() => {
    if (pageNum > 1) {
      setIsLoading(true);
      setError(false);
      fetch(
        `${process.env.API_BASE}/?method=artist.gettoptracks&mbid=${mbid}&api_key=${process.env.API_KEY}&page=${pageNum}`
      )
        .then((res) => res.json())
        .then((result) => {
          if (result) {
            setTracks((prev) => {
              return [...prev, ...result?.toptracks?.track];
            });
            setHasMore(result?.toptracks?.track.length > 0);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          setError(err);
        });
    }
  }, [pageNum]);

  return {
    isLoading,
    error,
    tracks,
    hasMore,
  };
}

export default useFetchTopTracks;
