/*This is file where the files are prepared to be communicated with the backend */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CalculatorService {
  private backendUrl = 'http://localhost:8080/api/calculator';
  
  constructor(private http: HttpClient) {}

  unaryOperate(num: string, op: string): Observable<any> {
    const body = { num, op };
    return this.http.put(`${this.backendUrl}/unaryOperate`, body, { responseType: 'text' });
  }

  binaryOperate(num1: string, num2: string, op: string): Observable<any> {
    const body = { num1, num2, op };
    return this.http.put(`${this.backendUrl}/binaryOperate`, body, { responseType: 'text' });
  }
}
