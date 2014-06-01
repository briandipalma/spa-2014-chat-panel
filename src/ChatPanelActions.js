import ChatPanelConstants from './ChatPanelConstants';

export default class {
    constructor(chatPanelDispatcher) {
        this.chatPanelDispatcher = chatPanelDispatcher;
    }

    messageReceived(userName, messageText) {
        this.chatPanelDispatcher.handleServerAction({
            actionType: ChatPanelConstants.MESSAGE_RECEIVED,
			userName: userName,
            messageText: messageText
        });
    }

	messagesReceived(messages) {
		this.chatPanelDispatcher.handleServerAction({
			actionType: ChatPanelConstants.MESSAGES_RECEIVED,
			messages: messages
		});
	}
};