import { HttpInterceptorFn } from '@angular/common/http';
import { AppStorage } from '../enum/app-storage';

/**
 * Auth Interceptor
 * Automatically attaches the authentication token to outgoing HTTP requests
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Get token from localStorage
  const token = localStorage.getItem(AppStorage.TOKEN);

  // List of endpoints that don't require authentication
  const publicEndpoints = [
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
  ];

  // Check if the request URL matches any public endpoint
  const isPublicEndpoint = publicEndpoints.some(endpoint =>
    req.url.includes(endpoint)
  );

  // If no token or public endpoint, proceed without modification
  if (!token || isPublicEndpoint) {
    return next(req);
  }

  // Clone the request and add the Authorization header
  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(clonedRequest);
};
