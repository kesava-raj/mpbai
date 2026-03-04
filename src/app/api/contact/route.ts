import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        // Extract all possible fields
        const {
            name, email, phone, company, message,
            industry, projectType, timeline, painPoints, projectScope,
            source: customSource
        } = body;

        // 1. Log the submission
        console.log("=====================================");
        console.log("📧 NEW CONTACT FORM SUBMISSION");
        console.log("-------------------------------------");
        console.log(`Name:    ${name}`);
        console.log(`Email:   ${email}`);
        console.log(`Phone:   ${phone || 'N/A'}`);
        console.log(`Company: ${company || 'N/A'}`);
        console.log(`Source:  ${customSource || (company ? 'Main Form' : 'AI Chat')}`);
        console.log("=====================================");

        // 2. Try Storing data in the Google Sheet remotely
        const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
        let sheetSuccess = false;

        if (webhookUrl) {
            try {
                const payload = {
                    timestamp: new Date().toISOString(),
                    name: name || '',
                    email: email || '',
                    phone: phone || '',
                    company: company || '',
                    industry: industry || '',
                    projectType: projectType || '',
                    timeline: timeline || '',
                    painPoints: painPoints || '',
                    projectScope: projectScope || '',
                    message: message || '',
                    source: customSource || (company ? 'Main Contact Form' : 'AI Chat UI')
                };

                const sheetRes = await fetch(webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                // Google Apps Script usually returns 200 even if it fails internally, 
                // but fetch might follow redirects resulting in success.
                if (sheetRes.ok) {
                    console.log("✅ Successfully stored in Google Sheet!");
                    sheetSuccess = true;
                } else {
                    const errorText = await sheetRes.text();
                    console.error(`❌ Google Sheet rejected (Status: ${sheetRes.status}):`, errorText);
                }
            } catch (sheetError) {
                console.error("❌ Failed to push to Google Sheet:", sheetError);
            }
        } else {
            console.error("❌ CRITICAL: GOOGLE_SHEETS_WEBHOOK_URL environment variable is missing!");
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
