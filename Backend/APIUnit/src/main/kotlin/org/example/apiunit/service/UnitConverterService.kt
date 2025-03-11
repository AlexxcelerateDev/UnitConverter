package org.example.apiunit.service

import org.example.apiunit.model.*
import org.springframework.stereotype.Service

@Service
class UnitConverterService(
    // Inyección de todas las unidades definidas en UnitConfiguration
    private val lengthUnits: List<LengthUnit>,
    private val weightUnits: List<WeightUnit>,
    private val temperatureUnits: List<TemperatureUnit>
) {

    fun convertLength(value: Double, fromUnit: String, toUnit: String): Double {
        val from = findLengthUnitBySymbol(fromUnit)
        val to = findLengthUnitBySymbol(toUnit)

        // Conversión a metros y luego a la unidad de destino
        val valueInMeters = value * from.conversionFactorToMeter
        return valueInMeters / to.conversionFactorToMeter
    }

    fun convertWeight(value: Double, fromUnit: String, toUnit: String): Double {
        val from = findWeightUnitBySymbol(fromUnit)
        val to = findWeightUnitBySymbol(toUnit)

        // Conversión a kilogramos y luego a la unidad de destino
        val valueInKilograms = value * from.conversionFactorToKilogram
        return valueInKilograms / to.conversionFactorToKilogram
    }

    fun convertTemperature(value: Double, fromUnit: String, toUnit: String): Double {
        val from = findTemperatureUnitBySymbol(fromUnit)
        val to = findTemperatureUnitBySymbol(toUnit)

        // Conversión a Kelvin y luego a la unidad de destino
        val valueInKelvin = from.conversionToKelvin(value)
        return to.conversionFromKelvin(valueInKelvin)
    }

    private fun findLengthUnitBySymbol(symbol: String): LengthUnit {
        return lengthUnits.find { it.symbol == symbol }
            ?: throw IllegalArgumentException("Unidad de longitud no encontrada: $symbol")
    }

    private fun findWeightUnitBySymbol(symbol: String): WeightUnit {
        return weightUnits.find { it.symbol == symbol }
            ?: throw IllegalArgumentException("Unidad de peso no encontrada: $symbol")
    }

    private fun findTemperatureUnitBySymbol(symbol: String): TemperatureUnit {
        return temperatureUnits.find { it.symbol == symbol }
            ?: throw IllegalArgumentException("Unidad de temperatura no encontrada: $symbol")
    }
}