import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth.guard';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  items;
  date;
  post;
  flag:boolean=false;
  today=new Date;
  time=this.today.getHours();
  fixedTimezone = '2015-06-15T09:03:01+0900';
  constructor(private data:DataService, private rts:Router,private auth:AuthGuard) {
    if(localStorage.getItem("flag")=="true"){
      this.rts.navigate(['feedback']);
    }
    else if(this.auth.canActivate() && localStorage.getItem("type")=="employee"){
      this.date = this.today.getDate()+"/"+(this.today.getMonth()+1)+"/"+this.today.getFullYear();
      this.data.availableMenu().subscribe(res => this.items=res.json());
    }
    else
    window.history.back();
  }
  
  ngOnInit() {
  }

  attendance(){
    var r = confirm("the attendence cannot be modified later");
    if(r==true){
      this.post={date:this.date, attendance:"attend"};
      this.data.addCount(this.post).subscribe(res => console.log(res.json()) );
      localStorage.setItem("flag","true");
      this.rts.navigate(['feedback']);
    }
  }
  notattendance(){
    var r = confirm("the attendence cannot be modified later");
    if(r==true){
      this.post={date:this.date, attendance:"notattend"};
      this.data.addCount(this.post).subscribe(res => console.log(res.json()) );
      localStorage.setItem("flag","true");
      this.rts.navigate(['feedback']);
    }
  }
  
  
  
}
