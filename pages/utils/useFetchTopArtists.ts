import React, { useState, useEffect } from "react";
import { Artist } from "./interfaces";

function useFetchTopArtists(pageNum: number,data: Artist[]) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [artists, setArtists] = useState<Artist[]>(data);
  useEffect(() => {
    if(pageNum > 1) {
        setIsLoading(true);
        setError(false);
        fetch(`${process.env.API_BASE}?method=chart.gettopartists&api_key=${process.env.API_KEY}&format=json&page=${pageNum}`)
        .then(res => res.json())
        .then(result => {
          if (result) {
              setArtists((prev) => {
                return [...prev,...result?.artists?.artist]
              } );
              setHasMore(result?.artists?.artist.length > 0);
              setIsLoading(false);
          }
  
        })
        .catch((err) => {
          setError(err);
        });
    }

  }, [pageNum]);

  return { isLoading, error, artists,hasMore };
}

export default useFetchTopArtists;