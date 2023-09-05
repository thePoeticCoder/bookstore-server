import { Inject, Injectable } from '@nestjs/common';
import { JwtService, } from '@nestjs/jwt';
import { AppConfig } from 'src/config';

Injectable()
export class TokenService {
	@Inject()
	private jwtService: JwtService;

	async getToken(payload) {
		const [accessToken, refreshToken] = await Promise.all([
			this.jwtService.signAsync(payload, { secret: AppConfig.JWT_SECRET_KEY, expiresIn: 60 * 2 }), 
			this.jwtService.signAsync(payload, { secret: AppConfig.REFRESH_JWT_SECRET_KEY, expiresIn: 60 * 60 * 24 * 7 })
		])

		return {
			accessToken,
			refreshToken
		}

	}


}


