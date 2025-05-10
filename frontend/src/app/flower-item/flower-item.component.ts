import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlowerService } from '../services/flowers.service';
import { Flower } from '../models/flowers.model';

@Component({
  selector: 'app-flower-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flower-item.component.html',
  styleUrl: './flower-item.component.scss'
})
export class FlowerItemComponent {

  @Input() flower!: Flower;
  @Output() flowerDeleted = new EventEmitter<void>();

  constructor(private flowerService: FlowerService) {}

  deleteFlower() {
    this.flowerService.deleteFlower(this.flower.id!).subscribe(() => {
      this.flowerDeleted.emit();
    });
  }
}
