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
      /* --- Global Styles --- */
      body {
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        padding: 40px;
        margin: 0;
        color: #333;
        line-height: 1.6;
        font-size: 14px;
      }

      /* --- Receipt Container/Header --- */
      .receipt-container {
        max-width: 600px;
        margin: 0 auto;
        border: 1px solid #eee;
        padding: 30px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
      }

      .header {
        text-align: center;
        margin-bottom: 30px;
        border-bottom: 2px solid #555; /* A primary color for professionalism */
        padding-bottom: 15px;
      }

      .header h1 {
        margin: 0;
        font-size: 24px;
        color: #555;
        text-transform: uppercase;
      }

      .header p {
        margin: 5px 0 0;
        font-size: 16px;
        color: #555;
      }

      /* --- Details Section (Payer & Receipt Info) --- */
      .details-section {
        margin-bottom: 25px;
        display: flex; /* Use flexbox for a two-column layout */
        justify-content: space-between;
      }

      .details-column {
        width: 48%; /* Adjust width for spacing */
      }

      .details-column h2 {
        font-size: 16px;
        color: #555;
        border-bottom: 1px solid #ddd;
        padding-bottom: 5px;
        margin-top: 0;
        margin-bottom: 10px;
      }

      .details-column p {
        margin: 3px 0;
      }

      /* --- Amount/Summary Section --- */
      .summary-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
      }

      .summary-table th, .summary-table td {
        padding: 10px;
        text-align: left;
        border-bottom: 1px solid #eee;
      }

      .summary-table th {
        background-color: #f9f9f9;
        color: #555;
      }

      .summary-table .total-row td {
        font-weight: bold;
        font-size: 18px;
        color: #008000;
        border-top: 2px solid #555;
        border-bottom: none;
      }

      .summary-table td:last-child {
        text-align: right; /* Align amounts to the right */
      }

      /* --- Footer --- */
      .footer {
        margin-top: 40px;
        text-align: center;
        font-size: 12px;
        color: #777;
        padding-top: 15px;
        border-top: 1px dashed #ddd; /* A subtle divider */
      }

      .footer strong {
        display: block;
        margin-bottom: 5px;
        font-size: 14px;
        color: #333;
      }
    </style>
  </head>
  <body>
    <div class="receipt-container">
      <div class="header">
        <h1>Official Donation Receipt</h1>
        <p><strong>Book Mate</strong> | A Trusted Books Exchanging Platform</p>
      </div>

      <div class="details-section">
        <div class="details-column">
          <h2>Donor Details</h2>
          <p><strong>Name:</strong> ${donation.name}</p>
          <p><strong>Email:</strong> ${donation.email}</p>
        </div>
        <div class="details-column">
          <h2>Receipt Details</h2>
          <p><strong>Receipt Date:</strong> ${donation.date}</p>
          <p><strong>Receipt No:</strong> ${donation.transactionId}</p>
        </div>
      </div>

      <table class="summary-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>General Donation</td>
            <td>$${donation.amount}</td>
          </tr>
          <tr class="total-row">
            <td style="font-weight: bold;">TOTAL PAID</td>
            <td>$${donation.amount}</td>
          </tr>
        </tbody>
      </table>

      <div class="footer">
        <strong>Thank you for your generous donation!</strong>
        <p>This is a legally valid receipt. Please keep it for your records.</p>
      </div>
    </div>
  </body>
</html>
  `;
}
