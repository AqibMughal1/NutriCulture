import { CoreAssistantMessage, CoreToolMessage } from "ai";
import { messages, projects, subscriptions, users } from "./db/schema";

type ResponseMessageWithoutId = CoreToolMessage | CoreAssistantMessage;
export type ResponseMessage = ResponseMessageWithoutId & { id: string };

export type Project = typeof projects.$inferSelect;
export type DBMessage = typeof messages.$inferSelect;

export type ProjectWithMessages = Project & {
  messages: DBMessage[];
};

export type User = typeof users.$inferSelect;

export type Subscription = typeof subscriptions.$inferSelect;
