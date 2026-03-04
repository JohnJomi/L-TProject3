import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    // Simulate adding an authorization token
    const clonedRequest = req.clone({
        setHeaders: {
            Authorization: `Bearer mock-jwt-token-12345`
        }
    });

    return next(clonedRequest).pipe(
        catchError((error: HttpErrorResponse) => {
            console.error('HTTP Error Intercepted:', error.message);
            // Let the component/service catch block know
            return throwError(() => new Error('Simulated API request failed'));
        })
    );
};
