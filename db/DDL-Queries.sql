CREATE TABLE "Attachement" (
	"AttachementId"	INTEGER,
	"Blob"	BLOB,
	PRIMARY KEY("AttachementId")
)

CREATE TABLE "Call" (
	"CallId"	INTEGER,
	"StartTime"	TEXT,
	"EndTime"	TEXT,
	"CallOwner"	INTEGER,
	PRIMARY KEY("CallId"),
	FOREIGN KEY("CallOwner") REFERENCES "User"("UserId")
)

CREATE TABLE "Chat" (
	"ChatName"	VARCHAR(30),
	"CreationDate"	DATE,
	"Archived"	BOOLEAN,
	"ChatOwner"	INTEGER,
	"ChatId"	INTEGER,
	PRIMARY KEY("ChatId"),
	FOREIGN KEY("ChatOwner") REFERENCES "User"("UserId")
)

CREATE TABLE "Contact" (
	"ContactId"	INTEGER,
	"ContactName"	TEXT,
	"ContactNumber"	TEXT,
	"ContactSurname"	TEXT,
	"Blocked"	INTEGER,
	"Reported"	INTEGER,
	PRIMARY KEY("ContactId")
)

CREATE TABLE "Draft" (
	"DraftId"	INTEGER,
	"DraftContent"	TEXT,
	"DraftCreationDate"	TEXT,
	"ChatId"	INTEGER,
	PRIMARY KEY("DraftId"),
	FOREIGN KEY("ChatId") REFERENCES "Chat"("ChatId")
)

CREATE TABLE "Group" (
	"GroupName"	TEXT,
	"NumberMembers"	INTEGER,
	"GroupOwner"	INTEGER,
	PRIMARY KEY("GroupName"),
	FOREIGN KEY("GroupOwner") REFERENCES "User"("UserId")
)

CREATE TABLE "Media" (
	"MediaId"	INTEGER,
	"Blob"	BLOB,
	"Type"	TEXT,
	PRIMARY KEY("MediaId")
)

CREATE TABLE "Member" (
	"GroupName"	TEXT,
	"ContactId"	INTEGER,
	PRIMARY KEY("GroupName","ContactId"),
	FOREIGN KEY("ContactId") REFERENCES "Contact"("ContactId"),
	FOREIGN KEY("GroupName") REFERENCES "Group"("GroupName")
)

CREATE TABLE "Message" (
	"MessageId"	INTEGER,
	"Text"	TEXT,
	"SendingDate"	TEXT,
	"ReceivingDate"	TEXT,
	"Read"	INTEGER,
	"Pinned"	INTEGER,
	"ChatId"	INTEGER,
	PRIMARY KEY("MessageId"),
	FOREIGN KEY("ChatId") REFERENCES "Chat"("ChatId")
)

CREATE TABLE "Notification" (
	"NotificationId"	INTEGER,
	"Time"	TEXT
)

CREATE TABLE "OptionsList" (
	"OptionsListId"	INTEGER,
	"Text"	TEXT,
	"Clicks"	INTEGER,
	PRIMARY KEY("OptionsListId")
)

CREATE TABLE "Poll" (
	"PollId"	INTEGER,
	"Title"	TEXT,
	PRIMARY KEY("PollId")
)

CREATE TABLE "Reaction" (
	"ReactionId"	INTEGER,
	"Emoticon"	TEXT,
	"ChatId"	INTEGER,
	PRIMARY KEY("ReactionId"),
	FOREIGN KEY("ChatId") REFERENCES "Chat"("ChatId")
)

CREATE TABLE "Setting" (
	"SettingId"	INTEGER,
	"FontSize"	INTEGER,
	"Background"	BLOB,
	"OnlineVisible"	INTEGER,
	"LastOnline"	INTEGER,
	"PhotoVisible"	INTEGER,
	PRIMARY KEY("SettingId")
)

CREATE TABLE "User" (
	"UserId"	INTEGER,
	"Name"	VARCHAR(30) NOT NULL,
	"Surname"	VARCHAR(30) NOT NULL,
	"Number"	VARCHAR(10) NOT NULL,
	PRIMARY KEY("UserId")
)