import { useState } from "react";
import Card from "../../../components/Card";
import { Album } from "../../utils/interfaces";
import useFetchTopAlbums from "../../utils/useFetchTopAlbums";
import styles from "../../../styles/Artist.module.css";
import useInfiniteScroll from "../../utils/useInfiniteScroll";
type AlbumProps = {
  data: Album[];
  mbid: string;
};
export default function Albums({ data, mbid }: AlbumProps) {
  const [pageNum, setPageNum] = useState(1);
  const { isLoading, error, albums, hasMore } = useFetchTopAlbums(
    pageNum,
    data,
    mbid
  );

  const lastAlbumsElementRef = useInfiniteScroll(
    isLoading,
    hasMore,
    setPageNum
  );
  return (
    <div className={`${styles.albums} ${styles.mr24}`}>
      <h1 className={styles.title}>Top Albums</h1>
      {albums &&
        albums.map((item, index) => {
          const itemProps =
            albums.length === index + 1 ? { ref: lastAlbumsElementRef } : {};
          return (
            <div {...itemProps} key={index}>
              <Card
                image={item.image[1]["#text"]}
                name={item.name}
                playcount={item.playcount}
              />
            </div>
          );
        })}
    </div>
  );
}
