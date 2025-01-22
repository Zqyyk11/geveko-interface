export const products = [
  { id: 'viatherm', name: 'ViaTherm®' },
  { id: 'vialux', name: 'ViaLux®' },
  { id: 'viapaint', name: 'ViaPaint®' },
];

export const calculateMissing = (
  weight: string,
  density: string,
  thickness: string,
  area: string
) => {
  const w = parseFloat(weight);
  const d = parseFloat(density);
  const t = parseFloat(thickness);
  const a = parseFloat(area);

  if (!isNaN(d) && !isNaN(t) && !isNaN(a)) {
    return {
      weight: ((d * a * t) / 1000).toFixed(2),
      density,
      thickness,
      area,
    };
  } else if (!isNaN(w) && !isNaN(t) && !isNaN(a)) {
    return {
      weight,
      density: ((w * 1000) / (a * t)).toFixed(2),
      thickness,
      area,
    };
  } else if (!isNaN(w) && !isNaN(d) && !isNaN(a)) {
    return {
      weight,
      density,
      thickness: ((w * 1000) / (d * a)).toFixed(2),
      area,
    };
  } else if (!isNaN(w) && !isNaN(d) && !isNaN(t)) {
    return {
      weight,
      density,
      thickness,
      area: ((w * 1000) / (d * t)).toFixed(2),
    };
  }
  return { weight, density, thickness, area };
};

export const canCalculate = (inputs: string[]) => {
  return inputs.filter(value => value !== '').length === 3;
};