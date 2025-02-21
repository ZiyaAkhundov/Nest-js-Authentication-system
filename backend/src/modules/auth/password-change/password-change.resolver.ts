import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'

import { Authorized } from '@/src/shared/decorators/authorized.decorator'
import { UserAgent } from '@/src/shared/decorators/user-agent.decorator'
import { GqlContext } from '@/src/shared/types/gql-context.types'

import { PasswordChangeInput } from './inputs/password-change.input'
import { PasswordChangeService } from './password-change.service'
import { Authorization } from '@/src/shared/decorators/auth.decorator'
import { PasswordChangeModel } from './models/password-change.model'

@Resolver('PasswordChange')
export class PasswordChangeResolver {
	public constructor(
		private readonly passwordChangeService: PasswordChangeService
	) {}

	@Authorization()
	@Mutation(() => PasswordChangeModel, { name: 'passwordChange' })
	public async passwordChange(
		@Context() { req }: GqlContext,
		@Args('data') input: PasswordChangeInput,
		@Authorized('id') id: string,
		@UserAgent() UserAgent: string
	) {
		return this.passwordChangeService.passwordChange(
			req,
			input,
			id,
			UserAgent
		)
	}
}
