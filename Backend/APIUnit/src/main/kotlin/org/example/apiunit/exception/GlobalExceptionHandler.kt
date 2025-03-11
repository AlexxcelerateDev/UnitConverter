package org.example.apiunit.exception

import jakarta.validation.ConstraintViolationException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.MissingServletRequestParameterException
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException

@ControllerAdvice
class GlobalExceptionHandler {

    @ExceptionHandler(IllegalArgumentException::class)
    fun handleIllegalArgumentException(ex: IllegalArgumentException): ResponseEntity<ErrorResponse> {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body(ErrorResponse(HttpStatus.BAD_REQUEST.value(), ex.message ?: "Unidad no encontrada"))
    }

    @ExceptionHandler(ConstraintViolationException::class)
    fun handleConstraintViolationException(ex: ConstraintViolationException): ResponseEntity<ErrorResponse> {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body(ErrorResponse(HttpStatus.BAD_REQUEST.value(), "Parámetro inválido: ${ex.message}"))
    }

    @ExceptionHandler(MissingServletRequestParameterException::class)
    fun handleMissingParams(ex: MissingServletRequestParameterException): ResponseEntity<ErrorResponse> {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body(ErrorResponse(HttpStatus.BAD_REQUEST.value(), "Falta el parámetro: ${ex.parameterName}"))
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException::class)
    fun handleTypeMismatch(ex: MethodArgumentTypeMismatchException): ResponseEntity<ErrorResponse> {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body(ErrorResponse(HttpStatus.BAD_REQUEST.value(),
                "El parámetro '${ex.name}' debe ser de tipo ${ex.requiredType?.simpleName}"))
    }

    @ExceptionHandler(Exception::class)
    fun handleGenericException(ex: Exception): ResponseEntity<ErrorResponse> {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "Error interno del servidor: ${ex.message}"))
    }

    @ExceptionHandler(NoSuchElementException::class)
    fun handleNotFoundException(ex: NoSuchElementException): ResponseEntity<ErrorResponse> {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(ErrorResponse(HttpStatus.NOT_FOUND.value(), ex.message ?: "Recurso no encontrado"))
    }

    data class ErrorResponse(val status: Int, val message: String)
}