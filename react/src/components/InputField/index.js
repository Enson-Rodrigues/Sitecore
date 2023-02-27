import React from 'react';

const InputField = (props) => {
  const {
    input,
    id,
    classList,
    labelText,
    placeholder,
    type,
    register,
    error,
    targetElement,
    requiredMsg,
    dataTestid = 'inputFileld',
    patternRegex,
    patternErrorMsg,
    onKeyPress,
    onBlur,
    onPaste,
    patternVal,
    customValidate,
    maxLength,
    maxLengthMsg,
    minLength,
    minLengthMsg,
  } = props;

  let element;

  // User wont be allowed to add space in input field
  const onKeyPressHandle = (e) => {
    !!onKeyPress && onKeyPress(e);
  };

  const onKeyPasteHandler = (e) => {
    !!onPaste && onPaste(e);
  };

  const onBlurHandler = (e) => {
    !!onBlur && onBlur(e);
  };

  element = (
    <>
      <label className={error?.hasOwnProperty(targetElement) ? 'error-font' : ''} htmlFor={id}>
        {labelText}
      </label>

      <input
        className={
          classList + (error?.hasOwnProperty(targetElement) ? ' error-border error-font' : '')
        }
        {...input}
        id={id}
        type={type}
        {...register(targetElement, {
          required: requiredMsg,
          pattern: { value: patternRegex, message: patternErrorMsg },
          validate: customValidate,
          maxLength: { value: maxLength, message: maxLengthMsg },
          minLength: { value: minLength, message: minLengthMsg },
          onBlur: (e) => onBlurHandler(e),
        })}
        placeholder={placeholder}
        onKeyPress={onKeyPressHandle}
        onPaste={onKeyPasteHandler}
        autoComplete="off"
        pattern={patternVal || ''}
      />

      {error?.hasOwnProperty(targetElement) && (
        <p className="error-block">
          <span>{error[targetElement]?.message}</span>
        </p>
      )}
    </>
  );

  return element;
};

export default InputField;
