import 'reflect-metadata';
import {createConnection} from "typeorm";

console.log("Starting database connection...");

createConnection().then(() => {
    console.log("Database connection successful!");

    import("./server")
})
