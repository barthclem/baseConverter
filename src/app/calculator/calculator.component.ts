import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  form: FormGroup;

  binaryInput: FormControl;
  octalInput: FormControl;
  decimalInput: FormControl;
  hexadecimalInput: FormControl;


  constructor() {

  }

  ngOnInit() {
    this.createFormControls();
    this.createFormGroup();
  }

  createFormControls(): void {
    this.binaryInput = new FormControl('', Validators.pattern('[01]*'));
    this.octalInput = new FormControl('', Validators.pattern('[0-7]*'));
    this.decimalInput = new FormControl('', Validators.pattern('[0-9]*'));
    this.hexadecimalInput = new FormControl('', Validators.pattern('^([0-9|A|B|C|D|E|F])*$'));
  }

  createFormGroup() {
    this.form = new FormGroup({
      'binaryInput': this.binaryInput,
      'octalInput': this.octalInput,
      'decimalInput': this.decimalInput,
      'hexadecimalInput': this.hexadecimalInput
    });
  }

  binaryEntered(binary) {
    if (this.binaryInput.valid) {
      if (binary.length === 0) {
        console.log('binary new value is empty');
        this.form.patchValue({decimalInput: ''});
        this.form.patchValue({octalInput: ''});
        this.form.patchValue({hexadecimalInput: ''});
      }else {
        this.form.patchValue({decimalInput: parseInt(binary, 2).toString(10)});
        this.form.patchValue({octalInput: parseInt(binary, 2).toString(8)});
        this.form.patchValue({hexadecimalInput: parseInt(binary, 2).toString(16).toUpperCase()});
      }

    }
  }

  octalEntered(octal) {
    if (this.octalInput.valid) {
      if ( octal.length === 0 ) {
        this.form.patchValue({decimalInput: ''});
        this.form.patchValue({binaryInput: ''});
        this.form.patchValue({hexadecimalInput: ''});
      } else {
        this.form.patchValue({decimalInput: parseInt(octal, 8).toString(10)});
        this.form.patchValue({binaryInput: parseInt(octal, 8).toString(2)});
        this.form.patchValue({hexadecimalInput: parseInt(octal, 8).toString(16).toUpperCase()});
      }
    }
  }

  decimalEntered(decimal) {
    if (this.decimalInput.valid) {
      if ( decimal.length === 0 ) {
        this.form.patchValue({octalInput: ''});
        this.form.patchValue({binaryInput: ''});
        this.form.patchValue({hexadecimalInput: ''});
      } else {
        this.form.patchValue({binaryInput: parseInt(decimal, 10).toString(2)});
        this.form.patchValue({octalInput: parseInt(decimal, 10).toString(8)});
        this.form.patchValue({hexadecimalInput: parseInt(decimal, 10).toString(16).toUpperCase()});
      }
    }
  }

  hexadecimalEntered(hexadecimal) {
   if (this.hexadecimalInput.valid) {
     if (hexadecimal.length === 0) {
       this.form.patchValue({octalInput: ''});
       this.form.patchValue({binaryInput: ''});
       this.form.patchValue({decimalInput: ''});
     } else {
       this.form.patchValue({decimalInput: parseInt(hexadecimal, 16).toString(10)});
       this.form.patchValue({octalInput: parseInt(hexadecimal, 16).toString(8)});
       this.form.patchValue({binaryInput: parseInt(hexadecimal, 16).toString(2)});
     }
    }
  }


}
