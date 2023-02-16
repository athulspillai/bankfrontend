import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  //login group
  registerForm = this.fb.group({
    // array
    uname: ['', [Validators.required, Validators.pattern('[a-z A-Z]*')]],
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[0-9 a-z A-Z]*')]]

  })

  constructor(private fb: FormBuilder,private api:ApiService,private router:Router) {

  }
  Register() {
    if (this.registerForm.valid) {
      let acno = this.registerForm.value.acno
      let pswd = this.registerForm.value.pswd
      let uname = this.registerForm.value.uname
      this.api.Register(uname,acno,pswd)
      //success
      .subscribe((result:any)=>{
        alert(result.message)
        //navigate login
        this.router.navigateByUrl('')
        
      },
      //client errors
      (result:any)=>{
        alert(result.error.message)
      }
      
      )

    }
    else {
      alert('Invalid Form')
    }
  }


}

