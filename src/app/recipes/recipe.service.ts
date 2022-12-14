import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipes.model";
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions'
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';

@Injectable()
export class RecipeServices {

    recipeChanged= new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe(
    //         'Chicken Marsala', 
    //         'MAIN DISH, PASTA', 
    //         'https://imgs.search.brave.com/bMqjhsxVYYS6zZa-VsZpehvYrr1KaD-3CoonItF-33M/rs:fit:1200:1200:1/g:ce/aHR0cDovL3d3dy5z/aW1wbGVzd2VldHNh/dm9yeS5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMTcvMTIv/Q2hpY2tlbi1NYXJz/YWxhLXNpZGUuanBn',
    //         [new Ingredient('Chicken breasts',4),
    //             new Ingredient('Mushrooms',10),
    //             new Ingredient('Marsala wine',1)
    //         ]
    //     ),
    //     new Recipe(
    //         'Pizza 4 cheese + Peperoni', 
    //         'MAIN DISH', 
    //         'https://imgs.search.brave.com/p-KzIJg2IRghutBbT9eX9rPtRzth9d9gK2LxrXllKEQ/rs:fit:1200:1200:1/g:ce/aHR0cDovL2ltYWdl/czUuZmFucG9wLmNv/bS9pbWFnZS9waG90/b3MvMzA0MDAwMDAv/UGl6emEtcGl6emEt/MzA0MjQyODMtMTYw/MC0xMjAwLmpwZw',
    //         [new Ingredient('Cheese',4),
    //             new Ingredient('Peperoni',1)
    //         ]
    //         )
    // ];

    private recipes: Recipe[] = [];

    constructor(private store: Store<fromShoppingList.AppState>){}

    setRecipes(recipes:Recipe[]){
        this.recipes=recipes;
        this.recipeChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index:number){
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients:Ingredient[]){
        //this.slService.addIngrdients(ingredients);
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients))
    }

    addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(index:number,newRecipe:Recipe){
        this.recipes[index]=newRecipe;
        this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipeChanged.next(this.recipes.slice());
    }

}