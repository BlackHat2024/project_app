import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {

    ingredientChanged = new EventEmitter<Ingredient[]>();

    ingredients: Ingredient[] = [
        new Ingredient('apple', 5),
        new Ingredient('domates', 5)
    ];

    getIngredients(){
        return this.ingredients.slice();
    }

    addIngredient(ingedient:Ingredient){
        this.ingredients.push(ingedient);
        this.ingredientChanged.emit(this.ingredients.slice());
    }

    addIngrdients(ingredients : Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingredientChanged.emit(this.ingredients.slice());
    }

}