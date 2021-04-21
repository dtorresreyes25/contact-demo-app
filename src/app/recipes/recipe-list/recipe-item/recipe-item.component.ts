import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Recipe } from '../../recipe.model';
import { RecipesService } from '../../recipes.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.less'],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe = {} as Recipe;

  constructor(private recipeService: RecipesService) {}

  ngOnInit(): void {}

  onSelected(): void {
    this.recipeService.onSelectRecipe(this.recipe);
  }
}
