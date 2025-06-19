import { transporter } from "../helpers/transporter";
import fs from "fs";
import path from "path";
import handlebars from "handlebars";
import { SendEmailOptions } from "../types/email";

export const sendVerificationEmail = async ({
  email,
  subject,
  templateName,
  templateData,
}: SendEmailOptions) => {
  const templatePath = path.join(__dirname, "../templates", `${templateName}.hbs`);
  const source = fs.readFileSync(templatePath, "utf8");
  const compiled = handlebars.compile(source);
  const html = compiled(templateData);

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject,
    html,
  });
};

export const sendReminderEmail = async ({
  email,
  subject,
  templateName,
  templateData,
}: SendEmailOptions) => {
  const templatePath = path.join(__dirname, "../templates", `${templateName}.hbs`);
  const source = fs.readFileSync(templatePath, "utf8");
  const compiled = handlebars.compile(source);
  const html = compiled(templateData);

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject,
    html,
  });
};
