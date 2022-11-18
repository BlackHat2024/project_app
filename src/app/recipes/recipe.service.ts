import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipes.model";

@Injectable()
export class RecipeServices {

    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
            'Groshe', 
            'Groshe me pasterma', 
            'https://imgs.search.brave.com/e8mxQwOnQZNkP1_VeULZe2weQorz1kSEOgry6hHdln0/rs:fit:1024:576:1/g:ce/aHR0cHM6Ly9mb29k/dGFsazR5b3UuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE3/LzAxL1JlY2lwZXMt/QmFubmVyLmpwZw',
            [new Ingredient('vaj',10)]
        ),
        new Recipe(
            'Kek', 
            'Kek me kanelle', 
            'https://imgs.search.brave.com/e8mxQwOnQZNkP1_VeULZe2weQorz1kSEOgry6hHdln0/rs:fit:1024:576:1/g:ce/aHR0cHM6Ly9mb29k/dGFsazR5b3UuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE3/LzAxL1JlY2lwZXMt/QmFubmVyLmpwZw',
            [new Ingredient('vaj',10)]
            )
    ];

    constructor(private slService:ShoppingListService){}

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients:Ingredient[]){
        this.slService.addIngrdients(ingredients);
    }

}