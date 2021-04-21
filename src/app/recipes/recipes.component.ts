import { Component, OnInit } from '@angular/core';

import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.less'],
  providers: [RecipesService],
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe = {} as Recipe;

  constructor(private recipeService: RecipesService) {}

  ngOnInit(): void {
    this.recipeService.recipeSelected.subscribe((recipe) => {
      this.selectedRecipe = recipe;
    });
  }
}
