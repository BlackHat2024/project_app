import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoggingService } from './logging.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { RecipeServices } from './recipes/recipe.service';

@NgModule({
  providers: [
    RecipeServices,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
})
export class CoreModule {}
