import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  mainDisplayedNumber = "0";
  subDisplay = "0";
  //isOverWritable = false;

  writeOnDisplay(num: string){
    if (this.mainDisplayedNumber == "0") {
      if (num != "0") {
        this.mainDisplayedNumber = num;
      }
    }
    else {
      this.mainDisplayedNumber += num;
    }
  }

  clear(){
    this.mainDisplayedNumber = "0";
  }

  delete(){
    this.mainDisplayedNumber = this.mainDisplayedNumber.slice(0,-1);
    if (this.mainDisplayedNumber == "") {
      this.mainDisplayedNumber = "0";
    }
  }

  addPnt(){
    if (!this.mainDisplayedNumber.includes(".")) {
      this.mainDisplayedNumber += ".";
    }
  }

  putSign(){
    if (this.mainDisplayedNumber!="0") {
      if (this.mainDisplayedNumber.startsWith("-")) {
        this.mainDisplayedNumber = this.mainDisplayedNumber.slice(1);
      }
      else{
        this.mainDisplayedNumber = "-" + this.mainDisplayedNumber;
      }
    }
    
  }

}
