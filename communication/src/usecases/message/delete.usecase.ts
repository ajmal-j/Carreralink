import { IMessageRepository } from "../../database/index.js";

export class DeleteMessagesUsecase {
    constructor(private readonly messageRepository: IMessageRepository) {}

    async execute({ chatId }: { chatId: string }) {
        await this.messageRepository.deleteMessages({ chatId });
    }
}