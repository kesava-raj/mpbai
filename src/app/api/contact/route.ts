import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, phone } = body;

        // 1. Simulate sending the email to kesav@myprobuddy.com
        console.log("=====================================");
        console.log("📧 NEW CONTACT FORM SUBMISSION");
        console.log("To: kesav@myprobuddy.com");
        console.log("Subject: New Project Inquiry (from AI Chat)");
        console.log("-------------------------------------");
        console.log(`Name:  ${name}`);
        console.log(`Email: ${email}`);
        console.log(`Phone: ${phone}`);
        console.log("=====================================");

        // 2. Try Storing data in the Google Sheet remotely
        const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
        let sheetSuccess = false;

        if (webhookUrl) {
            try {
                const sheetRes = await fetch(webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        phone: phone,
                        source: 'AI Chat UI'
                    })
                });

                if (sheetRes.ok) {
                    console.log("✅ Successfully stored in Google Sheet!");
                    sheetSuccess = true;
                } else {
                    console.error(`❌ Google Sheet rejected the request (Status: ${sheetRes.status}). This usually means your Google Workspace Admin blocks public access to Apps Script Webhooks.`);
                }
            } catch (sheetError) {
                console.error("❌ Failed to push to Google Sheet:", sheetError);
            }
        } else {
            console.warn("⚠️ GOOGLE_SHEETS_WEBHOOK_URL is not set in .env.local.");
        }

        // 3. Fallback: Store locally in an Excel-compatible CSV file if Google Sheets fails
        if (!sheetSuccess) {
            console.log("🔄 Fallback: Saving lead to local Excel-compatible leads_database.csv file instead...");
            const csvFilePath = path.join(process.cwd(), 'leads_database.csv');
            const timestamp = new Date().toISOString();

            if (!fs.existsSync(csvFilePath)) {
                fs.writeFileSync(csvFilePath, 'Timestamp,Name,Email,Phone,Source\n');
            }

            const csvRow = `"${timestamp}","${name.replace(/"/g, '""')}","${email.replace(/"/g, '""')}","${phone.replace(/"/g, '""')}","AI Chat"\n`;
            fs.appendFileSync(csvFilePath, csvRow);
            console.log("✅ Successfully saved to local leads_database.csv");
        }

        // Simulate network delay for realism
        await new Promise((resolve) => setTimeout(resolve, 800));

        return NextResponse.json({ success: true, message: "Email sent successfully and data stored." });
    } catch (error) {
        console.error("Error processing contact form:", error);
        return NextResponse.json({ success: false, error: "Failed to submit contact form" }, { status: 500 });
    }
}
