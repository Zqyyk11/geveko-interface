export const products = [
  { id: 'plastiroutecsp', name: 'PlastiRoute® CSP' },
  { id: 'plastirouterp', name: 'PlastiRoute® RP' },
  { id: 'plastiroutefp', name: 'PlastiRoute® FP' },
  { id: 'plastiroutespotline', name: 'PlastiRoute® SpotLine' },
  { id: 'plastirouterollplast', name: 'PlastiRoute® RollPlast' },
  { id: 'plastirouterollgrip', name: 'PlastiRoute® RollGrip' },
  { id: 'plastiroutesprayplast', name: 'PlastiRoute® SprayPlast'},
  { id: 'plastiroutespraygrip', name: 'PlastiRoute® SprayGrip' }
]; 

export const calculateFullLine = (
  weight: string,
  density: string,
  thickness: string,
  area: string
) => {
  const w = Math.max(0, parseFloat(weight));
  const d = Math.max(0, parseFloat(density));
  const t = Math.max(0, parseFloat(thickness));
  const a = Math.max(0, parseFloat(area));

  if (!isNaN(d) && !isNaN(t) && !isNaN(a)) {
    return {
      weight: (d * a * t).toFixed(2),
      density,
      thickness,
      area,
    };
  } else if (!isNaN(w) && !isNaN(t) && !isNaN(a)) {
    return {
      weight,
      density: (w / (a * t)).toFixed(2),
      thickness,
      area,
    };
  } else if (!isNaN(w) && !isNaN(d) && !isNaN(a)) {
    return {
      weight,
      density,
      thickness: (w / (d * a)).toFixed(2),
      area,
    };
  } else if (!isNaN(w) && !isNaN(d) && !isNaN(t)) {
    return {
      weight,
      density,
      thickness,
      area: (w / (d * t)).toFixed(2),
    };
  }
  return { weight, density, thickness, area };
};

export const calculateAgglomerate = (density: string, area: string) => {
  const d = Math.max(0, parseFloat(density));
  const a = Math.max(0, parseFloat(area));

  if (!isNaN(d) && !isNaN(a)) {
    return (d * a).toFixed(2);
  }
  return '';
};

export const canCalculateFullLine = (inputs: string[]) => {
  return inputs.filter(value => value !== '').length === 3;
};

export const canCalculateAgglomerate = (density: string, area: string) => {
  return density !== '' && area !== '';
};