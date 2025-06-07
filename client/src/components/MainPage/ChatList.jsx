import { getAvatar, getLabel, getTitle } from "../utils";

export default function ChatList(props) {

    const data = props.data;
    const type = props.type;
    const setChat = props.setChat;
    const setCall = props.setCall;
    const setContact = props.setContact;

    const openItem = (item) => {
        if (type === 'chats' || type === 'groups') {
            setChat(item);
        } else if(type === 'calls') {
            setContact(null);
            setCall(item);
        }else{
            setCall(null)
            setContact(item);
        }
    };

    return (
        <div className="space-y-4 px-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-5">{getTitle(type)}</h3>

            {data.map((item, index) => (
                <div
                    key={index}
                    onClick={() => openItem(item)}
                    className="flex items-center gap-4 p-3 rounded-lg bg-indigo-50 hover:bg-indigo-100 cursor-pointer transition shadow-sm"
                >
                <div className="w-12 h-12 rounded-full overflow-hidden bg-indigo-300 flex items-center justify-center text-white text-lg font-semibold">
                    {getAvatar(item)}
                </div>
                <h3 className="text-gray-900 font-medium truncate">{getLabel(item)}</h3>
                </div>
            ))}
        </div>
    );
}
