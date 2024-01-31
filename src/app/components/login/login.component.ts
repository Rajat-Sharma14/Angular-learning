import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private router:Router, private toastr:ToastrService) { }
  onSubmit(form: NgForm) {
    // console.log(form)
    let body = {
      email: form.value.Email,
      password: form.value.password
    }
    this.http.post("http://localhost:3001/adminLogin", body).subscribe((data:any) => {
      console.log(data)
      if(data.message ==="Admin logged in successfully"){
        this.toastr.success(data.message)
        this.router.navigate(['/dashboard'])
      }
      else{
        this.toastr.success(data.message)
      }
      
    })

  }
  ngOnInit(): void {
  }

}
