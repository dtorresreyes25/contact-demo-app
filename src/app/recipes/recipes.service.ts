import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class RecipesService {
  recipeSelected = new EventEmitter<Recipe>();
  constructor() {}

  onSelectRecipe(recipe: Recipe): void {
    this.recipeSelected.emit(recipe);
  }
}
