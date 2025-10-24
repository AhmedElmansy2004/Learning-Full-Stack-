package com.example.demo.service;
/*This is file where all methods are prepared to be transfered to the controller */

import org.springframework.stereotype.Service;

import com.example.demo.model.CalculatorLogic;

@Service
public class CalculatorService {

    private final CalculatorLogic calculator = new CalculatorLogic();

    private String formateResult(double value) {
        if(value == Math.floor(value)) return String.valueOf((long) value);
        else return String.valueOf(value); 
    }

    public String operate(String num, String op) {

        return formateResult(
           calculator.unaryOperation(Double.parseDouble(num), op)
        );
    }

    public String operate(String num1, String num2, String op) {

        return formateResult(
          calculator.binaryOperation(Double.parseDouble(num1), Double.parseDouble(num2), op)
        );
    }
    
}
