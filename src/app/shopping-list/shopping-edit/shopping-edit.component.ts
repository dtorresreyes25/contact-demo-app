import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output,
} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.less'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', { static: false })
  nameInputRef: ElementRef = {} as ElementRef;
  @ViewChild('amountInput', { static: false })
  amountInputRef: ElementRef = {} as ElementRef;

  constructor(private sLService: ShoppingService) {}

  ngOnInit(): void {}

  onAddItem(): void {
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingName, ingAmount);
    this.sLService.addIngredient(newIngredient);
  }
}
