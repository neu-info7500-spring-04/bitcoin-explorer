"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

function formatTimeSinceLastBlock(iso8601: string): string {
  const lastBlockTime = new Date(iso8601).getTime();
  const currentTime = new Date().getTime();
  const timeDiff = currentTime - lastBlockTime;
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
  const seconds = Math.floor((timeDiff / 1000) % 60);
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

type LastBlock =
  | {
      height: number;
      timestamp?:
        | {
            iso8601: any;
          }
        | null
        | undefined;
    }
  | undefined;

export default function TimeSinceLastBlock({ lastBlock }: { lastBlock: LastBlock }) {
  const [timeSinceLastBlock, setTimeSinceLastBlock] = useState("00:00:00");
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const timer = setInterval(() => {
      if (lastBlock?.timestamp?.iso8601) {
        setTimeSinceLastBlock(
          formatTimeSinceLastBlock(lastBlock.timestamp.iso8601)
        );
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [lastBlock?.timestamp?.iso8601]);

  if (!hasMounted) {
    return <div>Loading...</div>;
  }

  return (
    // data-testid attribute on HTML used for playwright testing 
    <div className={styles.timer} data-testid="timer"> 
      <div className={styles.timeSegment}>
        <div>{timeSinceLastBlock.split(":")[0]}</div>
        <div className={styles.timeUnit}>hours</div>
      </div>
      <div className={styles.separator}></div>
      <div className={styles.timeSegment}>
        <div>{timeSinceLastBlock.split(":")[1]}</div>
        <div className={styles.timeUnit}>minutes</div>
      </div>
      <div className={styles.separator}></div>
      <div className={styles.timeSegment}>
        <div>{timeSinceLastBlock.split(":")[2]}</div>
        <div className={styles.timeUnit}>seconds</div>
      </div>
    </div>
  );
}