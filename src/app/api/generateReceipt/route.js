import puppeteer from "puppeteer";

export async function POST(req) {
  try {
    const donation = await req.json();

    // Generate HTML string
    const html = generateReceiptHTML(donation);

    // Launch headless browser
    const browser = await puppeteer.launch({ args: ["--no-sandbox"] }); // required for Vercel
    const page = await browser.newPage();

    // Set HTML content
    await page.setContent(html, { waitUntil: "networkidle0" });

    // Generate PDF in memory
    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });

    await browser.close();

    // Return PDF to client
    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="receipt-${donation.transactionId}.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// Include the HTML generator here
function generateReceiptHTML(donation) {
  return `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { text-align: center; }
          .info { margin-top: 20px; }
          .info p { margin: 5px 0; }
          .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #555; }
        </style>
      </head>
      <body>
        <h1>Donation Receipt</h1>
        <div class="info">
          <p><strong>Name:</strong> ${donation.name}</p>
          <p><strong>Email:</strong> ${donation.email}</p>
          <p><strong>Amount:</strong> $${donation.amount}</p>
          <p><strong>Transaction ID:</strong> ${donation.transactionId}</p>
          <p><strong>Date:</strong> ${donation.date}</p>
        </div>
        <div class="footer">
          Thank you for your generous donation!
        </div>
      </body>
    </html>
  `;
}
