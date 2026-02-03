import Block from '@framework/Block.ts';
import { connect } from '@framework/Store.ts';
import ChatService from '@service/ChatService.ts';
import { ChatField } from '@components/chat/chat-field';
import { Avatar } from '@components/general';
import type { StoreStateObject } from '@/types/store-state-object';
import { convertTimeStringToTime } from '@utils/HttpUtils';

/*export default */class ChatContainer extends Block {
    private chatService!: ChatService;

    constructor(props: BlockProps) {
        super({
            ...props
        });
    }

    override componentDidMount(): void {
        this.chatService = new ChatService();
        this.chatService.getChats(false);
        this.chatService.startUpdateChatsByTimeout();
    }

    override render() {
        return `
            <div class="chat-list-box">
                {{#if chats }}
                    {{{ chats }}}
                {{else}}
                    <p>У вас нет чатов</p>
                {{/if}}
            </div>
        `;
    }

    override setProps(props: BlockProps): void {
        const chats = this.getChatData(props);
        super.setProps({ chats: chats });
    }

    private getChatData(props: BlockProps) {
        return !props ? [] : Object.values(props).reduce((acc: Array<Block>, val: ChatDataType) => {
            const field = new ChatField({
                ...val,
                messageTime: convertTimeStringToTime(val.last_message?.time),

                Avatar: new Avatar({
                    url: val.avatar,
                }),

                events: {
                    click: () => {
                        this.chatService.selectChat(val.id);
                    }
                }
            });
            acc.push(field);
            return acc;
        }, []);
    }
}

const storeMapper = (state: StoreStateObject) => {
    return {
        ...state.chat?.chats
    }
}

export default connect(storeMapper)(ChatContainer);
