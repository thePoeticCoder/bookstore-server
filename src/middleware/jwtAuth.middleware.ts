import { CanActivate, ExecutionContext, ForbiddenException, Inject, Injectable, UseGuards, applyDecorators } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
;
import { AppConfig } from "src/config";

@Injectable()
export class JwtAuthGuard implements CanActivate {

  	@Inject()
	private jwtService: JwtService;
  private token: string;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const method = req.method;
    const url = req.url;

    if (req.headers['authorization']) {
      req.user = await this.validateJwtToken(req.headers.authorization);
      return true;
    }
    return false;
  }

  async validateJwtToken(auth: string) {
    try {
      if (auth.split(' ')[0] !== 'Bearer') throw new ForbiddenException('Invalid token');
      this.token = auth.split(' ')[1];
      const decoded = this.jwtService.verify(this.token,AppConfig.JWT_);
      return decoded;
    } catch (err) {
      const { name = '*' } = err;
      if (name === 'TokenExpiredError') {
        throw new ForbiddenException("ACCESS TOKEN EXPIRED");
      } else {
        throw new ForbiddenException("UNAUTHORIZED");
      }
    }
  }
}
export function JwtVerification() {
  return applyDecorators(UseGuards(JwtAuthGuard));
}