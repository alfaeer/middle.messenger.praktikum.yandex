import { connect } from '@framework/Store.ts';
import Block from '@framework/Block.ts';
import type { StoreStateObject } from '@/types/store-state-object';
import MessageService from '@service/MessageService.ts';
import { MessageField } from '@components/chat/message-field';
import { convertTimeStringToTime } from '@utils/HttpUtils';

class MessageList extends Block {
    private messageService: MessageService = new MessageService();

    constructor(props: BlockProps) {
        super({
            ...props
        });
    }

    override async componentDidMount() {
        this.messageService = new MessageService();
        await this.messageService.initSocket(this.props.id);
        this.messageService.getOldMessages();
    }

    private getMessageFields(props: BlockProps): MessageField[] {
        let messagesToShowProps: MessageField[] = [];
        Object.values(props).reverse().forEach((value: MessageDataType) => {
            messagesToShowProps.push(new MessageField({
                id: value.id,
                userMessage: this.messageService?.isLoggedInUserMessage(value),
                text: value.content,
                time: convertTimeStringToTime(value.time)
            }));
        })
        return messagesToShowProps;
    }

    override setConnectedProps(props: BlockProps): void {
        super.setData({ messages: this.getMessageFields(props) });
    }

    override render() {
        return `
            <div class="message-list" data-chat-id="{{chatId}}">
                {{#if messages}}
                    {{{ messages }}}
                {{else}}
                    <div class="message-no-messages">
                        <p>У вас еще нет сообщений с этим пользователем</p>
                    </div>
                {{/if}}
            </div>
        `;
    }
}

const storeMapper = (state: StoreStateObject)=> {
    return {
        ...state.chat?.messages
    }
}

export default connect(storeMapper)(MessageList);
