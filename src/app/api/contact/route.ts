import {ContactFormData} from "@/components/contact/Form";
import {config} from "@/config";
import {NextRequest} from "next/server";
import {client} from "@/sanity/lib/client";
import {SITE_SETTINGS_QUERY} from "@/sanity/queries/settings";
const nodemailer = require("nodemailer");

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {name, email, message, number} = body.formData as ContactFormData;
    const siteSettings = await client.fetch(SITE_SETTINGS_QUERY);
    const siteContact = siteSettings?.contact;
    const officePhone = siteContact?.phone || config.officePhone;
    const officeEmail = siteContact?.email || config.officeEmail;
    const officeAddress = siteContact?.address || "115 Technology Dr b101, Trumbull, CT 06611";

    // Basic validation (all fields required)
    if (!name || !email || !message || !number) {
      return new Response(JSON.stringify({error: "All fields are required"}), {
        status: 400,
        headers: {"Content-Type": "application/json"},
      });
    }

    // Step 1: Create a transporter
    const smtpTransport = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GMAIL_SENDER_EMAIL,
        pass: process.env.GMAIL_SENDER_PSWD, // App Password required
      },
    });

    // Step 2: Define email content
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission - Facial Surgery Center</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
          }
          .container {
            background-color: white;
            border-radius: 12px;
            padding: 30px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            border-bottom: 3px solid #005D64;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .logo-text {
            font-size: 24px;
            font-weight: bold;
            color: #005D64;
            margin: 0;
          }
          .subtitle {
            color: #6b7280;
            font-size: 14px;
            margin: 5px 0 0 0;
          }
          .alert {
            background-color: #fef3c7;
            border: 1px solid #f59e0b;
            border-radius: 8px;
            padding: 16px;
            margin: 20px 0;
          }
          .alert-title {
            font-weight: bold;
            color: #92400e;
            margin: 0 0 8px 0;
          }
          .field-label {
            font-weight: 600;
            color: #374151;
            display: block;
            margin-bottom: 5px;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .field-value {
            background-color: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            padding: 12px;
            font-size: 16px;
            color: #1f2937;
            margin-bottom: 20px;
            word-wrap: break-word;
          }
          .message-field {
            min-height: 100px;
            white-space: pre-wrap;
          }
          .contact-info {
            background-color: #f0f9ff;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            border-left: 4px solid #005D64;
          }
          .contact-info h3 {
            color: #005D64;
            margin-top: 0;
            font-size: 16px;
          }
          .footer {
            text-align: center;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            margin-top: 30px;
            color: #6b7280;
            font-size: 14px;
          }
          .timestamp {
            color: #9ca3af;
            font-size: 12px;
            text-align: right;
            margin-top: 15px;
            font-style: italic;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="logo-text">Facial Surgery Center</h1>
            <p class="subtitle">${officeAddress}</p>
          </div>

          <div class="alert">
            <p class="alert-title">📝 New Contact Form Submission</p>
            <p>A new patient inquiry has been submitted through the website contact form and requires your attention.</p>
          </div>

          <div class="content-section">
            <span class="field-label">Patient Name</span>
            <div class="field-value">${name}</div>

            <span class="field-label">Email Address</span>
            <div class="field-value">${email}</div>

            <span class="field-label">Phone Number</span>
            <div class="field-value">${number}</div>

            <span class="field-label">Message / Inquiry</span>
            <div class="field-value message-field">${message}</div>
          </div>

          <div class="contact-info">
            <h3>📞 Next Steps</h3>
            <p><strong>Recommended Response Time:</strong> Within 2-4 business hours</p>
            <p><strong>Contact Method:</strong> Call the patient at their number above</p>
            <p><strong>Follow-up:</strong> Consider scheduling a consultation if appropriate</p>
          </div>

          <div class="footer">
            <p><strong>Facial Surgery Center</strong><br>
            Phone: ${officePhone}<br>
            Email: ${officeEmail}<br>
            <em>Serving the Connecticut Community with Excellence</em></p>
            
            <div class="timestamp">
              Email sent automatically on ${new Date().toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    })}
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Step 3: Define email options
    const mailOptions = {
      from: `"Facial Surgery Center Website" <${process.env.GMAIL_SENDER_EMAIL}>`,
      to: config.officeEmail, // change to office email later
      replyTo: email,
      subject: `🦷 New Patient Inquiry from ${name}`,
      html: htmlContent,
      text: `
NEW CONTACT FORM SUBMISSION - FACIAL SURGERY CENTER

Patient Information:
Name: ${name}
Email: ${email}
Phone: ${number}

Message:
${message}

---
This inquiry was submitted through the Facial Surgery Center website contact form on ${new Date().toLocaleString()}.

Please respond to the patient within 2-4 business hours.

Facial Surgery Center
${officeAddress}
Phone: ${officePhone}
Email: ${officeEmail}
      `.trim(),
    };

    // Step 4: Send the email
    await smtpTransport.sendMail(mailOptions);

    return new Response(
      JSON.stringify({success: true, message: "Contact form submitted successfully"}),
      {status: 200, headers: {"Content-Type": "application/json"}}
    );
  } catch (error) {
    console.error("Error sending contact form email:", error);

    return new Response(
      JSON.stringify({error: "Failed to send message. Please try again or call us directly."}),
      {status: 500, headers: {"Content-Type": "application/json"}}
    );
  }
}
