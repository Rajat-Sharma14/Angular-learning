import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  inputdata: any
  users: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<EditUserComponent>, private http: HttpClient,
  private toastr:ToastrService) { }

  ngOnInit(): void {
    this.inputdata = this.data
    this.users = this.data.users;
    console.log(this.users, "in edituser");
  }

  closeDialog() {
    this.ref.close("closed");
  }

  updateUser(form:any) {
    console.log(this.users, "in Updaateeee");
    let params = `?id=${this.users._id}`;
    console.log(form, "fooorrrmm")
    let obj = {
      ownername: this.users.ownername,
      ownersurname: this.users.ownersurname,
      contactphone: this.users.contactphone,
      whatsapp: this.users.whatsapp,
      email: this.users.email
    }
    console.log(obj, "body")

    this.http.post("http://localhost:3001/editUserAdmin" + params, obj ).subscribe((data:any) => {
      console.log(data, "update")
      this.toastr.success(data.message)
    });
    this.closeDialog()
  }

}
