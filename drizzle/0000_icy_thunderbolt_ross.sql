-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "carListing" (
	"id" serial PRIMARY KEY NOT NULL,
	"listingTitle" varchar NOT NULL,
	"tagline" varchar,
	"originalPrice" varchar,
	"sellingPrice" varchar NOT NULL,
	"category" varchar NOT NULL,
	"condition" varchar NOT NULL,
	"make" varchar NOT NULL,
	"model" varchar NOT NULL,
	"year" varchar NOT NULL,
	"driveType" varchar NOT NULL,
	"transmission" varchar NOT NULL,
	"fuelType" varchar NOT NULL,
	"mileage" varchar NOT NULL,
	"engineSize" varchar,
	"cylinder" varchar,
	"color" varchar NOT NULL,
	"door" varchar NOT NULL,
	"vin" varchar,
	"offerType" varchar,
	"listingDescription" varchar NOT NULL
);

*/