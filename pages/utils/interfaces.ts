export interface Artists {
  artists: Artist[];
}

export interface Image {
  "#text": string;
  size: Size;
}
export interface Artist {
  image: Image[];
  listeners: string;
  mbid: string;
  name: string;
  playcount: string;
  streamable: string;
  url: string;
}

export interface Album {
  name: string;
  playcount: string;
  mbid: string;
  url: string;
  artist: Artist;
  image: Image[];
}

export interface Track {
  name: string;
  playcount: string;
  listeners: string;
  mbid: string;
  url: string;
  streamable: string;
  artist: Artist;
  image: Image[];
}
export enum Size {
  Extralarge = "extralarge",
  Large = "large",
  Medium = "medium",
  Mega = "mega",
  Small = "small",
}
