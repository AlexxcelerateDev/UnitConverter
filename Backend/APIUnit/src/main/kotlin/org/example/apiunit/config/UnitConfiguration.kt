package org.example.apiunit.config

import org.example.apiunit.model.LengthUnit
import org.example.apiunit.model.TemperatureUnit
import org.example.apiunit.model.WeightUnit
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class UnitConfiguration {

    @Bean
    fun meter() = LengthUnit("Meter", "m", 1.0)

    @Bean
    fun kilometer() = LengthUnit("Kilometer", "km", 1000.0)

    @Bean
    fun mile() = LengthUnit("Mile", "mi", 1609.34)

    @Bean
    fun millimeter() = LengthUnit("Millimeter", "mm", 0.001)

    @Bean
    fun centimeter() = LengthUnit("Centimeter", "cm", 0.01)

    @Bean
    fun inch() = LengthUnit("Inch", "in", 0.0254)

    @Bean
    fun foot() = LengthUnit("Foot", "ft", 0.3048)

    @Bean
    fun yard() = LengthUnit("Yard", "yd", 0.9144)

    // Weight units
    @Bean
    fun kilogram() = WeightUnit("Kilogram", "kg", 1.0)

    @Bean
    fun pound() = WeightUnit("Pound", "lb", 0.453592)

    @Bean
    fun milligram() = WeightUnit("Milligram", "mg", 0.000001)

    @Bean
    fun gram() = WeightUnit("Gram", "g", 0.001)

    @Bean
    fun ounce() = WeightUnit("Ounce", "oz", 0.0283495)

    // Temperature units
    @Bean
    fun kelvin() = TemperatureUnit("Kelvin", "K",
        conversionToKelvin = { it },
        conversionFromKelvin = { it }
    )

    @Bean
    fun celsius() = TemperatureUnit("Celsius", "°C",
        conversionToKelvin = { it + 273.15 },
        conversionFromKelvin = { it - 273.15 }
    )

    @Bean
    fun fahrenheit() = TemperatureUnit("Fahrenheit", "°F",
        conversionToKelvin = { (it - 32.0) * 5.0/9.0 + 273.15 },
        conversionFromKelvin = { (it - 273.15) * 9.0/5.0 + 32.0 }
    )
}