import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import party from "party-js";
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  signoutdiv: boolean = false
  fundtransferSuccessMsg: string = ''
  fundtransferErrorMsg: string = ''
  user: string = ''
  currentAcno: Number = 0
  balance: Number = 0
  depositMsg: string = ''
  acno: any = ''
  deleteaccountMsg: boolean = false
  deletespinnerdiv: boolean = false

  depositForm = this.fb.group({
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]]
  })
  fundtransferForm = this.fb.group({
    toacno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[0-9 a-z A-Z]*')]],
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]]




  })


  isCollapse: boolean = true

  constructor(private api: ApiService, private fb: FormBuilder, private router: Router) {

  }

  ngOnInit() {
    // to check the account holder already logged in 
    if (!localStorage.getItem("token")) {
      alert("Please Login!!!!")
      // navigate to login
      this.router.navigateByUrl('')
    }
    if (localStorage.getItem("username")) {
      this.user = localStorage.getItem("username") || ''

    }
  }


  collapse() {
    this.isCollapse = !this.isCollapse

  }
  getbalance() {
    if (localStorage.getItem("currentAcno")) {
      this.currentAcno = JSON.parse(localStorage.getItem("currentAcno") || '')
      this.api.getbalance(this.currentAcno).subscribe((result: any) => {
        console.log(result);
        this.balance = result.balance


      })


    }

  }

  //deposit
  deposit() {
    if (this.depositForm.valid) {
      let amount = this.depositForm.value.amount
      this.currentAcno = JSON.parse(localStorage.getItem("currentAcno") || '')
      this.api.deposit(this.currentAcno, amount)
        .subscribe(
          //success
          (result: any) => {
            console.log(result);
            this.depositMsg = result.message
            setTimeout(() => {
              this.depositForm.reset()
              this.depositMsg = ''
            }, 5000)
          },
          //error
          (result: any) => {
            this.depositMsg = result.error.message
          }
        )
    }
    else {
      alert('Invalid Form')
    }

  }

  //showconfetti
  showconfetti(source: any) {
    party.confetti(source);

  }

  //transfer
  transfer() {
    if (this.fundtransferForm.valid) {
      let toacno = this.fundtransferForm.value.toacno
      let pswd = this.fundtransferForm.value.pswd
      let amount = this.fundtransferForm.value.amount
      //make api for fund transfer
      this.api.fundtransfer(toacno, pswd, amount).subscribe(
        //success
        (result: any) => {
          this.fundtransferSuccessMsg = result.message
        },
        //client error
        (result: any) => {
          this.fundtransferErrorMsg = result.error.message
        }
      )

    }
    else {
      alert('Invalid Form')
    }

  }

  //clear fund transfer form
  clearfundtransferform() {
    this.fundtransferErrorMsg = ''
    this.fundtransferSuccessMsg = ''
    this.fundtransferForm.reset()
  }
  //signout
  signout() {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("currentAcno")
    this.signoutdiv = true

    setTimeout(() => {
      //navigate to login page
      this.router.navigateByUrl('')
      this.signoutdiv = false

    }, 4000);


  }

  //delete account from navbar
  deletemyaccount() {
    this.acno = localStorage.getItem("currentAcno")
    this.deleteaccountMsg = true
  }

  oncancel() {
    this.acno = ""
    this.deleteaccountMsg = false
  }

  ondelete(event: any) {
    let deleteacno = JSON.parse(event)
    this.api.deleteaccount(deleteacno)
      .subscribe((result: any) => {
        this.acno=""
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        localStorage.removeItem("currentAcno")
        this.deletespinnerdiv=true
        setTimeout(() => {
          //navigate to login page
          this.router.navigateByUrl('')
          this.deletespinnerdiv=false
        }, 4000);
      },
        (result: any) => {
          alert(result.error.message)
        }

      )

  }

}
