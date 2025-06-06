
/* Aggiornamento Impostazioni */
UPDATE Setting
SET FontSize = 1
WHERE User = 'mrossi';

UPDATE Setting
SET Background = 'dark'
WHERE User = 'mrossi';


UPDATE Setting
SET OnlineVisible = 0
WHERE User = 'mrossi';

UPDATE Setting
SET LastOnline = 0
WHERE User = 'mrossi';

UPDATE Setting
SET PhotoVisible = 0
WHERE User = 'mrossi';


/* Bloccare Contatti o Segnalarli */
UPDATE Contact
SET Blocked = 1
WHERE ContactOwner = 'egrigi' AND ContactId = 9;

UPDATE Contact 
SET Reported = 1
WHERE ContactOwner = 'egrigi' AND ContactId = 9;

/* Archiviare Chat o Gruppi */
UPDATE Chat
SET Archived = 1
WHERE ContactId IN (
    SELECT ContactId
    FROM Contact
    WHERE ContactOwner = 'mrossi'
);

UPDATE GroupChat
SET Archived = 1
WHERE GroupOwner = 'mrossi' AND GroupId = 1;