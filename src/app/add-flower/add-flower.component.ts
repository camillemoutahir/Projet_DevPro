import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlowerService } from '../services/flowers.service';
import { Flower } from '../models/flowers.model';
import { FlowersComponent } from '../flowers/flowers.component';

@Component({
  selector: 'app-add-flower',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-flower.component.html',
  styleUrl: './add-flower.component.scss'
})
export class AddFlowerComponent {

  @Output() flowerAdded = new EventEmitter<void>();

  newFlower: Flower = {
    name: '',
    image_url: '',
    description: ''
  };

  constructor(private flowerService: FlowerService,
     private flowerComponent: FlowersComponent) {}

  addFlower() {
    this.flowerService.addFlower(this.newFlower).subscribe(() => {
      this.newFlower = { name: '', image_url: '', description: '' };
      this.flowerAdded.emit();
      this.flowerComponent.onFlowerAdded();
    });
  }
}
