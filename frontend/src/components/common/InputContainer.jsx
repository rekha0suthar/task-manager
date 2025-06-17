const InputContainer = ({
  label,
  inputValue,
  setState,
  type = 'text',
  placeholder,
}) => {
  return (
    <div className="input-container">
      <label>{label}</label>
      <input
        value={inputValue}
        onChange={setState}
        placeholder={placeholder}
        type={type}
        required
      />
    </div>
  );
};

export default InputContainer;
