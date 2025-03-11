export type FormValues = {
  value: number;
  fromUnit: string;
  toUnit: string;
};

export type Unit = {
  name: string;
  symbol: string;
};

export type UnitTypeName = 'length' | 'weight' | 'temperature';

export type ConversionResult = {
  value: number;
  unit: string;
};
