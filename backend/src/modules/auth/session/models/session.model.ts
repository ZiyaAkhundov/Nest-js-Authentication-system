import { DeviceInfo, LocationInfo, SessionMetadata } from "@/src/shared/types/session-metadata.types";
import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class LocationModel implements LocationInfo {
    @Field(() => String)
    country: string;

    @Field(() => String)
    city: string;

    @Field(() => Number)
    latitude: number;

    @Field(() => Number)
    longitude: number;
}

@ObjectType()
export class DeviceModel implements DeviceInfo {
    @Field(() => String)
    browser: string

    @Field(() => String)
    os: string

    @Field(() => String)
    type: string
}

@ObjectType()
export class SessionMetadataModel implements SessionMetadata {
    @Field(() => LocationModel)
    public location: LocationModel

    @Field(() => DeviceModel)
    public device: DeviceModel

    @Field(() => String)
    public ip: string
}

@ObjectType()
export class SessionModel {
    @Field(() => ID)
    public id: string

    @Field(() => String)
    public userId: string

    @Field(() => String)
    public createdAt: string

    @Field(() => SessionMetadataModel)
    public metadata: SessionMetadataModel
}