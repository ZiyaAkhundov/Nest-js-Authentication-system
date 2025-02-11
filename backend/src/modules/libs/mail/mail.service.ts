import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { render } from '@react-email/components'

import type { SessionMetadata } from '@/src/shared/types/session-metadata.types'

import { PasswordRecoveryTemplate } from './templates/password-recovery.template'
import { verificationtemplate } from './templates/verification.template'
import { PasswordResetNotificationTemplate } from './templates/password-reset-notification.template'
import { DeactivateTemplate } from './templates/deactivate.template'

@Injectable()
export class MailService {
	public constructor(
		private readonly mailerService: MailerService,
		private readonly configService: ConfigService
	) {}

	public async sendVerificationToken(email: string, token: string) {
		const domain = this.configService.getOrThrow<string>('ALLOWED_ORIGIN')
		const html = await render(verificationtemplate({ domain, token }))

		return this.sendMail(email, 'Account verification', html)
	}

	public async sendPasswordResetToken(
		email: string,
		token: string,
		metadata: SessionMetadata
	) {
		const domain = this.configService.getOrThrow<string>('ALLOWED_ORIGIN')
		const html = await render(
			PasswordRecoveryTemplate({ domain, token, metadata })
		)

		return this.sendMail(email, 'Password reset', html)
	}

	public async sendPasswordResetNotificationMail(
		email: string,
		metadata: SessionMetadata
	) {
		const html = await render(
			PasswordResetNotificationTemplate({ metadata })
		)

		return this.sendMail(email, 'Password has been changed', html)
	}

	private sendMail(email: string, subject: string, html: string) {
		return this.mailerService.sendMail({
			to: email,
			subject,
			html
		})
	}

	public async sendDeactivateToken(
		email: string,
		token: string,
		metadata: SessionMetadata
	) {
		const html = await render(
			DeactivateTemplate({ token, metadata })
		)

		return this.sendMail(email, 'Account deactivation', html)
	}
}
