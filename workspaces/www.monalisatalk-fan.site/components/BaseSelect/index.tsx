import React, { useCallback, useEffect, useMemo } from 'react';
import type { ReactiveState } from '@lollipop-onl/react-reactive-state';
import { noop } from '~/helpers/noop';
import styles from './index.module.css';

export type SelectOption<T = unknown> = {
  value: T;
  label: string | number | boolean;
  disabled?: boolean;
};

export type Props = React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> & {
  model: ReactiveState<unknown>;
  options: SelectOption[];
  label: ReactiveState<string | number | boolean>;
  placeholder?: string;
};

export const BaseSelect: React.FC<Props> = ({ children, model, options, label, placeholder = 'placeholder value', onChange = noop, ...props }) => {
  const activeIndex = useMemo(() => options.findIndex(({ value }) => model.value === value), [options, model]);

  const onChangeValue = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = +e.target.value;
    const option = options[index];

    if (option) {
      model.value = option.value;
    } else {
      model.value = null;
    }

    onChange(e);
  }, [options, model, onChange]);

  useEffect(() => {
    const option = options[activeIndex];

    if (option) {
      label.value = option.label;
    } else {
      label.value = placeholder;
    }
  }, [options, activeIndex, label, placeholder]);

  return (
    <div className={styles.baseSelect}>
      <select {...props} value={activeIndex} className={styles.field} onChange={onChangeValue}>
        <option value={-1} style={{ display: 'none' }} disabled>{placeholder}</option>
        { options.map(({ label, disabled }, index) => (
          <option key={index} value={index} disabled={disabled}>{label}</option>
        ))}
      </select>
      <div className={styles.select}>
        {children}
      </div>
    </div>
  );
};

