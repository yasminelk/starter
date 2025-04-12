import { inject } from '@angular/core';
import { ResolveFn, Routes } from '@angular/router';
import { ExampleComponent } from 'app/modules/admin/users/example.component';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';
const userResolver: ResolveFn<any> = (
    route,
    state
  ): Observable<any> => {
    const userService = inject(UsersService);
    return userService.getUsers();
  };
export default [
    {
        path     : '',
        component: ExampleComponent,
        resolve: {
            user: userResolver  // Resolve the user data before loading the component
        },
    },
] as Routes;
