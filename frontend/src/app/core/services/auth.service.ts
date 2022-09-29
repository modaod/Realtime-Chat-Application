import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";
import {firstValueFrom, lastValueFrom, Observable} from "rxjs";
import {Router} from "@angular/router";


@Injectable({
  providedIn: "root"
})
export class AuthService {
  private loggedIn = false;
  url: string = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  async userValidation(username:string, password: string): Promise<User | undefined> {
    const users = await firstValueFrom(this.getUsers());
    // this.getUsers().subscribe((subscriber) => {
    //
    //   userValid = subscriber.find(user => user.name === username && user.password === password);
    // });
    console.log('from userValidation' + users[0].name);
    return users.find((user: User) => {
      return user.name === username && user.password === password;
    });
  }

  async login(username:string, password: string) {
    console.log(username + ' : ' + password);
    const userValid = await this.userValidation(username, password);
    this.loggedIn = !!userValid;
    this.loggedIn = true;
  }

  register(username: string, password: string, email: string) {
    const user: User = {name: username, password: password, email: email, roomId: []};
    this.http.put(this.url, user);
    this.router.navigateByUrl('/home');

  }

  getToken(): boolean {
    return this.loggedIn;
  }
}
