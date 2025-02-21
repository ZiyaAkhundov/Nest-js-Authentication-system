import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PasswordChangeModel {
    @Field(() => Boolean, { nullable: true})
    public status: boolean

    @Field(() => String, {nullable: true })
    public message: string
}