-- INSERT nella tabella User
INSERT INTO User (Name, Surname, PhoneNumber, Username)
VALUES
('Mario', 'Rossi', '1234567890', 'mrossi'),
('Luigi', 'Verdi', '2345678901', 'lverdi'),
('Giulia', 'Bianchi', '3456789012', 'gbianchi'),
('Anna', 'Neri', '4567890123', 'aneri'),
('Marco', 'Gialli', '5678901234', 'mgialli'),
('Sara', 'Rosa', '6789012345', 'srosa'),
('Paolo', 'Blu', '7890123456', 'pblu'),
('Luca', 'Marrone', '8901234567', 'lmarrone'),
('Elisa', 'Grigi', '9012345678', 'egrigi'),
('Franco', 'Viola', '0123456789', 'fviola');

-- INSERT nella tabella Setting
INSERT INTO Setting (SettingId, FontSize, Background, OnlineVisible, LastOnline, PhotoVisible, User)
VALUES
(1, 14, 'white', 1, 1, 1, 'mrossi'),
(2, 12, 'dark', 0, 1, 1, 'lverdi'),
(3, 16, 'blue', 1, 0, 1, 'gbianchi'),
(4, 12, 'green', 1, 1, 0, 'aneri'),
(5, 15, 'grey', 1, 1, 1, 'mgialli'),
(6, 13, 'yellow', 0, 0, 1, 'srosa'),
(7, 12, 'pink', 1, 1, 1, 'pblu'),
(8, 14, 'orange', 1, 0, 1, 'lmarrone'),
(9, 12, 'black', 1, 1, 1, 'egrigi'),
(10, 13, 'cyan', 0, 1, 0, 'fviola');

-- INSERT nella tabella Contact
INSERT INTO Contact (ContactId, ContactName, ContactNumber, ContactSurname, Blocked, Reported, ContactOwner)
VALUES
(1, 'Giorgio', '1111111111', 'Verdi', 0, 0, 'mrossi'),
(2, 'Laura', '2222222222', 'Blu', 1, 0, 'lverdi'),
(3, 'Simone', '3333333333', 'Rossi', 0, 1, 'gbianchi'),
(4, 'Martina', '4444444444', 'Neri', 0, 0, 'aneri'),
(5, 'Davide', '5555555555', 'Gialli', 0, 0, 'mgialli'),
(6, 'Irene', '6666666666', 'Rosa', 1, 1, 'srosa'),
(7, 'Enrico', '7777777777', 'Blu', 0, 0, 'pblu'),
(8, 'Tania', '8888888888', 'Marrone', 0, 1, 'lmarrone'),
(9, 'Valeria', '9999999999', 'Grigi', 0, 0, 'egrigi'),
(10, 'Gianluca', '0000000000', 'Viola', 1, 0, 'fviola');

-- INSERT nella tabella GroupChat
INSERT INTO GroupChat (GroupName, GroupOwner, GroupId, CreationDate, Archived)
VALUES
('Famiglia', 'mrossi', 1, '2024-01-01', 0),
('Lavoro', 'lverdi', 2, '2024-02-01', 0),
('Amici', 'gbianchi', 3, '2024-03-01', 1),
('Sport', 'aneri', 4, '2024-04-01', 0),
('Viaggi', 'mgialli', 5, '2024-05-01', 0);

-- INSERT nella tabella Membership
INSERT INTO Membership (GroupId, ContactId)
VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 4),
(3, 5),
(3, 6),
(4, 7),
(4, 8),
(5, 9),
(5, 10);

-- INSERT nella tabella Call
INSERT INTO Call (CallId, StartTime, EndTime)
VALUES
(1, '2024-05-01 10:00:00', '2024-05-01 10:30:00'),
(2, '2024-05-02 11:00:00', '2024-05-02 11:45:00'),
(3, '2024-05-03 12:00:00', '2024-05-03 12:20:00'),
(4, '2024-05-04 13:00:00', '2024-05-04 13:50:00'),
(5, '2024-05-05 14:00:00', '2024-05-05 14:30:00'),
(6, '2024-05-06 15:00:00', '2024-05-06 15:40:00'),
(7, '2024-05-07 16:00:00', '2024-05-07 16:10:00'),
(8, '2024-05-08 17:00:00', '2024-05-08 17:45:00'),
(9, '2024-05-09 18:00:00', '2024-05-09 18:20:00'),
(10, '2024-05-10 19:00:00', '2024-05-10 19:30:00');

-- INSERT nella tabella Participation
INSERT INTO Participation (CallId, ContactId)
VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 4),
(3, 5),
(3, 6),
(4, 7),
(4, 8),
(5, 9),
(5, 10);

-- INSERT nella tabella Chat
INSERT INTO Chat (CreationDate, Archived, ChatId, ContactId)
VALUES
('2024-05-01', 0, 1, 1),
('2024-05-02', 1, 2, 2),
('2024-05-03', 0, 3, 3),
('2024-05-04', 0, 4, 4),
('2024-05-05', 1, 5, 5),
('2024-05-06', 0, 6, 6),
('2024-05-07', 0, 7, 7),
('2024-05-08', 0, 8, 8),
('2024-05-09', 0, 9, 9),
('2024-05-10', 0, 10, 10);

-- INSERT nella tabella Message
INSERT INTO Message (MessageId, Text, Read, Pinned, ChatId, Time, SentReceived, GroupId, Date, MediaPath, MessageType, PollTitle, AuthorId)
VALUES
(1, 'Ciao, come va?', 1, 0, 1, '10:00:00', 1, NULL, '2024-05-01', NULL, 'text', NULL, 1),
(2, 'Bene, grazie!', 1, 0, 1, '10:01:00', 0, NULL, '2024-05-01', NULL, 'text', NULL, 2),
(3, 'Guarda questa foto!', 1, 0, 2, '11:00:00', 1, NULL, '2024-05-02', '/media/photo1.jpg', 'image', NULL, 2),
(4, 'Interessante', 1, 0, 3, '12:00:00', 1, NULL, '2024-05-03', NULL, 'text', NULL, 3),
(5, 'Parliamo dopo', 0, 0, 4, '13:00:00', 1, NULL, '2024-05-04', NULL, 'text', NULL, 4),
(6, 'Video allegato', 1, 1, 5, '14:00:00', 1, NULL, '2024-05-05', '/media/video1.mp4', 'video', NULL, 5),
(7, 'Sondaggio: Dove andiamo?', 1, 0, NULL, '15:00:00', 1, 5, '2024-05-06', NULL, 'poll', 'Destinazione preferita', 6),
(8, 'Risposta al sondaggio', 1, 0, NULL, '16:00:00', 1, 5, '2024-05-06', NULL, 'text', NULL, 7),
(9, 'File condiviso', 1, 0, 6, '17:00:00', 1, NULL, '2024-05-07', '/docs/file.pdf', 'document', NULL, 8),
(10, 'Arrivo tra poco', 0, 0, 7, '18:00:00', 1, NULL, '2024-05-08', NULL, 'text', NULL, 9);

-- INSERT nella tabella OptionsList
INSERT INTO OptionsList (OptionsListId, Text, Clicks, PollId)
VALUES
(1, 'Montagna', 3, 7),
(2, 'Mare', 5, 7),
(3, 'Città darte', 2, 7);


INSERT INTO Draft (DraftId, DraftContent, DraftCreationDate, ChatId, GroupId)
VALUES
(1, 'Scrivo dopo', '2024-05-09 12:00:00', 8, NULL),
(2, 'Non dimenticare la riunione', '2024-05-09 13:00:00', NULL, 2),
(3, 'Porta il documento firmato', '2024-05-09 14:00:00', 9, NULL);

-- INSERT nella tabella Reaction
INSERT INTO Reaction (ReactionId, Emoticon, MessageId)
VALUES
(1, '👍', 1),
(2, '😂', 2),
(3, '❤️', 7);

-- INSERT nella tabella Notification
INSERT INTO Notification (NotificationId, Time, MessageId, ReactionId, CallId)
VALUES
(1, '10:01:30', 1, NULL, NULL),
(2, '10:02:00', NULL, 1, NULL),
(3, '15:30:00', 7, NULL, NULL),
(4, '16:05:00', NULL, 3, NULL),
(5, '18:30:00', NULL, NULL, 1),
(6, '19:00:00', 10, NULL, NULL);
