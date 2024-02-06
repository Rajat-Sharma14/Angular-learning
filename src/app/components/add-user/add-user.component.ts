import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';
import { ToastrService } from "ngx-toastr";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  title: string = "";
  user: any = [];
  id: any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public ref: MatDialogRef<AddUserComponent>,
    public http: HttpClient, public toastr: ToastrService
  ) { }

  ngOnInit() {
    if (this.data?._id) {
      this.title = "Edit User";
      this.getUserById()
    }
    else {
      this.title = "Add User"
    }

  }
  closeDialog() {
    this.ref.close("closed");
  }
  getUserById() {
    let id = this.data._id
    // console.log(id, "getid")
    this.http.post("http://localhost:3001/getUserById", { id }).subscribe((res: any) => {
      console.log(res, "resp")
      this.user = res.user[0];
      console.log(this.user, "qqqqq")
    })
  }

  updateUser(form: any) {
    console.log(this.user, "in Update");
    let params = `?id=${this.user._id}`;
    console.log(form, "fooorrrmm")
    let obj = {
      ownername: this.user.ownername,
      ownersurname: this.user.ownersurname,
      contactphone: this.user.contactphone,
      whatsapp: this.user.whatsapp,
      email: this.user.email
    }
    console.log(obj, "body")
    this.http.post("http://localhost:3001/editUserAdmin" + params, obj).subscribe((data: any) => {
      console.log(data, "update")
      this.toastr.success(data.message)
    });
    this.closeDialog()
  }

  addUser(form: NgForm) {
    console.log(form, "form")
    let body = {
      name: form.value.name,
      surname: form.value.surname,
      phone: form.value.contactphone,
      whatsapp: form.value.whatsapp,
      email: form.value.email
    }
    this.http.post("http://localhost:3001/addUserByAdmin", body).subscribe((res:any) => {
      console.log(res)
      this.toastr.success(res.message)
    });
    this.closeDialog()
  }
}
