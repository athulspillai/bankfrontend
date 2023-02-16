import { Component,EventEmitter,Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {
  @Input() item:string|undefined
  @Output() oncancel = new EventEmitter()
  @Output() ondelete = new EventEmitter()


  cancel(){
    // to occur userdefined events -emit()
    this.oncancel.emit()


  }

  deleteaccount(){
    this.ondelete.emit(this.item)
    

  }

}
