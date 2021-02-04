export interface ConvoMsgType {
    id: string,
    content: string,
    time: number,
    uid: string
}

export const convoMsgExample: ConvoMsgType = {
    id: 'blue',
    content: "Hey there buckaroo, I'm good over here, so what's good with you?",
    time: 1612479508417,
    uid: 'gorgon'
}