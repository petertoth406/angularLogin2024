import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder

  ) { 
      this.form = fb.group(
        {
          name: ["Alma", [Validators.minLength(5)]],
          price: [0, [Validators.min(1)]],
          category: ['', []],
          description: ['', []],
        }
      )

  }

  click(){
    console.log(this.form)

    if(this.form.invalid){
      alert("A form nem valid")
    }

    /*console.log(this.form.get('name')?.value)
    this.form.get('name')?.patchValue("Körte");
    console.log(this.form.get('name')?.value)*/
  }

  ngOnInit(): void {
  }

}
