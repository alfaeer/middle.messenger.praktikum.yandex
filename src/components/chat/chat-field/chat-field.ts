import Block from '@framework/Block.ts';

export default class ChatField extends Block {
    constructor(props: BlockProps) {
        super({
            ...props,
        });
    }

    override render(): string {
        return `
            <div class="chat-field-wrapper {{#if selected}}selected{{/if}}" data-message-id="{{id}}">
                <div class="chat-field-item">
                    <div class="chat-field-item-data">
                        {{{ Avatar }}}
                        <div class="data-box">
                            <div class="profile">
                                <h4>{{title}}</h4>
                                <p>{{last_message.content}}</p>
                            </div>
                        </div>
                        <div class="info-box">
                            <div class="time-box auto-flex-size">{{messageTime}}</div>
                            {{#if unread_count}}
                                <div class="notifications-box auto-flex-size">
                                    <!--<div class="notification-value">-->{{unread_count}}<!--</div>-->
                                </div>
                            {{/if}}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
