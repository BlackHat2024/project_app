import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export const initialState = {
  ingredients: [new Ingredient('Chicken Breast ', 10), new Ingredient('Mushrooms ', 6)]
};



export function shoppingListReducer(
  state = initialState,
  action: ShoppingListActions.ShoppingListActions
) :object{
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
      case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient=state.ingredients[action.payload.index];
      const updatedIngredient={
        ...ingredient,
        ...action.payload.ingredient,
      };
      const updatedIngredients=[...state.ingredients];
      updatedIngredients[action.payload.index]=updatedIngredient;
      return {
        ...state,
        ingredients: updatedIngredients
      };
      case ShoppingListActions.DELETE_INGREDINET:
      return {
        ...state,
        ingredients: state.ingredients.filter((ig,igIndex)=>{
          return igIndex!==action.payload;
        })
      };
    default:
      return state;
  }
}
