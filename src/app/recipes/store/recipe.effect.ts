import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, switchMap, withLatestFrom } from "rxjs";
import { Recipe } from "../recipes.model";
import * as RecipecAction from './recipe.action';
import * as fromAPP from '../../store/app.reducer';
import { Store } from "@ngrx/store";

@Injectable()
export class RecipeEffects {

    @Effect()
    fetchRecipes = this.actions$.pipe(ofType(RecipecAction.FETCH_RECIPES),
        switchMap(() => {
            return this.http.get<Recipe[]>('https://project-app-ac68c-default-rtdb.firebaseio.com/rcipes.json')
        }), map(recipes => {
            return recipes.map(recipe => {
                return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
            })
        }), map(recipes => {
            return new RecipecAction.SetRecipes(recipes)
        }))

    @Effect({ dispatch: false })
    storeRecipes = this.actions$.pipe(ofType(RecipecAction.STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([actionData, recipeState]) => {
            return this.http.put('https://project-app-ac68c-default-rtdb.firebaseio.com/rcipes.json', recipeState.recipes)
        })
    )

    constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromAPP.AppState>) { }
}