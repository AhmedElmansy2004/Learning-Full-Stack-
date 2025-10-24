import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { CalculatorService } from './services/calculator.service';
import { response } from 'express';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})

export class App {
  mainNum = "";
  subDisplay = "";
  
  operandX = "";
  overwriteX = false;

  operandY = "";
  placeHolder = "";

  operator = "";

  hasError = !(this.mainNum == "");

  constructor(private calcService: CalculatorService,
              private cdr: ChangeDetectorRef
  ) {}

  writeOnDisplay(num: string){
    if (this.mainNum == "") {
        this.mainNum = num;
        this.overwriteX = false;
        this.hasError=false;
    }
    else if (this.overwriteX) {
      this.mainNum = num;
      this.overwriteX = false;
      if(this.operator == "=") this.operandX = num;
      else this.operandY = num;
    }
    else {
      this.mainNum += num;
    }
  }

  clear(){
    this.mainNum = "";
    this.subDisplay = '';
    this.operandX = "";
    this.operandY = "";
    this.overwriteX = false;
    this.placeHolder = "";
    this.hasError = true;
  }

  delete(){
    this.mainNum = this.mainNum.slice(0,-1);
    if (this.mainNum == "") {
      this.mainNum = "";
      this.hasError = true;
    }
  }

  addPnt(){
    if (!this.mainNum.includes(".")) {
      this.mainNum += ".";
    }
  }

  putSign(){
    if (this.mainNum!="0") {
      if (this.mainNum.startsWith("-")) {
        this.mainNum = this.mainNum.slice(1);
      }
      else{
        this.mainNum = "-" + this.mainNum;
      }
    }
    
  }

  isUnaryOperator(op: string){
    return (op == "inv" || op == "sqr" || op == "√" || op == "per")
  }

  isBinaryOperator(op: string){
    return (op == "+" || op == "-" || op == "×" || op == "÷");
  }

  doOperation(op: string){
    if (this.operandY == "") {
      this.operator = op;
      if (this.isUnaryOperator(op)) {
        this.unaryCalc(op);
        this.operandX = this.mainNum;
        this.overwriteX = true;
      }
      else if (this.isBinaryOperator(op)) {
        this.overwriteX = true;
        this.subDisplay = this.mainNum + ' ' + op;
        this.operandX = this.mainNum;
      }
      else if (op == "=") {
        this.overwriteX = true;
        this.subDisplay = this.mainNum + ' ' + op;
      }
    }
    else {
      if(this.isUnaryOperator(op)){
        this.placeHolder = this.operandY;
        this.calcService.unaryOperate(this.mainNum, op)
            .subscribe({
              next: (response) => {
            this.operandY = response;
            this.cdr.detectChanges();
            console.log(response);
            this.binaryCalc(op, 2);
          },
          error: (err) => {
            this.subDisplay = `${this.operandX} ${this.operator} ${op}(${this.placeHolder})`;
            this.displayerror(err);
          }
        });
        
      }
      else if (this.isBinaryOperator(op)) {
        if (this.mainNum !== "") {
          this.operandY = this.mainNum;
        }

        this.binaryCalc(op, 0);
        this.operandX = this.mainNum;
        this.overwriteX = true;
        this.operator = op;
      }
      else if (op == "=") {
        if (this.mainNum !== "") {
          this.operandY = this.mainNum
        }
        this.binaryCalc(op, 1);
        this.overwriteX = true;
      }
      
    }
  }

  unaryCalc(op: string){
    this.subDisplay = op + '( ' + this.mainNum + ' )';
    
    this.calcService.unaryOperate(this.mainNum, op)
        .subscribe({
          next: (response) => {
            this.mainNum = response;
            this.cdr.detectChanges();
            console.log(response);

            this.operator = "=";
            this.operandY = "";
          },
          error: (err) => {
            this.displayerror(err);
          }
        });
  }

  binaryCalc(op: string, flag: number){
    
    this.calcService.binaryOperate(this.operandX, this.operandY, this.operator)
        .subscribe({
          next: (response) => {
            this.mainNum = response;
            switch (flag) {
              case 0:
                this.subDisplay = `${this.mainNum} ${op}`;
                this.operandY = "";
                break;
              case 1:
                this.subDisplay = `${this.operandX} ${this.operator} ${this.operandY} ${op}`;
                break;
              case 2:
                this.subDisplay = `${this.operandX} ${this.operator} ${op}(${this.placeHolder})`;
                break;
            }
            this.cdr.detectChanges();
            console.log(response);
          },
          error: (err) => {
            this.displayerror(err);
          }
        });
  }


  displayerror(errMsg: any){
    console.error('Calculation error: ', errMsg);
    this.mainNum = 'Error';
    this.hasError = true;
    this.cdr.detectChanges();
  }



}


