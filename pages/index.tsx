import { GetStaticProps } from "next";
import Link from "next/link";
import { useState } from "react";
import Card from "../components/Card";
import styles from "../styles/Home.module.css";
import useFetchTopArtists from "./utils/useFetchTopArtists";
import { Artists } from "./utils/interfaces";
import useInfiniteScroll from "./utils/useInfiniteScroll";

const Home: React.FC<Artists> = (props) => {
  const [pageNum, setPageNum] = useState(1);

  const { isLoading, error, artists, hasMore } = useFetchTopArtists(
    pageNum,
    props.artists
  );

  const lastArtistElementRef = useInfiniteScroll(isLoading,hasMore,setPageNum);

  return (
    <div className={styles.flexCenter}>
        <div className={styles.grid}>
          {artists.length >0  &&
            artists?.map((item, index) => {
              const itemProps =
                artists.length === index + 1
                  ? { ref: lastArtistElementRef }
                  : {};

              return (
                <div {...itemProps} key={index}>
                <Link href={`artist/${item.mbid}`}>
                  <Card
                    image={item.image[1]["#text"]}
                    name={item.name}
                    playcount={item.playcount}
                    listeners={item.listeners}
                  />
                </Link>
                </div>
              );
            })}
        </div>
        <div>{isLoading && "Loading..."}</div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetch(
    `${process.env.API_BASE}?method=chart.gettopartists&api_key=${process.env.API_KEY}&format=json`
  ).then((res) => res.json());
  return {
    props: {
      artists: data?.artists?.artist as Artists,
    },
  };
};

export default Home;
