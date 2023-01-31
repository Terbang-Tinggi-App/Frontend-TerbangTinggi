/**
 *
 * @param {React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>} props
 * @returns
 */
export function AirlineSelect(props) {
  const { className, ...rest } = props;
  return (
    <select className={`select select-primary w-full max-w-xs ${className}`} {...rest}>
      <option value={JSON.stringify({ name: 'Garuda Indonesia', iata: 'GA' })}>
        Garuda Indonesia
      </option>
      <option value={JSON.stringify({ name: 'Batik Air', iata: 'ID' })}>Batik Air</option>
      <option value={JSON.stringify({ name: 'Citilink', iata: 'QG' })}>Citilink</option>
      <option value={JSON.stringify({ name: 'Air Asia', iata: 'QZ' })}>Air Asia</option>
      <option value={JSON.stringify({ name: 'Lion Air', iata: 'JT' })}>Lion Air</option>
      <option value={JSON.stringify({ name: 'Wings Air', iata: 'IW' })}>Wings Air</option>
      <option value={JSON.stringify({ name: 'Super Air Jet', iata: 'IU' })}>Super Air Jet</option>
    </select>
  );
}
