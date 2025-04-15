import { emailConfig } from "./email.config.js";
import {PASSWORD_RESET_REQUEST_TEMPLATE,PASSWORD_RESET_SUCCESS_TEMPLATE,VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE} from "../mailtrap/emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    try {
      let emailSubject = "Verify your Email";
      let emailCategory = "Email Verification";
      let htmlContent = VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken)
      const response = await emailConfig(email,htmlContent,emailSubject,emailCategory)
      console.log("Verification sent successfully");
   
    } catch (error) {
        console.error(`Error sending verification`, error);
        throw new Error(`Error sending verification email: ${error}`);
    }
};

export const sendWelcomeEmail = async (email, name) => {
  try {
    let emailSubject = "Welcome Email";
    let emailCategory = "Welcome Email";
    let htmlContent = WELCOME_EMAIL_TEMPLATE;
    const response = await emailConfig(email,htmlContent,emailSubject,emailCategory)
    console.log("Welcome email sent successfully", response);
  } catch (error) {
    console.error(`Error sending welcome email`, error);

    throw new Error(`Error sending welcome email: ${error}`);
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = [{ email }];

  try {
    let emailSubject = "Reset your password";
    let emailCategory = "Password Reset";
    let htmlContent = PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL)
    const response = await emailConfig(email,htmlContent,emailSubject,emailCategory)
    console.log("Password reset successfully");

  } catch (error) {
    console.error(`Error sending password reset email`, error);

    throw new Error(`Error sending password reset email: ${error}`);
  }
};

export const sendResetSuccessEmail = async (email) => {
  const recipient = [{ email }];

  try {

    let emailSubject = "Password Reset Successful";
    let emailCategory = "Password Reset";
    let htmlContent = PASSWORD_RESET_SUCCESS_TEMPLATE
    const response = await emailConfig(email,htmlContent,emailSubject,emailCategory)
    console.log("Password reset email sent successfully");
  } catch (error) {
    console.error(`Error sending password reset success email`, error);

    throw new Error(`Error sending password reset success email: ${error}`);
  }
};


