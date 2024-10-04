import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  orderForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.orderForm = this.fb.group({
      orders: this.fb.array([])  // Initialize the FormArray for orders
    });
  }

  // Getter to access the FormArray for orders
  get orders(): FormArray {
    return this.orderForm.get('orders') as FormArray;
  }

  // Method to get the FormArray of items for a specific order
  getItems(orderIndex: number): FormArray {
    return this.orders.at(orderIndex).get('items') as FormArray;
  }

  // Create a FormGroup for a single item
  createItem(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]]
    });
  }

  // Create a FormGroup for a single order, which contains a FormArray of items
  createOrder(): FormGroup {
    return this.fb.group({
      orderName: ['', Validators.required],
      items: this.fb.array([this.createItem()])  // Initialize with one item
    });
  }

  // Add a new order to the FormArray
  addOrder() {
    this.orders.push(this.createOrder());
  }

  // Add a new item to a specific order
  addItem(orderIndex: number) {
    this.getItems(orderIndex).push(this.createItem());
  }

  // Remove a specific order
  removeOrder(orderIndex: number) {
    this.orders.removeAt(orderIndex);
  }

  // Remove a specific item from a specific order
  removeItem(orderIndex: number, itemIndex: number) {
    this.getItems(orderIndex).removeAt(itemIndex);
  }

  // Submit the form and log its value
  onSubmit() {
    console.log(this.orderForm.value);
  }

  ngOnInit(): void {
  }

}
