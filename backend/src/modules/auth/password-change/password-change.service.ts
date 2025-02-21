import {
	BadRequestException,
	Injectable,
	NotAcceptableException,
	NotFoundException
} from '@nestjs/common'
import { hash, verify } from 'argon2'
import type { Request } from 'express'

import { TokenType, type User } from '@/prisma/generated'
import { PrismaService } from '@/src/core/prisma/prisma.service'
import { generateToken } from '@/src/shared/utils/generate-token.util'
import { getSessionMetadata } from '@/src/shared/utils/session-metadata.util'

import { MailService } from '../../libs/mail/mail.service'

import { PasswordChangeInput } from './inputs/password-change.input'

@Injectable()
export class PasswordChangeService {
	public constructor(
		private readonly prismaService: PrismaService,
		private readonly mailService: MailService
	) {}

	public async passwordChange(
		req: Request,
		input: PasswordChangeInput,
		id: string,
		userAgent: string
	) {
		const { currentPassword, password, pin } = input
		
		const user = await this.prismaService.user.findUnique({
			where: {
				id
			}
		})

		if (!user) {
			throw new NotAcceptableException('User not found!')
		}

		const isValidPassword = await verify(user.password, currentPassword)

		if (!isValidPassword) {
			throw new BadRequestException('Invalid password')
		}

		if (!pin) {
			await this.sendPasswordChangeToken(req, user, userAgent)

			return {
				message:
					'Verification code required. Verification code has been sent to your email.'
			}
		}

		await this.validateChangePasswordToken(pin)

		await this.prismaService.user.update({
			where: {
				id: user.id || undefined
			},
			data: {
				password: await hash(password)
			}
		})

		const metadata = getSessionMetadata(req, userAgent)

		await this.mailService.sendPasswordChangeNotificationMail(
			user.email,
			metadata
		)

		return {
			status: true,
			message: null
		}
	}

	private async validateChangePasswordToken(token: string) {
		const existingToken = await this.prismaService.token.findUnique({
			where: {
				token,
				type: TokenType.PASSWORD_CHANGE
			}
		})

		if (!existingToken) {
			throw new NotFoundException('Token not found')
		}

		const hasExpired = new Date(existingToken.expiresIn) < new Date()

		if (hasExpired) {
			throw new BadRequestException('Token has expired')
		}

		await this.prismaService.token.delete({
			where: {
				id: existingToken.id,
				type: TokenType.PASSWORD_CHANGE
			}
		})

		return true
	}

	public async sendPasswordChangeToken(
		req: Request,
		user: User,
		userAgent: string
	) {
		const deactivateToken = await generateToken(
			this.prismaService,
			user,
			TokenType.PASSWORD_CHANGE,
			false
		)

		const metadata = getSessionMetadata(req, userAgent)

		await this.mailService.sendPasswordChangeToken(
			user.email,
			deactivateToken.token,
			metadata
		)

		return true
	}
}
