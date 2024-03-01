import styles from "./page.module.css";
import { NextPage } from 'next';
import { useQuery, withWunderGraph } from '../components/generated/nextjs';

const Home: NextPage = () => {
  const blockCount = useQuery({ operationName: 'BitcoinV1BlockCount' });

  return (
    <main className={styles.main}>
      <div>{JSON.stringify(blockCount)}</div>
    </main>
  );
}

export default withWunderGraph(Home);