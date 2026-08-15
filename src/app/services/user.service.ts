import { inject, Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly _tokenService = inject(TokenService);

  public username: string = this._tokenService.getInfoFromToken()?.username!;


}
