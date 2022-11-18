import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RecipeServices } from '../recipe.service';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[]=[];


  constructor(private recipeService:RecipeServices) { }

  ngOnInit(): void {
    this.recipes=this.recipeService.getRecipes();
  }

}
