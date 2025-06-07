
export default function CallCard(props) {

    const call = props.call;
    const setCall = props.setCall;

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm mx-auto border border-gray-200">
            <div className="flex justify-between items-center mb-7">
                <h2 className="text-2xl font-semibold truncate">Call {call.CallId}</h2>
                <button
                    onClick={() => setCall(null)}
                    className="text-indigo-600 hover:bg-indigo-100 px-4 py-2 rounded-lg transition font-semibold"
                    >
                    Chiudi
                </button>
            </div>

            <div className="space-y-6 text-gray-700">
                {[
                    { label: 'Contact', value: call.ContactName },
                    { label: 'Start time', value: call.StartTime },
                    { label: 'End time', value: call.EndTime },
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