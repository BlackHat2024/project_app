import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {

    ingredientChanged = new Subject<Ingredient[]>();
    startedEditing= new Subject<number>();

    ingredients: Ingredient[] = [
        new Ingredient('Chicken Breast ', 10),
        new Ingredient('Mushrooms ', 6)
    ];

    getIngredients(){
        return this.ingredients.slice();
    }

    addIngredient(ingedient:Ingredient){
        this.ingredients.push(ingedient);
        this.ingredientChanged.next(this.ingredients.slice());
    }

    addIngrdients(ingredients : Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingredientChanged.next(this.ingredients.slice());
    }

    updateIngredients(index:number,newIngredient:Ingredient){
        this.ingredients[index]=newIngredient;
        this.ingredientChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index:number){
        this.ingredients.splice(index);
        this.ingredientChanged.next(this.ingredients.slice());
    }

    getIngredient(index:number){
        return this.ingredients[index];
    }

}