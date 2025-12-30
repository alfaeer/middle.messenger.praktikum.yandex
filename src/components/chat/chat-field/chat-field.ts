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
                                <h4>{{profileName}}</h4>
                                <p>{{message}}</p>
                            </div>
                        </div>
                        <div class="info-box">
                            <div class="time-box auto-flex-size">{{messageTime}}</div>
                            {{#if notifications}}
                                <div class="notifications-box auto-flex-size">
                                    <!--<div class="notification-value">-->{{notifications}}<!--</div>-->
                                </div>
                            {{/if}}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
