import EmailTemplated from "email-templates";
import nodemailer, { Transporter } from "nodemailer";
import * as path from "path";

import { configs } from "../configs/configs";
import { allTemplates } from "../constants/email.constants";
import { EEmailCandidateEnum } from "../enum/email-candiate.enum";
import { ApiError } from "../erorr/api.error";

class EmailService {
  private transporter: Transporter;
  private templateParser;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: configs.NO_REPLY_EMAIL,
        pass: configs.NO_REPLY_PASSWORD,
      },
    });
    this.templateParser = new EmailTemplated({
      views: {
        root: path.join(process.cwd(), "src", "statics"),
        options: {
          extension: "hbs",
        },
      },
      juice: true,
      juiceResources: {
        webResources: {
          relativeTo: path.join(process.cwd(), "src", "statics", "css"),
        },
      },
    });
  }

  public async sendCandidateEmail(
    email: string | string[],
    emailAction: EEmailCandidateEnum,
    locals: Record<string, string> = {},
  ) {
    try {
      const templateInfo = allTemplates[emailAction];
      locals.frontURL = configs.FRONT_URL;
      const html = await this.templateParser.render(
        templateInfo.templateName,
        locals,
      );
      return this.transporter.sendMail({
        from: "No reply",
        to: email,
        subject: templateInfo.subject,
        html,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const emailService = new EmailService();
