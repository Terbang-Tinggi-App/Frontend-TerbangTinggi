export function RadioButton({ label, value, onChange, id, name, title }) {
  return (
    <div className="flex gap-2 items-center">
      <input
        type="radio"
        id={id}
        name={name}
        checked={value}
        onChange={onChange}
        className="radio radio-primary checked:bg-brand border-brand-hover checked:border-brand-hover"
        title={title}
      />
      <label className="font-semibold cursor-pointer select-none" htmlFor={id}>
        {label}
      </label>
    </div>
  );
}

export default RadioButton;
