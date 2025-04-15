import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

export const mailtrapClient = new MailtrapClient({
	endpoint: process.env.MAILTRAP_ENDPOINT,
	token: process.env.MAILTRAP_TOKEN,
});

export const sender = {
	email: "hello@mernauthmaildemo.com",
	name: "Mailtrap Test",
};

// const { MailtrapClient } = require("mailtrap");

// const TOKEN = "c677c9bdbf57ba6cae0c073e98cf67c5";

// const client = new MailtrapClient({
//   token: TOKEN,
// });

// const sender = {
//   email: "hello@mernauthmaildemo.com",
//   name: "Mailtrap Test",
// };
// const recipients = [
//   {
//     email: "sangeetadammu12@gmail.com",
//   }
// ];

// client
//   .send({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     text: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);