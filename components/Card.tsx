import styles from "../styles/Home.module.css";

type CardProps = {
  image: string;
  name: string;
  playcount: string;
  listeners?: string;
};

function Card(props: CardProps) {
  return (
    <div className={styles.card}>
      <img src={props.image} className={styles.image} />
      <h2>{props.name}</h2>
      <p>Play Count: {props.playcount}</p>
      {props.listeners && <p>Listeners Count: {props.listeners}</p> } 
    </div>
  );
}

export default Card;
