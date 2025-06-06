CREATE TABLE User (
	Name	TEXT NOT NULL,
	Surname	TEXT NOT NULL,
	PhoneNumber	TEXT NOT NULL,
	Username	TEXT,
	PRIMARY KEY(Username)
)

CREATE TABLE Call (
	CallId	INTEGER,
	StartTime	TEXT NOT NULL,
	EndTime	TEXT NOT NULL,
	PRIMARY KEY(CallId)
)

CREATE TABLE Setting (
	SettingId	INTEGER,
	FontSize	INTEGER NOT NULL DEFAULT 12,
	Background	TEXT NOT NULL,
	OnlineVisible	INTEGER NOT NULL DEFAULT 1,
	LastOnline	INTEGER NOT NULL DEFAULT 1,
	PhotoVisible	INTEGER NOT NULL DEFAULT 1,
	User	TEXT NOT NULL,
	PRIMARY KEY(SettingId),
	FOREIGN KEY(User) REFERENCES User(Username),
	CHECK(OnlineVisible IN (0, 1)),
	CHECK(LastOnline IN (0, 1)),
	CHECK(PhotoVisible IN (0, 1))
)

CREATE TABLE Contact (
	ContactId	INTEGER,
	ContactName	TEXT NOT NULL,
	ContactNumber	TEXT NOT NULL,
	ContactSurname	TEXT NOT NULL,
	Blocked	INTEGER DEFAULT 0,
	Reported	INTEGER DEFAULT 0,
	ContactOwner	TEXT NOT NULL,
	PRIMARY KEY(ContactId),
	FOREIGN KEY(ContactOwner) REFERENCES User(Username),
	CHECK(Blocked IN (0, 1)),
	CHECK(Reported IN (0, 1))
)

CREATE TABLE GroupChat (
	GroupName	TEXT NOT NULL,
	GroupOwner	TEXT NOT NULL,
	GroupId	INTEGER,
	CreationDate	TEXT NOT NULL,
	Archived	INTEGER DEFAULT 0,
	PRIMARY KEY(GroupId),
	FOREIGN KEY(GroupOwner) REFERENCES User(Username)
)

CREATE TABLE Membership (
	GroupId	TEXT,
	ContactId	INTEGER,
	PRIMARY KEY(GroupId,ContactId),
	FOREIGN KEY(ContactId) REFERENCES Contact(ContactId),
	FOREIGN KEY(GroupId) REFERENCES GroupChat(GroupId)
)

CREATE TABLE Participation (
	CallId	INTEGER,
	ContactId	INTEGER,
	FOREIGN KEY(CallId) REFERENCES Call(CallId),
	FOREIGN KEY(ContactId) REFERENCES Contact(ContactId)
)

CREATE TABLE Chat (
	CreationDate	DATE NOT NULL,
	Archived	INTEGER DEFAULT 0,
	ChatId	INTEGER,
	ContactId	INTEGER NOT NULL,
	PRIMARY KEY(ChatId),
	FOREIGN KEY(ContactId) REFERENCES Contact(ContactId),
	CHECK(Archived IN (0, 1))
)

CREATE TABLE Message (
	MessageId	INTEGER,
	Text	TEXT NOT NULL,
	Read	INTEGER NOT NULL,
	Pinned	INTEGER DEFAULT 0,
	ChatId	INTEGER,
	Time	TEXT NOT NULL,
	SentReceived	INTEGER NOT NULL,
	GroupId	INTEGER,
	Date	TEXT NOT NULL,
	MediaPath	TEXT,
	MessageType	TEXT NOT NULL,
	PollTitle	TEXT,
	AuthorId	INTEGER,
	PRIMARY KEY(MessageId),
	FOREIGN KEY(AuthorId) REFERENCES Contact(ContactId),
	FOREIGN KEY(ChatId) REFERENCES Chat(ChatId),
	FOREIGN KEY(GroupId) REFERENCES GroupChat(GroupId),
	CHECK(Read IN (0, 1)),
	CHECK(Pinned IN (0, 1)),
	CHECK(SentReceived IN (0, 1))
)


CREATE TABLE OptionsList (
	OptionsListId	INTEGER,
	Text	TEXT NOT NULL,
	Clicks	INTEGER DEFAULT 0,
	PollId	INTEGER NOT NULL,
	PRIMARY KEY(OptionsListId),
	FOREIGN KEY(PollId) REFERENCES Message(MessageId)
)

CREATE TABLE Draft (
	DraftId	INTEGER,
	DraftContent	TEXT NOT NULL,
	DraftCreationDate	TEXT NOT NULL,
	ChatId	INTEGER,
	GroupId	INTEGER,
	PRIMARY KEY(DraftId),
	FOREIGN KEY(ChatId) REFERENCES Chat(ChatId),
	FOREIGN KEY(GroupId) REFERENCES GroupChat(GroupId)
)

CREATE TABLE Reaction (
	ReactionId	INTEGER,
	Emoticon	TEXT NOT NULL,
	MessageId	INTEGER NOT NULL,
	PRIMARY KEY(ReactionId),
	FOREIGN KEY(ReactionId) REFERENCES Message(MessageId)
)

CREATE TABLE Notification (
	NotificationId	INTEGER,
	Time	TEXT NOT NULL,
	MessageId	INTEGER,
	ReactionId	INTEGER,
	CallId	INTEGER,
	PRIMARY KEY(NotificationId),
	FOREIGN KEY(CallId) REFERENCES Call(CallId),
	FOREIGN KEY(MessageId) REFERENCES Message(MessageId),
	FOREIGN KEY(ReactionId) REFERENCES Reaction(ReactionId)
)
