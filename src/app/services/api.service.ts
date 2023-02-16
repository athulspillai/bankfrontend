import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const options={
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // register
  Register(uname: any, acno: any, pswd: any) {

    const body = {
      uname,
      acno,
      pswd
    }
    // server call to register an account and return response to register components
    return this.http.post('http://localhost:3000/register', body)

  }
  // login 
  login(acno: any, pswd: any) {
    const body = {
      acno,
      pswd
    }
    // server call to login an account and return response to login component
    return this.http.post('http://localhost:3000/login', body)
  }
  //function for appending token to the http header
  appendToken() {
    //fetch token from localstorage
    const token = localStorage.getItem("token") || ''
    //create http header
    let headers = new HttpHeaders()
    if (token) {
      // append token inside header
      headers = headers.append('token', token)
      options.headers=headers

    }
    return options

  }
  //getbalance 
  getbalance(acno: any) {
    return this.http.get('http://localhost:3000/getbalance/' + acno,this.appendToken())

  }
  //deposit
  deposit(acno:any,amount:any){
    const body ={
      acno,
      amount

    }
    return this.http.post('http://localhost:3000/deposit',body,this.appendToken())
  }

  //fundtransfer
  fundtransfer(toacno:any,pswd:any,amount:any){
    const body={
      toacno,
      pswd,
      amount
    }
    return this.http.post('http://localhost:3000/fundtransfer',body,this.appendToken())

  }

  //get all transaction
  getalltransaction(){
    return this.http.get('http://localhost:3000/all-transaction',this.appendToken())
  }

  //delete account api
  deleteaccount(acno:number){
    return this.http.delete('http://localhost:3000/delete-account/'+acno,this.appendToken())
  }

}
