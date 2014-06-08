import {createStoreAndActions} from 'flux-es6';

import ChatPanelStore from './ChatPanelStore';
import ChatPanelActions from './ChatPanelActions';

export class ChatPanelElement extends HTMLElement {
	// Fires when an instance of the ChatPanelElement is created
	createdCallback() {
		var [chatBoxStore, chatBoxActions] = createStoreAndActions(ChatPanelStore, ChatPanelActions);

		this.chatBoxStore = chatBoxStore;
		this.chatBoxActions = chatBoxActions;
	}

	// Fires when the instance is inserted into the document
	attachedCallback() {
		this.chatBoxStore.addChangeListenerAndNotify(this.chatBoxStoreChanged, this);
	}

	render() {
		var documentFragment = document.createDocumentFragment();

		this.props.forEach((messageData) => {
			var messageDiv = document.createElement('div');
			var messageSpan = document.createElement('span');
			var userNameSpan = document.createElement('span');

			userNameSpan.textContent = messageData.userName;
			messageSpan.textContent = messageData.messageText;
			messageDiv.appendChild(userNameSpan);
			messageDiv.appendChild(messageSpan);

			documentFragment.appendChild(messageDiv);
		});

		this.innerHTML = '';
		this.appendChild(documentFragment);
	}

	chatBoxStoreChanged() {
		this.props = this.chatBoxStore.getState();
		this.render();
	}
}