import Admin from "@/app/(models)/admin";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
  if (req.method !== "POST") {
    return NextResponse.status(405).json({ message: "Method Not Allowed" });
  }

  const { username, password } = await req.json();

  try {
    if (!username || !password) {
      return NextResponse.json({
        status: 400,
        message: "Fill all fields",
      });
    }

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return NextResponse.json({
        status: 400,
        message: "Invalid credentials",
      });
    }

    // Verify the password
    if (password !== admin.password) {
      return NextResponse.json({
        status: 400,
        message: "Invalid credentials",
      });
    }

    if (`${admin._id}` !== process.env.ADMIN_ID) {
      return NextResponse.json({
        status: 400,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        _id: admin._id,
        name: admin.username,
      },
      process.env.JWT_KEY
    );

    const response = NextResponse.json(
      {
        message: "Login successfully",
        success: true,
        admin: admin,
      },
      {
        status: 201,
      }
    );

    response.cookies.set("authToken", token, {
      expiresIn: "1d",
      httpOnly: true,
    });

    return response;
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      {
        message: "Error",
        error,
      },
      { status: 500 }
    );
  }
}

// get admin from cookie
export async function GET(request) {
  const authToken = request.cookies.get("authToken")?.value;

  // Check if authToken exists
  if (!authToken) {
    return NextResponse.json(
      {
        message: "No token found",
        success: false,
      },
      {
        status: 401,
      }
    );
  }

  try {
    const data = jwt.verify(authToken, process.env.JWT_KEY);
    const user = await Admin.findById(data._id).select("-password -username");

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json(
      {
        message: "Error",
        error,
      },
      { status: 500 }
    );
  }
}
