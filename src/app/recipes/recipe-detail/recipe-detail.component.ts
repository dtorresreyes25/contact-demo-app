import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from '../recipe.model';
import { ShoppingService } from '../../shopping-list/shopping.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.less'],
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe = {} as Recipe;

  constructor(private shoppingService: ShoppingService) {}

  ngOnInit(): void {}

  onAddIngredientsToShoppingList(): void {
    this.shoppingService.addIngredients(this.recipe.ingredients);
  }
}
