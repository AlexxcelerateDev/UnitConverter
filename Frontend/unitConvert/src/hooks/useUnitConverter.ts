import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ConversionResult, FormValues, Unit, UnitTypeName } from '../types';

export function useUnitConverter() {
  const [unitType, setUnitType] = useState<UnitTypeName>('length');
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);
  const [converting, setConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ConversionResult | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormValues>();

  const watchedFields = watch();

  useEffect(() => {
    setResult(null);
  }, [watchedFields.value, watchedFields.fromUnit, watchedFields.toUnit]);

  const onSubmit = async (data: FormValues) => {
    try {
      setConverting(true);
      setError(null);

      const queryParams = new URLSearchParams({
        value: data.value.toString(),
        from: data.fromUnit,
        to: data.toUnit,
      });

      const url = `http://localhost:8080/api/converter/${unitType}?${queryParams.toString()}`;

      console.log('Request URL:', url);
      console.log('Request data:', {
        value: data.value,
        from: data.fromUnit,
        to: data.toUnit,
      });

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        throw new Error(`Error en la conversión: ${response.status}`);
      }

      const responseText = await response.text();
      console.log('Raw response:', responseText);

      let conversionResult;
      try {
        conversionResult = JSON.parse(responseText);
        console.log('Parsed conversion result:', conversionResult);
      } catch (e) {
        console.error('Error parsing JSON response:', e);
        throw new Error('La respuesta no es un JSON válido');
      }

      if (conversionResult) {
        if (typeof conversionResult.result !== 'undefined') {
          setResult({
            value: Number(conversionResult.result),
            unit: conversionResult.toUnit || data.toUnit,
          });
        } else if (typeof conversionResult.value !== 'undefined') {
          setResult({
            value: Number(conversionResult.value),
            unit:
              conversionResult.unit || conversionResult.toUnit || data.toUnit,
          });
        } else {
          const possibleValue =
            conversionResult.convertedValue ||
            conversionResult.resultValue ||
            conversionResult.output;

          const possibleUnit =
            conversionResult.unit ||
            conversionResult.targetUnit ||
            conversionResult.toUnit ||
            data.toUnit;

          if (possibleValue !== undefined) {
            setResult({
              value: Number(possibleValue),
              unit: possibleUnit || '',
            });
          } else {
            throw new Error(
              'No se pudo interpretar el resultado de la conversión'
            );
          }
        }
      } else {
        throw new Error('Formato de respuesta inesperado');
      }
    } catch (error) {
      console.error('Error during conversion:', error);
      setError(
        'Ocurrió un error durante la conversión. Por favor intenta nuevamente.'
      );
    } finally {
      setConverting(false);
    }
  };

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:8080/api/converter/units/${unitType}`
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Units data:', data);
        setUnits(data);
        setError(null);
        setResult(null);
      } catch (error) {
        console.error('Error fetching units:', error);
        setError('Failed to fetch units. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUnits();
  }, [unitType]);

  return {
    unitType,
    setUnitType,
    units,
    loading,
    converting,
    error,
    result,
    register,
    handleSubmit,
    errors,
    reset,
    onSubmit,
    watch,
  };
}
