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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadPlants();
    this.loadPlantTypes();
  }

  loadPlants(): void {
    this.http.get<any[]>('http://localhost:3002/api/plants').subscribe({
      next: (data) => (this.plants = data),
      error: (err) => console.error('Erreur chargement plantes', err)
    });
  }

  loadPlantTypes(): void {
    this.http.get<any[]>('http://localhost:3002/api/plants/plant-types').subscribe({
      next: (data) => (this.plantTypes = data),
      error: (err) => console.error('Erreur chargement types', err)
    });
  }

  getPlantTypeName(typeId: number): string {
    const type = this.plantTypes.find((t) => t.id === typeId);
    return type ? type.name : 'Inconnu';
  }

  getWateringStatus(plant: any): string {
    const type = this.plantTypes.find((t) => t.id === plant.type_id);
    if (!type || !plant.last_watered) return 'Information manquante';

    const last = new Date(plant.last_watered);
    const next = new Date(last);
    next.setDate(last.getDate() + type.watering_frequency_days);

    const today = new Date();
    const diff = Math.ceil((next.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (diff <= 0) return 'À arroser aujourd’hui !';
    return `À arroser dans ${diff} jour(s)`;
  }

  waterPlant(id: number): void {
    const today = new Date().toISOString().split('T')[0];

    this.http.put(`http://localhost:3002/api/plants/${id}/water`, { last_watered: today }).subscribe({
      next: () => this.loadPlants(),
      error: (err) => console.error('Erreur mise à jour arrosage', err)
    });
  }

  deletePlant(id: number): void {
    this.http.delete(`http://localhost:3002/api/plants/${id}`).subscribe({
      next: () => this.loadPlants(),
      error: (err) => console.error('Erreur suppression plante', err)
    });
  }
  calculateWatering(plant: any): string {
    const today = new Date();
    const lastWatered = new Date(plant.last_watered);
    const type = this.plantTypes.find(t => t.id === plant.type_id);

    if (!type) return 'Type inconnu';

    const nextWatering = new Date(lastWatered);
    nextWatering.setDate(lastWatered.getDate() + type.watering_frequency_days);

    const diffTime = nextWatering.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) {
      return 'À arroser aujourd’hui !';
    } else {
      return `À arroser dans ${diffDays} jour(s)`;
    }
  }
  shouldWaterToday(plant: any): boolean {
    const type = this.plantTypes.find(t => t.id === plant.type_id);
    if (!type) return false;

    const last = new Date(plant.last_watered);
    const next = new Date(last);
    next.setDate(last.getDate() + type.watering_frequency_days);

    const today = new Date();
    return next.toDateString() === today.toDateString();
  }


}
