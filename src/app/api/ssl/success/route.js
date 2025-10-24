// app/api/ssl/success/route.js
<<<<<<< HEAD
// import { NextResponse } from "next/server";

// export const POST = async (req) => {

//   return NextResponse.redirect(
//         `http://localhost:3000/ssl/success`
//        );
=======
import { NextResponse } from "next/server";

export const POST = async (req) => {

  return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/ssl/success`
       );
>>>>>>> 48999ef (ssl commerz payment getway)

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

export const POST = async () => {
  return NextResponse.redirect("https://book-tranding-hub.vercel.app/ssl/success", 302);
};


