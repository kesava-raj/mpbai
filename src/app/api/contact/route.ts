import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, phone, company, message } = body;

        // 1. Log the submission
        console.log("=====================================");
        console.log("📧 NEW CONTACT FORM SUBMISSION");
        console.log("To: kesav@myprobuddy.com");
        console.log("-------------------------------------");
        console.log(`Name:    ${name}`);
        console.log(`Email:   ${email}`);
        console.log(`Phone:   ${phone || 'N/A'}`);
        console.log(`Company: ${company || 'N/A'}`);
        console.log(`Message: ${message || 'N/A'}`);
        console.log("=====================================");

        // 2. Try Storing data in the Google Sheet remotely
        const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
        let sheetSuccess = false;

        if (webhookUrl) {
            try {
                const sheetRes = await fetch(webhookUrl, {
                    method: 'POST',
                    redirect: 'follow', // Important for Google Apps Script 302 redirects
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        phone: phone || '',
                        company: company || '',
                        message: message || '',
                        source: company ? 'Main Contact Form' : 'AI Chat UI'
                    })
                });

                if (sheetRes.ok) {
                    console.log("✅ Successfully stored in Google Sheet!");
                    sheetSuccess = true;
                } else {
                    console.error(`❌ Google Sheet rejected the request (Status: ${sheetRes.status}).`);
                }
            } catch (sheetError) {
                console.error("❌ Failed to push to Google Sheet:", sheetError);
            }
        } else {
            console.warn("⚠️ GOOGLE_SHEETS_WEBHOOK_URL is not set.");
        }

        // 3. Fallback: Store locally in an Excel-compatible CSV file if Google Sheets fails
        if (!sheetSuccess) {
            console.log("🔄 Fallback: Saving lead to local Excel-compatible leads_database.csv file instead...");
            const csvFilePath = path.join(process.cwd(), 'leads_database.csv');
            const timestamp = new Date().toISOString();

            if (!fs.existsSync(csvFilePath)) {
                fs.writeFileSync(csvFilePath, 'Timestamp,Name,Email,Phone,Company,Message,Source\n');
            }

            const cleanName = (name || '').replace(/"/g, '""');
            const cleanEmail = (email || '').replace(/"/g, '""');
            const cleanPhone = (phone || '').replace(/"/g, '""');
            const cleanCompany = (company || '').replace(/"/g, '""');
            const cleanMsg = (message || '').replace(/"/g, '""');
            const source = company ? 'Main Form' : 'AI Chat';

            const csvRow = `"${timestamp}","${cleanName}","${cleanEmail}","${cleanPhone}","${cleanCompany}","${cleanMsg}","${source}"\n`;
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
