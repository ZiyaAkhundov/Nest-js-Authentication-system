import { ConflictException, Injectable } from '@nestjs/common'

import { PrismaService } from '@/src/core/prisma/prisma.service'

import { CreateUserInput } from './inputs/create-user.input'
import { hash } from 'argon2'
import { VerificationService } from '../verification/verification.service'

@Injectable()
export class AccountService {
	public constructor(private readonly prismaService: PrismaService, private readonly verificationService: VerificationService) {}

	public async me(id: string) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id
            }
        })

        return user
    }

	public async create(input: CreateUserInput) {
		const { email, password, username } = input

        const isUsernameExists = await this.prismaService.user.findUnique({
            where: {
                username
            }
        })

        if(isUsernameExists) {
            throw new ConflictException('This username is already exists')
        }

        const isEmailExists = await this.prismaService.user.findUnique({
            where: {
                email
            }
        })

        if(isEmailExists) {
            throw new ConflictException('This email is already exists')
        }

        const user = await this.prismaService.user.create({
            data: {
                username,
                email,
                password: await hash(password),
                displayName: username
            }
        })

        await this.verificationService.sendVerificationToken(user)

        return true
	}
}
