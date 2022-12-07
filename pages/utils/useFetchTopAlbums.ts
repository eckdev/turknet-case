import React, { useState, useEffect } from "react";
interface Artists {
  artists: Artist[];
}

 interface Image {
  "#text": string;
  size: Size;
}
 interface Artist {
  image: Image[];
  listeners: string;
  mbid: string;
  name: string;
  playcount: string;
  streamable: string;
  url: string;
}

 interface Album {
  name: string;
  playcount: string;
  mbid: string;
  url: string;
  artist: Artist;
  image: Image[];
}

 interface Track {
  name: string;
  playcount: string;
  listeners: string;
  mbid: string;
  url: string;
  streamable: string;
  artist: Artist;
  image: Image[];
}
 enum Size {
  Extralarge = "extralarge",
  Large = "large",
  Medium = "medium",
  Mega = "mega",
  Small = "small",
}
function useFetchTopAlbums(pageNum: number,data: Album[],mbid:string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [albums, setAlbums] = useState<Album[]>(data);
  useEffect(() => {
    if(pageNum > 1) {
        setIsLoading(true);
        setError(false);
        fetch(`${process.env.API_BASE}/?method=artist.gettopalbums&mbid=${mbid}&api_key=${process.env.API_KEY}&format=json&page=${pageNum}`)
        .then(res => res.json())
        .then(result => {
          if (result) {
            setAlbums((prev) => {
                return [...prev,...result?.topalbums?.album]
              } );
              setHasMore(result?.topalbums?.album.length > 0);
              setIsLoading(false);
          }
  
        })
        .catch((err) => {
          setError(err);
        });
    }

  }, [pageNum]);

  return { isLoading, error, albums,hasMore };
}

export default useFetchTopAlbums;