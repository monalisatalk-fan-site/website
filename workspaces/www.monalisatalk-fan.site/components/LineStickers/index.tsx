import React from 'react';
import type stickers from '~/assets/data/stickers.json';
import styles from './index.module.css';

type Props = {
  stickers: typeof stickers,
};

export const LineStickers: React.VFC<Props> = ({ stickers: { author, stickers } }) => {
  return (
    <ol className={styles.lineStickers}>
      { stickers.map((sticker) => (
        <li key={sticker.id} className={styles.item}>
          <div className={styles.thumbnail}>
            <img className={styles.image} src={`/images/top/stickers/${sticker.id}.png`} />
          </div>
          <h2 className={styles.name}>{sticker.name}</h2>
          <div className={styles.author}>
            <a className={styles.link} href={`https://store.line.me/stickershop/author/${author.id}`} target="_blank" rel="noreferrer">
              {author.name}
            </a>
          </div>
          <p className={styles.description}>{sticker.description}</p>
          <div className={styles.price}>&yen;{sticker.price}</div>
          <a className={styles.link} href={`https://store.line.me/stickershop/product/${sticker.id}`} target="_blank" rel="noreferrer">
            <span className={styles.text}>LINE STORE で開く</span>
          </a>
        </li>
      ))}
    </ol>
  );
};
