import { Component, EventEmitter, OnInit, Output, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-plant',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, FormsModule], 
  templateUrl: './add-plant.component.html',
  styleUrls: ['./add-plant.component.scss']
})
export class AddPlantComponent implements OnInit {
  @Output() plantAdded = new EventEmitter<void>();

  plantTypes: any[] = [];

  newPlant = {
    name: '',
    type_id: null,
    last_watered: '',
    notes: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadPlantTypes();
  }

  loadPlantTypes(): void {
    this.http.get<any[]>('http://localhost:3002/api/plants/plant-types').subscribe({
      next: data => this.plantTypes = data,
      error: err => console.error('Erreur lors du chargement des types de plantes', err)
    });
  }

  addPlant(): void {
    if (!this.newPlant.name || !this.newPlant.type_id) {
      alert('Veuillez remplir les champs obligatoires (nom et type)');
      return;
    }

    this.http.post('http://localhost:3002/api/plants', this.newPlant).subscribe({
      next: () => {
        this.plantAdded.emit();
        this.resetForm();
      },
      error: err => {
        console.error('Erreur lors de l\'ajout de la plante', err);
        alert('Erreur lors de l\'ajout de la plante');
      }
    });
  }

  resetForm(): void {
    this.newPlant = {
      name: '',
      type_id: null,
      last_watered: '',
      notes: ''
    };
  }

  
}
