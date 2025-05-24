export interface EmailTemplateData {
  [key: string]: any;
}

export interface SendEmailOptions {
  email: string;
  subject: string;
  templateName: string;
  templateData: EmailTemplateData;
}
