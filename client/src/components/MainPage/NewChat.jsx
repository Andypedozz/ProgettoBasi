
export default function NewChat(props) {

    const contacts = props.contacts;

    return (
        <div>
            <h2>Start a chat with a contact</h2>
            <ul>
                {contacts.map((item, index) => (
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
            </ul>
        </div>
    )
}