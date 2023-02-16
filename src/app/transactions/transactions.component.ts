import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import jspdf from 'jspdf';
import 'jspdf-autotable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  alltransaction: any;
  searchKey: string = ''





  constructor(private api: ApiService,private router:Router) {

  }





  ngOnInit(): void {

      // to check the account holder already logged in 
      if (!localStorage.getItem("token")) {
        alert("Please Login!!!!")
        // navigate to login
        this.router.navigateByUrl('')
      }

    this.api.getalltransaction()
      .subscribe((result: any) => {
        this.alltransaction = result.transaction
        console.log(this.alltransaction);


      })

  }
  //search
  search(event: any) {
    this.searchKey = event.target.value

  }
  //generate pdf
  generatepdf() {
    var pdf = new jspdf()
    let col = ['type', 'fromacno', 'toacno', 'amount']
    let row: any = []
    pdf.setFontSize(16);
    pdf.text('Transaction History', 11, 8);
    pdf.setFontSize(12);
    pdf.setTextColor(99);

    //convert alltransaction to nested array
    var itemnew = this.alltransaction
    for(let element of itemnew){
      var temp = [element.type, element.fromacno, element.toacno, element.amount]
      row.push(temp)
    }
      (pdf as any).autoTable(col, row, { startY: 10 })

    // Open PDF document in browser's new tab
    pdf.output('dataurlnewwindow')

    // Download PDF doc  
    pdf.save('ministatement.pdf');

  }

}
