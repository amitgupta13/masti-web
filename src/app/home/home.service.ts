import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.authApi;

export class HomeService {
    constructor(private http: HttpClient){}

    getProfile(){
        this.http.get(`${BACKEND_URL}/profile`)
    }
}