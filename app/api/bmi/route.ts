import { NextResponse } from "next/server";

// Dummy API endpoint for BMI data
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // In a real implementation, you would save this to a database
    // For now, we'll just return a success response
    console.log("BMI Data received:", body);
    
    return NextResponse.json(
      { 
        success: true, 
        message: "BMI data saved successfully",
        data: body 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving BMI data:", error);
    return NextResponse.json(
      { success: false, message: "Failed to save BMI data" },
      { status: 500 }
    );
  }
}

