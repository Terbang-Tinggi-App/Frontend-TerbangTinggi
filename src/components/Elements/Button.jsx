/**
 *
 * @param {React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>} props
 */
export function Button(props) {
  const { children, className, variant, ...rest } = props;

  return (
    <button
      className={`w-full max-w-sm font-semibold btn  ${
        variant ? '' : 'bg-brand hover:bg-brand-darker-800'
      } ${className}`}
      type="button"
      {...rest}>
      {children}
    </button>
  );
}

export default Button;
