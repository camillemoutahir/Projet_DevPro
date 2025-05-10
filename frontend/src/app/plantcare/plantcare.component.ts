import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AddPlantComponent } from '../add-plant/add-plant.component';

@Component({
  selector: 'app-plantcare',
  standalone: true,
  imports: [CommonModule, HttpClientModule, AddPlantComponent],
  templateUrl: './plantcare.component.html',
  styleUrl: './plantcare.component.scss'
})
export class PlantCareComponent implements OnInit {

  plants: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadPlants();
  }

  loadPlants() {
    this.http.get<any[]>('http://localhost:3002/api/plants')
      .subscribe((data) => this.plants = data);
  }

  waterPlant(id: number) {
    this.http.put(`http://localhost:3002/api/plants/${id}/water`, {})
      .subscribe(() => this.loadPlants());
  }

  deletePlant(id: number) {
    this.http.delete(`http://localhost:3002/api/plants/${id}`)
      .subscribe(() => this.loadPlants());
  }
  calculateWatering(plant: any): string {
    const lastWatered = new Date(plant.last_watered);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - lastWatered.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
    const remaining = plant.watering_frequency_days - diffDays;
  
    if (remaining <= 0) {
      return "À arroser aujourd'hui !";
    } else {
      return `Dans ${remaining} jour(s)`;
    }
  }
  
}
