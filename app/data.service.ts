import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http:Http) { }


  //localstoreage data
  storeuserdata(user,pass,type){
    localStorage.setItem("user",user);
    localStorage.setItem("pass",pass);
    localStorage.setItem("type",type);
  }
  
  //employee menu
  availableMenu(){
    return this.http.get("http://localhost:5000/");
  }

  //logging in
  loginpost(post){
    return this.http.post("http://localhost:5000/login",post);
  }

  //chef menu
  getMainMenu(){
    return this.http.get("http://localhost:5000/mainmenu");
  }

  //chef selected menu
  addToMenu(post){
    return this.http.post("http://localhost:5000/menuselected",post);
  }

  //remove the selected menu
  removeFromMenu(post){
    return this.http.post("http://localhost:5000/menudelete",post);
  }

  //removing item from main menu
  addToMainMenu(post){
    return this.http.post("http://localhost:5000/mainmenuadd",post);
  }

  //increasing the count of attenders
  addCount(post){
    return this.http.post("http://localhost:5000/attend",post);
  }

  feedback(post){
    return this.http.post("http://localhost:5000/feedback",post)
  }
  
  //count of attendance
  getCount(post){
    return this.http.post("http://localhost:5000/count",post);
  }
}
