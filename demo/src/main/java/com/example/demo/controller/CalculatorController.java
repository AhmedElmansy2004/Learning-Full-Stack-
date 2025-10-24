package com.example.demo.controller;
/*This is file where the files are prepared to be communicated with the frontend */

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.CalculatorService;

@RestController
@RequestMapping("/api/calculator")
@CrossOrigin(origins = "http://localhost:4200")
public class CalculatorController {

    private final CalculatorService service;

    public CalculatorController(CalculatorService service) {
        this.service = service;
    }

    @PutMapping("/unaryOperate")
    public ResponseEntity<String> unaryOperate(@RequestBody Map<String, String> body) {
        try {
            String num = body.get("num");
            String op = body.get("op");

            String result = service.operate(num, op);
            return ResponseEntity.ok(result);
        } 
        catch (ArithmeticException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        } 
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Unexpected error occurred");
        }
    }

    @PutMapping("/binaryOperate")
    public ResponseEntity<String> binaryOperate(@RequestBody Map<String, String> body) {
        try {
            String num1 = body.get("num1");
            String num2 = body.get("num2");
            String op = body.get("op");

            String result = service.operate(num1, num2, op);
            return ResponseEntity.ok(result);
        } 
        catch (ArithmeticException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        } 
        catch (Exception e) {
            return ResponseEntity.internalServerError()
                                 .body("Unexpected error occurred");
        }
    }
}
