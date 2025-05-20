// import { transporter } from "../helpers/mailer";
// import fs from "fs";
// import handlebars from "handlebars";
// import path from "path";

// export const sendVerificationEmail = async (email: string, name: string, link: string) => {
//   const templatePath = path.join(__dirname, "../templates", "verifyCompany.hbs");
//   const source = fs.readFileSync(templatePath, "utf8");
//   const html = handlebars.compile(source)({ name, link });

//   await transporter.sendMail({
//     from: process.env.GMAIL_USER,
//     to: email,
//     subject: "Company Registration Verification",
//     html,
//   });
// };


import { transporter } from "../helpers/mailer";
import fs from "fs";
import handlebars from "handlebars";
import path from "path";

interface EmailTemplateData {
  [key: string]: any;
}

export const sendVerificationEmail = async ({
  email,
  subject,
  templateName,
  templateData,
}: {
  email: string;
  subject: string;
  templateName: string; // e.g., "verifyCompany" or "verify"
  templateData: EmailTemplateData; // e.g., { name, link } or { username, link }
}) => {
  const templatePath = path.join(__dirname, "../templates", `${templateName}.hbs`);
  const source = fs.readFileSync(templatePath, "utf8");
  const html = handlebars.compile(source)(templateData);

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject,
    html,
  });
};
