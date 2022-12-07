import { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import Card from "../../../components/Card";
import styles from "../../../styles/Artist.module.css";
import Albums from "./Albums";
import Tracks from "./Tracks";
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
interface IParams extends ParsedUrlQuery {
  mbid: string;
}

interface Props {
  mbid: string;
  topAlbums: Album[];
  topTracks: Track[];
}

const ArtistDetail: NextPage<Props> = ({ mbid, topAlbums, topTracks }) => {
  return (
    <>
      <div className={styles.banner}>{topAlbums[0].artist.name}</div>
      <div className={styles.container}>
        <Albums data={topAlbums} mbid={mbid} />
        <Tracks data={topTracks} mbid={mbid} />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ ...ctx }) => {
  let { mbid } = ctx.params as IParams;

  const topAlbums = await fetch(
    `${process.env.API_BASE}/?method=artist.gettopalbums&mbid=${mbid}&api_key=${process.env.API_KEY}&format=json`
  ).then((res) => res.json());

  const topTracks = await fetch(
    `${process.env.API_BASE}/?method=artist.gettoptracks&mbid=${mbid}&api_key=${process.env.API_KEY}&format=json`
  ).then((res) => res.json());

  return {
    props: {
      mbid,
      topAlbums: topAlbums?.topalbums?.album,
      topTracks: topTracks?.toptracks?.track,
    },
  };
};

export default ArtistDetail;
