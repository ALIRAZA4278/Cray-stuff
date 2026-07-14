import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { isAdmin } from "@/lib/admin-auth";

// Signs Cloudinary upload params so the browser can upload directly without
// ever seeing the API secret. Admin-only — customers can't request signatures.
export async function POST(request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { paramsToSign } = await request.json();
  const signature = cloudinary.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET);

  return NextResponse.json({ signature });
}
