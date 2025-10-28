import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ message: "Email is required." }, { status: 400 });
        }

        // Optional: save to your database (Strapi, Supabase, etc.)
        // await saveEmailToDatabase(email);

        // Add contact to Resend Audience (newsletter list)
        await resend.contacts.create({
            email,
            audienceId: process.env.RESEND_AUDIENCE_ID!,
        });

        // Optional: send welcome email
        await resend.emails.send({
            from: "The Stat Diary <onboarding@resend.dev>",
            to: email,
            subject: "Welcome to The Stat Diary 🎉",
            html: `
        <h2>Hey there!</h2>
        <p>Thanks for subscribing to <b>The Stat Diary</b>.</p>
        <p>We'll share new posts, tutorials, and cool stats insights soon!</p>
        <p>— Nahid</p>
      `,
        });

        return NextResponse.json({ message: "Thanks for subscribing!" });
    } catch (error) {
        console.error(error);

        let message = "Something went wrong.";
        if (error instanceof Error) {
            message = error.message;
        }

        return NextResponse.json({ message }, { status: 500 });
    }
}