
export default function NewChat(props) {

    const contacts = props.contacts;

    const getAvatar = (item) => {
        return item.ContactName?.charAt(0).toUpperCase() || '?';
    };

    const getLabel = (item) => {
        return item.ContactName;
    };

    const createNewChat = (e) => {
        const contactName = e.target.value.trim();
        const contact = contacts.find(item => item.ContactName === contactName);

        fetch("/api/createChat", {
            method: "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(contact)
        })
        .then(response => response.json())
        .then(data => {

        })
    }

    return (
        <div className="w-[25%] bg-white p-6 shadow-lg">
            <h2 className="font-bold mb-3">Start a chat with a contact</h2>
            <div className="flex flex-col gap-4">
                {contacts.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-4 p-3 rounded-lg bg-indigo-50 hover:bg-indigo-100 cursor-pointer transition shadow-sm"
                    >
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-indigo-300 flex items-center justify-center text-white text-lg font-semibold"
                        onClick={(e) => createNewChat(e)}>
                        {getAvatar(item)}
                    </div>
                    <h3 className="text-gray-900 font-medium truncate">{getLabel(item)}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}