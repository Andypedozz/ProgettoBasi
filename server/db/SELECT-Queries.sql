/* Login */
SELECT *
FROM User
WHERE Username = 'mrossi';

/* Caricamento delle Chat */
SELECT Chat.ChatId, Contact.ContactName, Contact.ContactSurname, Contact.ContactNumber, Chat.CreationDate, 
Chat.Archived
FROM Chat INNER JOIN Contact ON Chat.ContactId = Contact.ContactId
WHERE Contact.ContactOwner = 'mrossi';

/* Caricamento dei Gruppi */
SELECT *
FROM GroupChat
WHERE GroupOwner = 'mrossi';

/* Caricamento dei Messaggi  delle Chat */
SELECT Text, MessageType, MediaPath, Read, SentReceived, Date, Time
FROM Message 
WHERE ChatId = 5; 

/* Caricamento dei Messaggi dei Gruppi */
SELECT M.Text, M.MessageType, M.MediaPath, M.Read, M.SentReceived, M.Date, M.Time, C.ContactName
FROM Message M
JOIN Contact C ON M.AuthorId = C.ContactId
WHERE GroupId = 5;

/* Caricamento delle Chiamate */
SELECT *
FROM Call
WHERE CallId IN (
    SELECT CallId FROM Participation WHERE ContactId IN (
        SELECT ContactId FROM Contact WHERE ContactOwner = 'mrossi'
    )
)

/* Caricamento delle Bozze per Chat */
SELECT DraftContent
FROM Draft
WHERE ChatId = 9;

/* Caricamento delle Bozze per un Gruppo */
SELECT DraftContent
FROM Draft
WHERE GroupId = 2;

/* Caricamento delle Impostazioni */
SELECT * 
FROM Setting WHERE User = 'mrossi';

/* Caricamento dei Membri di un Gruppo */
SELECT *
FROM Contact
WHERE ContactId IN (
    SELECT ContactId FROM Membership WHERE GroupId = '5'
);

/* Caricamento di tutti i contatti*/
SELECT *
FROM Contact
WHERE ContactOwner = 'mrossi';

/* Caricamento di tutti i contatti bloccati */
SELECT *
FROM Contact
WHERE ContactOwner = 'mrossi' AND Blocked = 1;

SELECT OptionsList.Text, OptionsList.Clicks
FROM OptionsList JOIN Message ON OptionsList.MessageId = Message.MessageId
WHERE Message.ChatName = <Given Chat Name>;

/* Caricamento Completo dei Songaggi in un Gruppo */
SELECT M.MessageId, O.Text, O.Clicks
FROM Message M
JOIN OptionsList O ON M.MessageId = O.PollId
AND M.GroupId = '5';

/* Caricamento delle Reaction a tutti i messaggi di una Chat */
SELECT Emoticon, MessageId
FROM Reaction
WHERE MessageId IN (
    SELECT MessageId
    FROM Message
    WHERE ChatId = 1
);

/* Caricamento delle Reaction a tutti i messaggi di un Gruppo */
SELECT Emoticon, MessageId
FROM Reaction
WHERE MessageId IN (
    SELECT MessageId
    FROM Message
    WHERE GroupId = 5
);

/* Caricamento di tutte le notifiche di un utente */
SELECT DISTINCT N.*
FROM Notification N
LEFT JOIN Message M ON N.MessageId = M.MessageId
LEFT JOIN Reaction R ON N.ReactionId = R.ReactionId
LEFT JOIN Message RM ON R.MessageId = RM.MessageId
LEFT JOIN Call C ON N.CallId = C.CallId
LEFT JOIN Participation P ON C.CallId = P.CallId
LEFT JOIN Contact ContMsg ON M.AuthorId = ContMsg.ContactId
LEFT JOIN Contact ContReact ON RM.AuthorId = ContReact.ContactId
LEFT JOIN Contact ContCall ON P.ContactId = ContCall.ContactId
WHERE ContMsg.ContactOwner = 'mrossi'
    OR ContReact.ContactOwner = 'mrossi'
    OR ContCall.ContactOwner = 'mrossi';