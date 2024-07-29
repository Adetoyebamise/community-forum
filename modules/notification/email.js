const sgMail = require('@sendgrid/mail')
const handlebars = require('handlebars')
const fs = require('fs')
const path = require('path');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMailNotification = (to_email, subject, substitutional_parameters, Template_Name, is_save, whoIAm = "User") => {
  const source = fs.readFileSync(`./modules/templates/${Template_Name}.hbs`, "utf8");

  const compiledTemplate = handlebars.compile(source);
    return new Promise((resolve, reject) => {
        const msg = {
          from: {
            name: "Jojolo",
            email: process.env.COMPANY_EMAIL
          },
          to:  to_email,
          subject: subject,
          html: compiledTemplate(substitutional_parameters)
        };
      
      return sgMail.send(msg).then((
      ) => {
        return resolve()
      })
      .catch((error) => {
          if (error) {
            return reject(error);
          }
        });
    });
}

const sendMultiEmailNotification = (to_emails, subject, substitutional_parameters, Template_Names, is_save, whoIAm = "User") => {
  for (let index = 0; index < to_emails.length; index++) {
    const to_email = to_emails[index];
    const template_name = Template_Names[index];
    sendMailNotification(to_email, subject, substitutional_parameters, template_name, is_save ? index : 0, whoIAm)
  }
};

module.exports = { sendMailNotification , sendMultiEmailNotification};