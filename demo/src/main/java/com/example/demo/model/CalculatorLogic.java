package com.example.demo.model;
/*This is file where all the calculator logic is done here */

public class CalculatorLogic {

    /*
     * This function does all unary operations which requires only one operand
     * @param num: is the only operand
     * @param op: the operator such as % , 1/ , √ and sqr
     * 
     * throws an error on illegal calculations
     */
    public double unaryOperation(double num, String operator){
        
        switch(operator) {
            case "inv":
                if(num == 0)
                    throw new ArithmeticException("Cannot divide by zero");

                else
                    return (1.0/num);

            case "√":
                if(num < 0)
                    throw new ArithmeticException("Cannot compute imaginary numbers");

                else
                    return Math.sqrt(num);
            
            case "sqr": return (num*num);

            case "per": return (num/100);
        
            default: return 0;
        }
    }

    /*
     * This function does all binary operations which requires only one operand
     * @param num: is the first operand
     * @param num: is the second operand
     * @param op: the operator such as + , - , × and ÷
     * 
     * throws an error on illegal calculations
     */
    public double binaryOperation(double num1, double num2 , String operator){
        
        switch(operator) {
            case "+": return (num1+num2);

            case "-": return (num1-num2);
            
            case "×": return (num1*num2);

            case "÷": 
                if(num2 == 0)
                    throw new ArithmeticException("Cannot divide by zero");

                else
                    return (num1/num2);

            default: return 0;
        }
    }
    
}
