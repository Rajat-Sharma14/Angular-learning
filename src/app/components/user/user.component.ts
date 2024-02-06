import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public getJsonValue: any;
  public postJsonValue: any;
  users: any = []
  page:any

  constructor(private http: HttpClient, private dialog: MatDialog) { }
  ngOnInit(): void {
    this.http.get("http://localhost:3001/allUser").subscribe((response: any) => {
      this.users = response.data
      // this.page = response.pagination
      console.log("data", this.users)
    })
  }
  openAddDialog() {
    var popup = this.dialog.open(AddUserComponent)
  }
  
  openEditDialog(_id: any) {
    var _popup = this.dialog.open(AddUserComponent, {
      data: {
        _id,
      }
    });
    _popup.afterClosed().subscribe(item => {
      console.log(item)
    })
  }
}
