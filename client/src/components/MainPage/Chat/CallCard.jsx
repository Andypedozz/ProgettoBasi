
import styles from "./CallCard.module.css"

export default function CallCard(props) {

    const call = props.call;
    const setCall = props.setCall;

    return (
        <div className={styles.callCard}>
            <div className={styles.callCardHeader}>
                <h2>Call {call.CallId}</h2>
                <button onClick={() => setCall(null)}>Chiudi</button>
            </div>
            <div className={styles.callCardBody}>
                <div>
                    <label htmlFor="">Date</label>
                    <p>{call.Date}</p>
                </div>
                <div>
                    <label htmlFor="">Start time</label>
                    <p>{call.StartTime}</p>
                </div>
                <div>
                    <label htmlFor="">End time</label>
                    <p>{call.EndTime}</p>
                </div>
            </div>
        </div>
    )
}