import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AddPlantComponent } from '../add-plant/add-plant.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-plantcare',
  standalone: true,
  imports: [CommonModule, AddPlantComponent, NgFor],
  templateUrl: './plantcare.component.html',
  styleUrls: ['./plantcare.component.scss']
})
export class PlantcareComponent implements OnInit {
  plants: any[] = [];
  plantTypes: any[] = [];
  readonly apiUrl = 'http://localhost:3002/api/plants';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadPlants();
    this.loadPlantTypes();
  }

  loadPlants(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(plants => {
      this.http.get<any[]>(`${this.apiUrl}/plant-types`).subscribe(types => {
        this.plants = plants.map(plant => ({
          ...plant,
          type: types.find(t => t.id === plant.type_id)
        }));
      });
    });
  }

  loadPlantTypes(): void {
    this.http.get<any[]>(`${this.apiUrl}/plant-types`).subscribe({
      next: data => this.plantTypes = data,
      error: err => console.error('Erreur chargement types', err)
    });
  }

  getWateringStatus(plant: any): string {
    if (!plant.last_watered || !plant.type?.watering_frequency_days) return '';

    const last = new Date(plant.last_watered);
    const next = new Date(last);
    next.setDate(last.getDate() + plant.type.watering_frequency_days);

    const today = new Date();
    const diff = Math.ceil((next.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (diff <= 0) return "À arroser aujourd’hui !";
    return `À arroser dans ${diff} jour(s)`;
  }

  shouldWaterToday(plant: any): boolean {
    if (!plant.last_watered || !plant.type?.watering_frequency_days) return false;

    const lastWatered = new Date(plant.last_watered);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const nextWatering = new Date(lastWatered);
    nextWatering.setDate(lastWatered.getDate() + plant.type.watering_frequency_days);
    nextWatering.setHours(0, 0, 0, 0);

    console.log(`[DEBUG] ${plant.name} → next: ${nextWatering.toDateString()}, today: ${today.toDateString()}`);
    return nextWatering.getTime() <= today.getTime();
  }

  waterPlant(id: number): void {
    const today = new Date().toISOString().split('T')[0];
    this.http.patch(`${this.apiUrl}/${id}/water`, { last_watered: today }).subscribe({
      next: () => {
        const plant = this.plants.find(p => p.id === id);
        if (plant) {
          plant.last_watered = today;
        }
      },
      error: err => {
        console.error('Erreur lors de l\'arrosage de la plante', err);
      }
    });
  }

  deletePlant(id: number): void {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => this.loadPlants(),
      error: err => console.error('Erreur suppression plante', err)
    });
  }
}
