import { Component, OnInit } from '@angular/core';

import * as Mapboxgl from 'mapbox-gl';

import { environment } from '../../../environments/environment';

import { DirectionsService } from '../../services/directions.service';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

	map!: Mapboxgl.Map;

	location: any = {}
	
	constructor(private __directions: DirectionsService) { }

	ngOnInit(): void {
		if (!navigator.geolocation) return 

		navigator.geolocation.getCurrentPosition((successLocation: any) => {
			// Get current location
			this.location = { "Longitude": successLocation.coords.longitude, "Latitude": successLocation.coords.latitude };

			this.setupMap([this.location.Longitude, this.location.Latitude]);
			
		}, (errorLocation: any) => {
			this.setupMap([24.5704163, -29.3396683]);
		}, { enableHighAccuracy: true });	
	}

	setupMap(center: any){
		// Create Map
		(Mapboxgl as any).accessToken = environment.mapbox_token;
		this.map = new Mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/streets-v11',
			center: center,
			zoom: 15
		});

		// Add map controls
		this.map.addControl(new Mapboxgl.NavigationControl());

		// Add map marker
		this.createMarker(center[0], center[1])

		// Add directions search boxes
		// this.map.addControl(new MapboxDirections({
		// 		accessToken: environment.mapbox_token
		// 	}), 'top-left'
		// );
	}

	createMarker(lng: number, lat: number){
		const marker = new Mapboxgl.Marker({ draggable: true }).setLngLat([lng, lat]).addTo(this.map)

		marker.on('drag', () => {
			console.log(marker.getLngLat());
		})
	}
}
