import nodemailer from "nodemailer";

let cachedTransporter;

function getTransporter() {
	if (cachedTransporter) return cachedTransporter;

	const host = process.env.SMTP_HOST;
	const port = Number(process.env.SMTP_PORT || 587);
	const user = process.env.SMTP_USER;
	const pass = process.env.SMTP_PASS;

	if (!host || !user || !pass) {
		console.warn("SMTP env not fully configured; email sending will be skipped.");
		return null;
	}

	cachedTransporter = nodemailer.createTransport({
		host,
		port,
		secure: port === 465,
		auth: { user, pass },
	});

	return cachedTransporter;
}

export async function sendEmail({ to, subject, html, text, from }) {
	try {
		const transporter = getTransporter();
		if (!transporter) {
			return { skipped: true };
		}

		const fromAddress = from || process.env.SMTP_FROM || process.env.SMTP_USER;

		const info = await transporter.sendMail({
			from: fromAddress,
			to,
			subject,
			html,
			text,
		});

		return { messageId: info.messageId };
	} catch (error) {
		console.error("Email send error:", error);
		throw error;
	}
}



