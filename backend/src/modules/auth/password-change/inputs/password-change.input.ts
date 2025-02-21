import { IsPasswordsMatchingConstraint } from '@/src/shared/validators/is-passwords-matching-constraint.validator'
import { Field, InputType } from '@nestjs/graphql'
import {
	IsNotEmpty,
	IsOptional,
	IsString,
	Length,
	MinLength,
    Validate
} from 'class-validator'

@InputType()
export class PasswordChangeInput {
	@Field(() => String)
	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	public currentPassword: string

	@Field(() => String)
	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	public password: string

	@Field(() => String)
	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	@Validate(IsPasswordsMatchingConstraint)
	public passwordRepeat: string

	@Field(() => String, { nullable: true })
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	@Length(6, 6)
	public pin?: string
}
