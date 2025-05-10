import { Component, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlowerService } from '../services/flowers.service';
import { Flower } from '../models/flowers.model';

@Component({
  selector: 'app-add-flower',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-flower.component.html',
  styleUrl: './add-flower.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class AddFlowerComponent {

  @Output() flowerAdded = new EventEmitter<void>();

  newFlower: Flower = {
    name: '',
    image_url: '',
    description: ''
  };

  constructor(private flowerService: FlowerService) {}

  addFlower() {
    if (this.newFlower.name && this.newFlower.image_url && this.newFlower.description) {

      this.flowerService.addFlower(this.newFlower).subscribe(() => {
        this.flowerAdded.emit(); 
      });

      // Réinitialiser le formulaire après ajout
      this.newFlower = {
        name: '',
        image_url: '',
        description: ''
      };
    }
  }
  updateValue(field: "name" | "image_url" | "description", event: Event) {
    const target = event.target as HTMLInputElement;
    this.newFlower[field] = target.value;
  }
  
}
