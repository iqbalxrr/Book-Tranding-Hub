// app/api/ssl/success/route.js
// import { NextResponse } from "next/server";

// export const POST = async (req) => {

//   return NextResponse.redirect(
//         `http://localhost:3000/ssl/success`
//        );

  // try {
  //   const formData = await req.formData();

  //   const tran_id = formData.get("tran_id");
  //   const val_id  = formData.get("val_id");

  //   // ✔ Validate payment now (server-to-server)
  //   const verifyUrl = `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${val_id}&store_id=${process.env.SSLC_STORE_ID}&store_passwd=${process.env.SSLC_STORE_PASS}&v=1&format=json`;

  //   const verifyRes = await fetch(verifyUrl);
  //   const verifyData = await verifyRes.json();

  //   if (verifyData.status === "VALID" || verifyData.status === "VALIDATED") {
  //     // TODO: update DB → status: paid

  //     return NextResponse.redirect(
  //       `${process.env.NEXT_PUBLIC_BASE_URL}/ssl/success`
  //     );
  //   } else {
  //     return NextResponse.redirect(
  //       `${process.env.NEXT_PUBLIC_BASE_URL}/ssl/fail?tran_id=${tran_id}`
  //     );
  //   }
  // } catch (err) {
  //   console.error("SSL SUCCESS ERROR:", err);
  //   return NextResponse.json({ error: "Server error" }, { status: 500 });
  // }
// };


// app/api/ssl/success/route.js
// app/api/ssl/success/route.js
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    // Get the incoming form data from SSLCommerz
    const formData = await req.formData();
    const tran_id = formData.get("tran_id");
    const val_id  = formData.get("val_id");

    // Optional: verify the transaction using val_id with SSLCommerz validation API
    // const verifyRes = await fetch(...);
    // const verifyData = await verifyRes.json();
    // const status = (verifyData.status === "VALID" || verifyData.status === "VALIDATED") ? "success" : "failed";

    const status = "success"; // For now, assume success

    // Redirect with query params
    const redirectUrl = `https://book-tranding-hub.vercel.app/ssl/success?status=${status}&tran_id=${tran_id}`;
    return NextResponse.redirect(redirectUrl, 303); // 303 ensures GET request on reload
  } catch (err) {
    console.error("SSL Success Error:", err);
    return NextResponse.redirect("https://book-tranding-hub.vercel.app/ssl/success?status=failed", 303);
  }
};



