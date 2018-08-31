import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AuthGuard } from '../auth.guard';

@Component({
  selector: 'app-menupage',
  templateUrl: './menupage.component.html',
  styleUrls: ['./menupage.component.css']
})
export class MenupageComponent implements OnInit {
  data=[];
  menu={};
  marker;
  date;
  today=new Date;
  time=this.today.getHours();
  fixedTimezone = '2015-06-15T09:03:01+0900';
  constructor(private dts:DataService,private auth:AuthGuard) {
    if(this.auth.canActivate() && localStorage.getItem("type")=="chef"){
      this.dts.getMainMenu().subscribe(res =>this.data = res.json());
      this.date = this.today.getDate()+"/"+(this.today.getUTCMonth()+1)+"/"+this.today.getFullYear();
    }
    else{
      window.history.back();
    }
    
  }

  ngOnInit() {
  }
  
  poster(da){
    this.menu={item_name:da};
    this.dts.addToMenu(this.menu).subscribe(res =>{
      this.marker = res.json();
      if(this.marker.message == "duplicate")
        alert("the item is already added");
    });
  }

  

  remover(ch){
    this.menu={item_name:ch};
    this.dts.removeFromMenu(this.menu).subscribe(res =>{
      this.marker = res.json();
      if(this.marker.message == "no item")
        alert("item was not found in the selected menu");
    });
  }

}
