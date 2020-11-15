import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Notification {  
  @Field({ nullable: true })
  message?: string;  
}

export interface NotificationPayload {  
  message?: string;
}