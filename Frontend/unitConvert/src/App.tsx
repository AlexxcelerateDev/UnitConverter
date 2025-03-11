import { Button } from './components/button';
import Container from './components/container';
import {
  ErrorMessageInfoIcon,
  Field,
  FieldGroup,
  Fieldset,
  Label,
} from './components/fieldset';
import { Heading } from './components/heading';
import { Input } from './components/input';
import { RadioGroup, Radio, RadioField } from './components/radio';
import { Select } from './components/select';
import { UnitTypeName } from './types';
import { useUnitConverter } from './hooks/useUnitConverter';
import { AnimatePresence, motion } from 'motion/react';
function App() {
  const {
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
  } = useUnitConverter();

  const selectedValue = watch('value');
  const selectedFromUnit = watch('fromUnit');
  return (
    <>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Heading level={2} className="text-lg font-semibold mb-6 text-center">
            Unit converter
          </Heading>

          {error && (
            <motion.div
              className="text-red-500 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Fieldset>
              <FieldGroup>
                <RadioGroup
                  name="unitType"
                  defaultValue={unitType}
                  aria-label="Select unit type"
                  value={unitType}
                  onChange={(value) => setUnitType(value as UnitTypeName)}
                  className="flex flex-wrap gap-4"
                >
                  <motion.div
                    className="flex gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <RadioField>
                      <Radio color="blue" value="length" />
                      <Label>Length</Label>
                    </RadioField>

                    <RadioField>
                      <Radio color="green" value="weight" />
                      <Label>Weight</Label>
                    </RadioField>

                    <RadioField>
                      <Radio color="amber" value="temperature" />
                      <Label>Temperature</Label>
                    </RadioField>
                  </motion.div>
                </RadioGroup>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Field>
                    <Label>Value</Label>
                    <Input
                      placeholder="Enter value"
                      type="number"
                      {...register('value', {
                        required: 'Value is required',
                        valueAsNumber: true,
                      })}
                    />
                    {errors.value && (
                      <ErrorMessageInfoIcon>
                        {errors.value.message}
                      </ErrorMessageInfoIcon>
                    )}
                  </Field>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Field>
                    <Label>From</Label>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={unitType}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          damping: 25,
                        }}
                      >
                        <Select
                          {...register('fromUnit', {
                            required: 'From unit is required',
                          })}
                        >
                          <option value="">Select unit</option>
                          {units.map((unit) => (
                            <option key={unit.symbol} value={unit.symbol}>
                              {unit.name}
                            </option>
                          ))}
                        </Select>
                      </motion.div>
                    </AnimatePresence>
                    {errors.fromUnit && (
                      <ErrorMessageInfoIcon>
                        {errors.fromUnit.message}
                      </ErrorMessageInfoIcon>
                    )}
                  </Field>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Field>
                    <Label>To</Label>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={unitType}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          damping: 25,
                        }}
                      >
                        <Select
                          {...register('toUnit', {
                            required: 'To unit is required',
                          })}
                        >
                          <option value="">Select unit</option>
                          {units.map((unit) => (
                            <option key={unit.symbol} value={unit.symbol}>
                              {unit.name}
                            </option>
                          ))}
                        </Select>
                      </motion.div>
                    </AnimatePresence>
                    {errors.toUnit && (
                      <ErrorMessageInfoIcon>
                        {errors.toUnit.message}
                      </ErrorMessageInfoIcon>
                    )}
                  </Field>
                </motion.div>
                <motion.div
                  className="flex gap-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.div
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <Button type="submit" disabled={loading || converting}>
                      {converting
                        ? 'Convirtiendo...'
                        : loading
                        ? 'Cargando...'
                        : 'Convert'}
                    </Button>
                  </motion.div>
                  <motion.div
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <Button plain onClick={() => reset()}>
                      Reset
                    </Button>
                  </motion.div>
                </motion.div>

                <AnimatePresence mode="wait">
                  {result && (
                    <motion.div
                      key="result"
                      className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg shadow-sm"
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                          type: 'spring',
                          stiffness: 300,
                          damping: 15,
                        },
                      }}
                      exit={{
                        opacity: 0,
                        y: -20,
                        scale: 0.95,
                        transition: { duration: 0.2 },
                      }}
                    >
                      <motion.p
                        className="mt-2 text-green-700 text-center font-medium"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: 1,
                          transition: { delay: 0.2 },
                        }}
                      >
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: 1,
                            transition: { delay: 0.3 },
                          }}
                        >
                          Result of your calculation:
                        </motion.span>{' '}
                        <motion.span
                          className="font-semibold"
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: 1,
                            transition: { delay: 0.4 },
                          }}
                        >
                          {selectedValue} {selectedFromUnit} = {result.value}{' '}
                          {result.unit}
                        </motion.span>
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </FieldGroup>
            </Fieldset>
          </form>
        </motion.div>
      </Container>
    </>
  );
}

export default App;
