import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ShoppingListService } from './shopping-list/shopping-list.service';
import { LoggingService } from './logging.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { RecipeServices } from './recipes/recipe.service';

@NgModule({
  providers: [
    ShoppingListService,
    RecipeServices,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
})
export class CoreModule {}
