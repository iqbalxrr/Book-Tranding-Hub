import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { tran_id, val_id } = await req.json();

  const url = `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${val_id}&store_id=${process.env.SSLC_STORE_ID}&store_passwd=${process.env.SSLC_STORE_PASS}&v=1&format=json`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    console.log(data);

    // check transaction validation
    if (data.status === "VALID" || data.status === "VALIDATED") {
      // Optionally, update your DB order status to 'paid'
      // await db.orders.update({ tran_id }, { status: 'paid' });
      return NextResponse.json({ status: "VALID", data });
    } else {
      return NextResponse.json({ status: "FAILED", data });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: "ERROR" });
  }
};
