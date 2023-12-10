import PropTypes from 'prop-types';
import { useState } from 'react';
import { circleX } from '@/assets/icons/svg-icons';
import { circleAlert } from '@/assets/icons/svg-icons';
import { searchGrey } from '@/assets/icons/svg-icons';

function PlaceholderLine({
  name,
  label,
  placeholder,
  type,
  size,
  onChange,
  isValid,
  errorMessage,
}) {
  const [value, setValue] = useState('');

  const handleClearInput = () => {
    setValue('');
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  const hasValue = value !== '';

  const errorClass =
    hasValue && !isValid
      ? 'border-[1px] -border--system-danger focus:-border--system-danger -caret--system-danger'
      : 'border-[1px] -border--primary-blue500  -caret--primary-blue500';

  // Message 컴포넌트를 함수로 변경
  const Message = () => {
    if (!errorMessage || errorMessage === '') {
      return null;
    }
    const messageText = isValid ? (
      ''
    ) : (
      <span className="pt-1 text-body5 -text--system-danger">
        {errorMessage}
      </span>
    );

    return <div className="message">{messageText}</div>;
  };

  return (
    <div className="relative flex flex-col w-full">
      <label htmlFor={name} className="sr-only">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={`w-full h-auto py-2
        focus:outline-none rounded-lg pl-4 hide-clear-button box-border ${errorClass}  
        ${size === 'small' ? 'text-body4' : 'text-body3'}`}
      />
      <div className="absolute flex gap-1 top-2 right-2">
        {hasValue && !isValid ? (
          <img src={circleAlert} alt="오류" />
        ) : (
          <>
            {hasValue && (
              <button className="" onClick={handleClearInput}>
                <img src={circleX} alt="삭제" />
              </button>
            )}
            <button className=" top-2 right-2" onClick="">
              <img src={searchGrey} alt="검색" />
            </button>
          </>
        )}
      </div>
      {hasValue && <Message />}
    </div>
  );
}

export default PlaceholderLine;

PlaceholderLine.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  size: PropTypes.string,
  onChange: PropTypes.func,
  isValid: PropTypes.bool,
  errorMessage: PropTypes.string,
};
