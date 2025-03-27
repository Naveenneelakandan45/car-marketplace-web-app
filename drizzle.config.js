/** @type {import("drizzle-kit").Config} */
export default {
  schema:"./configs/schema.js",
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgresql://accounts:npg_zhYr7HFCvq0u@ep-late-boat-a87vi2bg-pooler.eastus2.azure.neon.tech/car-marketplace?sslmode=require"
  }
}