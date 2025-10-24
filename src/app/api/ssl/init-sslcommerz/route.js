// app/api/init-sslcommerz/route.js
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { amount, name, email, phone, paymentMethod } = await req.json();

    const tran_id = "TS-" + uuidv4();

    // const tran_id = "TS-" + Math.floor(100000 + Math.random() * 900000).toString();
    const init_url = "https://sandbox.sslcommerz.com/gwprocess/v4/api.php";

    const formData = new FormData();
    formData.append("store_id", process.env.SSLC_STORE_ID);
    formData.append("store_passwd", process.env.SSLC_STORE_PASS);
    formData.append("total_amount", amount); // dynamically set if needed
    formData.append("currency", "BDT");
    formData.append("tran_id", tran_id);

    // ✅ IMPORTANT: CALLBACK URLs
    formData.append("success_url", `${process.env.NEXT_PUBLIC_BASE_URL}/api/ssl/success?id=${tran_id}`);
    formData.append("fail_url",    `${process.env.NEXT_PUBLIC_BASE_URL}/api/ssl/fail?id=${tran_id}`);
    formData.append("cancel_url",  `${process.env.NEXT_PUBLIC_BASE_URL}/api/ssl/cancel?id=${tran_id}`);
    formData.append("ipn_url",     `${process.env.NEXT_PUBLIC_BASE_URL}/api/ssl/ipn?id=${tran_id}`);

    // ✅ CUSTOM/BILLING INFO
    formData.append("cus_name", name);
    formData.append("cus_email", email);
    formData.append("cus_add1", "Dhaka");
    formData.append("cus_city", "Dhaka");
    formData.append("cus_country", "Bangladesh");
    formData.append("cus_phone", phone);

    formData.append("product_name", "Donation");
    formData.append("product_category", "Donation");
    formData.append("product_profile", "general");
    formData.append("shipping_method", "NO"); 

   
    const requestOptions = {method: "POST", body: formData}

    let sslRes =await fetch(init_url, requestOptions)

    let sslResJson = await sslRes.json()

    return NextResponse.json({ data: sslResJson });
    // const base =
    //   process.env.SSLC_SANDBOX === "true"
    //     ? "https://sandbox.sslcommerz.com/gwprocess/v4/api.php"
    //     : "https://securepay.sslcommerz.com/gwprocess/v4/api.php";

    // const response = await fetch(base, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/x-www-form-urlencoded" },
    //   body: payload.toString()
    // });

    // const data = await response.json();

    // if (data?.status === "SUCCESS" && data?.GatewayPageURL) {
    //   // Optionally save sessionkey to DB
    //   return NextResponse.json({ url: data?.GatewayPageURL });
    // } else {
    //   console.error("SSLC init failed", data);
    //   return NextResponse.json({ error: "Failed to initiate payment" }, { status: 500 });
    // }

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};


