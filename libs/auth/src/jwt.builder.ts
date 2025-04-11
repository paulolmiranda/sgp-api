import { Observable, Subscriber } from 'rxjs';
import { sign, verify } from 'jsonwebtoken';

export interface JwtResult {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export enum JwtTokenType {
  Access,
  Refresh,
}

export class JwtBuilder<T> {
  private readonly payload: any;

  constructor(payload: T) {
    this.payload = { ...payload };
  }

  public static newInstance<T>(data: T): JwtBuilder<T> {
    return new JwtBuilder<T>(data);
  }

  public static decoded<T>(
    token: string,
    tokenType: JwtTokenType,
  ): Observable<T> {
    return new Observable<any>((subscriber: Subscriber<T>) => {
      try {
        verify(token, JwtBuilder.secret, (err: any, decoded: any) => {
          if (err) {
            subscriber.error(err); // Token inválido, expirado, ou com chave errada
          } else {
            const { type } = decoded || {};
            if (type !== tokenType) {
              subscriber.error(new Error('Tipo de token inválido'));
            } else {
              subscriber.next(decoded as T);
              subscriber.complete();
            }
          }
        });
      } catch (err) {
        subscriber.error(err); // Fallback para erros fora do verify
      }
    });
  }

  private signAccess(epoch: number): string {
    const exp = epoch + JwtBuilder.expiresIn;
    return sign(
      { ...this.payload, type: JwtTokenType.Access, exp },
      JwtBuilder.secret,
    );
  }

  private signRefresh(epoch: number): string {
    const expiresIn = JwtBuilder.expiresIn * 2;
    const exp = epoch + expiresIn;
    return sign(
      { ...this.payload, type: JwtTokenType.Refresh, exp },
      JwtBuilder.secret,
    );
  }

  public builde(): JwtResult {
    const epoch = Math.floor(Date.now() / 1000);

    return {
      expiresIn: JwtBuilder.expiresIn,
      accessToken: this.signAccess(epoch),
      refreshToken: this.signRefresh(epoch),
    };
  }

  public static get secret(): string {
    return `${process.env.APP_KEY}_${process.env.APP_ENV}`;
  }

  public static get expiresIn(): number {
    return +process.env.JWT_EXPIRY || 3600; // Padrão de 1 hora
  }
}
