import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class DirectionsService {
	
	constructor(private __http: HttpClient) { }

	getCurrentLocation(location: any){
		console.log(location);
	}
}
