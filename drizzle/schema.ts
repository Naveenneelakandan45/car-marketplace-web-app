import { pgTable, serial, varchar } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const carListing = pgTable("carListing", {
	id: serial().primaryKey().notNull(),
	listingTitle: varchar().notNull(),
	tagline: varchar(),
	originalPrice: varchar(),
	sellingPrice: varchar().notNull(),
	category: varchar().notNull(),
	condition: varchar().notNull(),
	make: varchar().notNull(),
	model: varchar().notNull(),
	year: varchar().notNull(),
	driveType: varchar().notNull(),
	transmission: varchar().notNull(),
	fuelType: varchar().notNull(),
	mileage: varchar().notNull(),
	engineSize: varchar(),
	cylinder: varchar(),
	color: varchar().notNull(),
	door: varchar().notNull(),
	vin: varchar(),
	offerType: varchar(),
	listingDescription: varchar().notNull(),
});
