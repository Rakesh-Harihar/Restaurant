import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { post } from 'selenium-webdriver/http';
import { DataService } from '../data.service';
import { Http,Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { AuthGuard } from '../auth.guard';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {
  usermail="";
  password="";
  logintype="";
  post;
  data;
  today=new Date;
  time=this.today.getHours();
  constructor(private rts:Router, private service : DataService,private auth :AuthGuard) { 
    localStorage.clear();
  }

  ngOnInit() {
  }
  login(id,pass){
    this.usermail=id.value;
    this.password=pass.value;
    // console.log(this.usermail,this.password);
    this.post={ userid : this.usermail, password : this.password};
    // console.log(this.post);
    
    this.service.loginpost(this.post).subscribe( (res : Response) =>{
      this.data = res.json()  
      if(this.data.success == false){
        document.getElementById("display").innerHTML = "password and user id not matching"; 
      }
      else{
        if(this.data.result.login_type == "chef"){
          this.service.storeuserdata(this.usermail,this.password,this.data.result.login_type);
          if(this.auth.canActivate())
            this.rts.navigate(['menupage']);
        }
          
        else if(this.data.result.login_type == "employee"){
          if(this.time>=9 && this.time<20){
            this.service.storeuserdata(this.usermail,this.password,this.data.result.login_type);
            if(this.auth.canActivate())
              this.rts.navigate(['homepage']);
          } 
          else 
            document.getElementById("display").innerHTML = "You can login only between 9 to 11";
        }
      }
    });
  }
}
