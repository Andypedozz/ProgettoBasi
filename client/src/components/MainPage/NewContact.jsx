
export default function NewContact(props) {

    const user = props.user;

    const createNewContact = (e) => {
        e.preventDefault();

        const name = e.target.name.value.trim();
        const surname = e.target.surname.value.trim();
        const phone = e.target.phone.value.trim();

        const contact = {
            ContactName : name,
            ContactSurname : surname,
            ContactNumber : phone,
            Blocked : 0,
            Reported : 0,
            User : user.Username
        }

        fetch("/api/createContact", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(contact)
        })
        .then(response => response.json())
        .then(data => {
        });
    }

    return (
        <div className="w-[25%] bg-white p-6 shadow-lg">
            <form onSubmit={createNewContact} className="flex flex-col gap-3">
                <h2 className="font-bold">Create a new Contact</h2>
                <label htmlFor="name" className="text-gray-700 font-semibold">Name</label>
                <input type="text" name="name" id="name" className="bg-gray-100 border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"/>
                <label htmlFor="surname" className="text-gray-700 font-semibold">Surname</label>
                <input type="text" name="surname" id="surname" className="bg-gray-100 border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"/>
                <label htmlFor="phone" className="text-gray-700 font-semibold">Phone Number</label>
                <input type="tel" name="phone" id="phone" className="bg-gray-100 border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"/>
                <input type="submit" value="Confirm" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-md cursor-pointer transition"/>
            </form>
        </div>
    )
}