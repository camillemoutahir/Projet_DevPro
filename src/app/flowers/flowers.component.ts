import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FlowerService } from '../services/flowers.service'; 
import { AddFlowerComponent } from '../add-flower/add-flower.component';
import { FlowerItemComponent } from '../flower-item/flower-item.component';
import { Flower } from '../models/flowers.model';

@Component({
  selector: 'app-flowers',
  standalone: true,
  imports: [CommonModule, AddFlowerComponent, FlowerItemComponent, HttpClientModule],
  templateUrl: './flowers.component.html',
  styleUrl: './flowers.component.scss'
})
export class FlowersComponent implements OnInit {

  flowers: Flower[] = [];

  constructor(private flowerService: FlowerService) {}

  ngOnInit(): void {
    this.loadFlowers();
  }

  loadFlowers() {
    this.flowerService.getFlowers().subscribe((data) => {
      this.flowers = data;
    });
  }

  onFlowerAdded() {
    this.loadFlowers();
  }

  onFlowerDeleted() {
    this.loadFlowers();
  }
}
