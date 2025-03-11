package org.example.apiunit.model

abstract class Unit(
    open val name: String,
    open val symbol: String,
    val type: UnitType
)

enum class UnitType {
    LENGTH, WEIGHT, TEMPERATURE
}

data class LengthUnit(
    override val name: String,
    override val symbol: String,
    val conversionFactorToMeter: Double
) : Unit(name, symbol, UnitType.LENGTH)

data class WeightUnit(
    override val name: String,
    override val symbol: String,
    val conversionFactorToKilogram: Double
) : Unit(name, symbol, UnitType.WEIGHT)

data class TemperatureUnit(
    override val name: String,
    override val symbol: String,
    val conversionToKelvin: (Double) -> Double,
    val conversionFromKelvin: (Double) -> Double
) : Unit(name, symbol, UnitType.TEMPERATURE)