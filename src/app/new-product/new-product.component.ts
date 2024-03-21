import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  form: FormGroup;
  invalidNameClass: string =  "alma";

  invalidControls:any [] = [];

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

    /*this.form.valueChanges.subscribe(
      
      value=>{
        console.log(value)
      },
      err=>{
        console.error(err);
      },
      ()=>{
        console.log("Form changed");
      }
    )*/

      this.form.valueChanges.subscribe(value=>{
        if(this.form.get("name")?.invalid){
          this.invalidNameClass = "error";
        }else if(this.form.get("name")?.valid){
          this.invalidNameClass = "";
        }

        this.invalidControls = [];

        for(let control in this.form.controls){
          if(this.form.get(control)?.invalid){
            this.invalidControls.push(control);
          }
        }

        console.log(this.invalidControls);
      
      })

    this.form.get('name')?.valueChanges.subscribe(
      value=>{

        let text = "A termék neve " + value.length + " karakter hosszú";

        this.form.get("description")?.patchValue(text);
      }
        
    )

    /*
      Elektronikai cikk: 5000 - 500 000
      Ruha: n - 50 000
      Étel: 100 - 10 000
    */

      this.form.get("category")?.valueChanges.subscribe(
        value => {
          console.log(value)
          switch(value){
            case "electronics": 
              this.form.get("price")?.clearValidators();

              this.form.get("price")?.addValidators(Validators.min(5000))
              this.form.get("price")?.addValidators(Validators.max(500000))

              this.form.get("price")?.updateValueAndValidity();
              break;
            case "clothes":
              this.form.get("price")?.clearValidators();

              this.form.get("price")?.addValidators(Validators.max(50000))

              this.form.get("price")?.updateValueAndValidity();
              break;
            case "food":
              this.form.get("price")?.clearValidators();

              this.form.get("price")?.addValidators(Validators.min(100))
              this.form.get("price")?.addValidators(Validators.max(10000))

              this.form.get("price")?.updateValueAndValidity();
              break;
          }
        }
      )

  }

}
