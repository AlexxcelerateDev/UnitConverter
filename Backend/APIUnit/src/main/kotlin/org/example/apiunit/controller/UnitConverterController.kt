package org.example.apiunit.controller

import jakarta.validation.constraints.NotBlank
import org.example.apiunit.model.LengthUnit
import org.example.apiunit.model.TemperatureUnit
import org.example.apiunit.model.WeightUnit
import org.example.apiunit.service.UnitConverterService
import org.springframework.http.ResponseEntity
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/converter")
@Validated
class UnitConverterController(
    private val unitConverterService: UnitConverterService,
    private val lengthUnits: List<LengthUnit>,
    private val weightUnits: List<WeightUnit>,
    private val temperatureUnits: List<TemperatureUnit>
) {

    @GetMapping("/length")
    fun convertLength(
        @RequestParam value: Double,
        @RequestParam @NotBlank from: String,
        @RequestParam @NotBlank to: String
    ): ResponseEntity<ConversionResponse> {
        val result = unitConverterService.convertLength(value, from, to)
        return ResponseEntity.ok(ConversionResponse(value, from, to, result))
    }

    @GetMapping("/weight")
    fun convertWeight(
        @RequestParam value: Double,
        @RequestParam @NotBlank from: String,
        @RequestParam @NotBlank to: String
    ): ResponseEntity<ConversionResponse> {
        val result = unitConverterService.convertWeight(value, from, to)
        return ResponseEntity.ok(ConversionResponse(value, from, to, result))
    }

    @GetMapping("/temperature")
    fun convertTemperature(
        @RequestParam value: Double,
        @RequestParam @NotBlank from: String,
        @RequestParam @NotBlank to: String
    ): ResponseEntity<ConversionResponse> {
        val result = unitConverterService.convertTemperature(value, from, to)
        return ResponseEntity.ok(ConversionResponse(value, from, to, result))
    }

    @GetMapping("/units/length")
    fun getAvailableLengthUnits(): ResponseEntity<List<UnitInfo>> {
        return ResponseEntity.ok(lengthUnits.map { UnitInfo(it.name, it.symbol) })
    }

    @GetMapping("/units/weight")
    fun getAvailableWeightUnits(): ResponseEntity<List<UnitInfo>> {
        return ResponseEntity.ok(weightUnits.map { UnitInfo(it.name, it.symbol) })
    }

    @GetMapping("/units/temperature")
    fun getAvailableTemperatureUnits(): ResponseEntity<List<UnitInfo>> {
        return ResponseEntity.ok(temperatureUnits.map { UnitInfo(it.name, it.symbol) })
    }

    data class ConversionResponse(
        val originalValue: Double,
        val fromUnit: String,
        val toUnit: String,
        val result: Double
    )

    data class UnitInfo(val name: String, val symbol: String)
}