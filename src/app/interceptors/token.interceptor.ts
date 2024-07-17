import { HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { TokenService } from "../services/token.service";

export const tokenInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
    const tokenService = new TokenService()
    if (tokenService.getToken() && !tokenService.isTokenExpired()) {
        req = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${tokenService.getToken()}`),
        })
    }
    return next(req);
}