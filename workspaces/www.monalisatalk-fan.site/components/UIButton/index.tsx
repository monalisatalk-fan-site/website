import React, { useRef } from 'react';
import { useButton } from '@react-aria/button';
import { AriaButtonProps } from '@react-types/button';
import clsx from 'clsx';
import styles from './index.module.css';

export type Props = AriaButtonProps<'button'> & {
  className?: string;
};

export const UIButton: React.FC<Props> = ({ className, ...props }) => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const { buttonProps } = useButton(props, ref);

  return (
    <button
      {...buttonProps}
      ref={ref}
      className={clsx(styles.uiButton, className)}
    >
      <span className={styles.text}>
        {props.children}
      </span>
    </button>
  );
};
