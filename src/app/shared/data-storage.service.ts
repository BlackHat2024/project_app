import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs";
import { RecipeServices } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipes.model";

@Injectable({providedIn:'root'})
export class DataStorageService{

    constructor(private http:HttpClient, private recipeService:RecipeServices){}
    
    private link1='https://project-app-ac68c-default-rtdb.firebaseio.com/rcipes.json';

    storeRecipes(){
        const recipes=this.recipeService.getRecipes();
        this.http.put(this.link1,recipes).subscribe(response=>{
            console.log(response)
        });
    }

    fetchRecipes(){
        return this.http.get<Recipe[]>(this.link1).pipe(map(recipes=>{
            return recipes.map(recipe=>{
                return {...recipe,ingredients:recipe.ingredients? recipe.ingredients:[]} 
            })
        }),tap(recipes=>{
            this.recipeService.setRecipes(recipes);
        }))
    }

}