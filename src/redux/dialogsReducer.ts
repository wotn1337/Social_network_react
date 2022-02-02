const SEND_MESSAGE = 'SEND_MESSAGE';

export type initialStateType = {
    dialogsData: Array<{ id: number, name: string, avatar: string }>,
    messagesData: Array<{ id: number, message: string, isMine: boolean }>
}

const initialState: initialStateType = {
    dialogsData: [
        {
            id: 1,
            name: "Iron Man",
            avatar: "https://www.redwolf.in/image/cache/catalog/artwork-Images/mens/iron-man-mask-design-image'-700x700.png"
        },
        {id: 2, name: "Captain America", avatar: "https://i.insider.com/6083405d5f61100018270ff3?width=700"},
        {
            id: 3,
            name: "Black Widow",
            avatar: "https://www.soyuz.ru/public/uploads/files/2/7226065/20180924195850a357af1e7c.jpg"
        },
        {id: 4, name: "Quicksilver", avatar: "https://i.ytimg.com/vi/gSubESBcRE4/maxresdefault.jpg"},
    ],
    messagesData: [
        {id: 1, message: "Hi, bro!", isMine: true},
        {id: 2, message: "Let's SMASH!!!!!!!!!!!!!!!!!!!!", isMine: false},
        {id: 3, message: "What are doing on Friday?", isMine: false},
        {id: 4, message: "LET'S GOOOOOOOOOOOOOOOOOOOOOOOOOOOO", isMine: true},
        {id: 5, message: "I'M HUUUUUUUUUUUUUUUUUUUUUUULK", isMine: true},
        {
            id: 10,
            message: "nlasndklnlafnklsanklfnsdmvpsmkpvnsrnvksenfoiehou wot4w t8w4984yt 9834t34t 9349ty934t9y49yt 02thilseh fjcsnk ahlk rkagsihg uihuihsuih gishuighrhguirehguihuiwhh34t 89w4yt9 4gw4hguisdjhkjh kjshgi euhuiehuiwe hiuhfeh hi 89fw89 u98w89ruw9rw3riw3hriow3w orh3ohro3 rh32orh o23rh o23 3h       23hru23h89rh23rh823r9239rh3rh923hr823hr34hr9 c94h h34hg 93gh 3",
            isMine: false
        },
        {id: 6, message: "H", isMine: true},
        {id: 7, message: "U", isMine: false},
        {id: 8, message: "L", isMine: true},
        {id: 9, message: "K", isMine: false},
    ],
};

const dialogsReducer = (state = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case SEND_MESSAGE:
            const newMessage = {
                id: state.messagesData.length + 1,
                message: action.message,
                isMine: true
            };
            return {
                ...state,
                messagesData: [...state.messagesData, newMessage]
            };

        default:
            return state;
    }
}

type ActionsTypes = sendMessageActionType

type sendMessageActionType = { type: typeof SEND_MESSAGE, message: string };

export const sendMessage = (message: string): sendMessageActionType => ({ type: SEND_MESSAGE, message });

export default dialogsReducer;