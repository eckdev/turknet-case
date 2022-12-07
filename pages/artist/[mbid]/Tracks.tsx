import { useState } from "react";
import Card from "../../../components/Card";
import { Track } from "../../utils/interfaces";
import useFetchTopTracks from "../../utils/useFetchTopTracks";
import useInfiniteScroll from "../../utils/useInfiniteScroll";
import styles from "../../../styles/Artist.module.css";

type TrackProps = {
  data: Track[];
  mbid: string;
};
export default function Tracks({ data, mbid }: TrackProps) {
  const [pageNum, setPageNum] = useState(1);

  const { isLoading, error, tracks, hasMore } = useFetchTopTracks(
    pageNum,
    data,
    mbid
  );

  const lastTracksElementRef = useInfiniteScroll(
    isLoading,
    hasMore,
    setPageNum
  );
  return (
    <div className={styles.tracks}>
      <h1>Top Tracks</h1>
      {tracks &&
        tracks.map((item, index) => {
          const itemProps =
            tracks.length === index + 1 ? { ref: lastTracksElementRef } : {};
          return (
            <div {...itemProps} key={index}>
              <Card
                image={item.image[1]["#text"]}
                name={item.name}
                playcount={item.playcount}
                listeners={item.listeners}
              />
            </div>
          );
        })}
    </div>
  );
}
