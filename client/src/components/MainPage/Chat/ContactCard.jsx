
export default function ContactCard(props) {

    const contact = props.contact;
    const setContact = props.setContact;

    const getFlag = (flag) => {
        const toReturn = (flag)? "Yes" : "No";
        return toReturn;
    }

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm mx-auto border border-gray-200">
            <div className="flex justify-between items-center mb-7">
                <h2 className="text-2xl font-semibold truncate">{contact.ContactName}</h2>
                <button
                    onClick={() => setContact(null)}
                    className="text-indigo-600 hover:bg-indigo-100 px-4 py-2 rounded-lg transition font-semibold"
                    >
                    Chiudi
                </button>
            </div>

            <div className="space-y-6 text-gray-700">
                {[
                    { label: 'ID', value: contact.ContactId },
                    { label: 'Name', value: contact.ContactName },
                    { label: 'Surname', value: contact.ContactSurname },
                    { label: 'Phone Number', value: contact.ContactNumber },
                    { label: 'Blocked', value: getFlag(contact.Blocked)},
                    { label: 'Reported', value: getFlag(contact.Reported)},
                    ].map(({ label, value }) => (
                    <div key={label}>
                        <label className="block text-sm font-medium mb-1">{label}</label>
                        <p className="truncate">{value}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}