import { Component, OnInit } from '@angular/core';
import { RecipeServices } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeServices]
})
export class RecipesComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
    
  }

}
