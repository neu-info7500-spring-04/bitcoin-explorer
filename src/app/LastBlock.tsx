
import { BitcoinQuery } from '@/graphql/__generated__/graphql';
import styles from './page.module.css'; 
import TimeSinceLastBlock from "./TimeSinceLastBlock";

export default function LastBlock({bitcoin}: {bitcoin: BitcoinQuery}) {
    const lastBlock = bitcoin.bitquery.bitcoin?.blocks?.[0];
    const formatBlockHeight = (height: number | undefined) => {
        if (height === undefined) return "";
        const heightString = height.toString();
    return `${heightString.slice(0, 3)} ${heightString.slice(3)}`;
    };

    return (
    <>
      <div className={styles.lastBlockContainer}>
        <div className={styles.blockTitle}>Last block</div>
        <div className={styles.blockHeight} data-testid="blockHeight">
          {formatBlockHeight(lastBlock?.height)}
        </div>
        <div className={styles.blockTitle}>Time from last block</div>
        <TimeSinceLastBlock lastBlock={lastBlock} />
      </div>
    </>
    )
}