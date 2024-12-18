import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { ErrorType } from '../types/ErrorType';

type Props = {
  onAddTodo: (value: string) => Promise<void>;
  setErrorMessage: Dispatch<SetStateAction<ErrorType>>;
  isInputDisabled: boolean;
};

export const TodoHeader: React.FC<Props> = ({
  onAddTodo,
  setErrorMessage,
  isInputDisabled,
}) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();

    const trimmedValue = inputValue.trim();

    if (!trimmedValue) {
      setErrorMessage(ErrorType.EmptyTitle);

      return;
    }

    try {
      await onAddTodo(trimmedValue);
      setInputValue('');
    } catch {}
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [isInputDisabled]);

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />
      <form onSubmit={onSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          ref={inputRef}
          value={inputValue}
          onChange={event => setInputValue(event.target.value)}
          disabled={isInputDisabled}
        />
      </form>
    </header>
  );
};
