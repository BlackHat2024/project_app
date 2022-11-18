import { Component, OnInit } from '@angular/core';
import { RecipeServices } from './recipe.service';
import { Recipe } from './recipes.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeServices]
})
export class RecipesComponent implements OnInit {
  selectedRecipe:Recipe;

  constructor(private recipeService:RecipeServices) { }

  ngOnInit(): void {
    this.recipeService.recipeSelected.subscribe((recipe:Recipe)=>{this.selectedRecipe=recipe})
  }

}
