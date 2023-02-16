import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  errorMsg: string = ''
  successMsg: boolean = false

  //login group
  loginForm = this.fb.group({
    // array
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[0-9 a-z A-Z]*')]]

  })

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {

  }
  Login() {
    if (this.loginForm.valid) {
      let acno = this.loginForm.value.acno
      let pswd = this.loginForm.value.pswd

      // login api call
      this.api.login(acno, pswd)
        //success
        .subscribe((result: any) => {
          this.successMsg = true
          // store username in local storage
          localStorage.setItem("username",result.username)
          // store currentacno
          localStorage.setItem("currentAcno",JSON.stringify(result.currentAcno))
          //store token
          localStorage.setItem("token",result.token)

          //alert(result.message)
          setTimeout(() => {
            //navigate dashboard
            this.router.navigateByUrl('dashboard')
          }, 2000)


        },
          //client errors
          (result: any) => {
            this.errorMsg = result.error.message
            setTimeout(()=>{
              this.errorMsg=""
              this.loginForm.reset()
            },(3000));
          }

        )

    }
    else {
      alert('Invalid Form')
    }
  }
}
