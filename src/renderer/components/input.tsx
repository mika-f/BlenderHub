import React from "react";

type Props = {
  value: string;
  className?: string;
  disabled?: boolean;
  readonly?: boolean;
  onValueChanged?: (newValue: string) => void;
};

const Input: React.VFC<Props> = ({ value, className, disabled, readonly, onValueChanged }) => {
  const onValueChangedInternal = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onValueChanged) {
      onValueChanged(e.target.value);
    }
  };

  return (
    <div className={className}>
      <input
        type="text"
        className="w-full border-b focus:border-blue-500 border-surface-light005 dark:border-surface-light005 bg-transparent px-1 py-2 focus:outline-none"
        value={value}
        disabled={disabled}
        readOnly={readonly}
        onChange={onValueChangedInternal}
      />
    </div>
  );
};

export default Input;
