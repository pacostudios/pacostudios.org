import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?\d{6,20}$/;

// Simple per-IP rate limit. In-memory, so it resets on redeploy and is per
// server instance, which is enough to stop casual form spam.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 1000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > RATE_LIMIT;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    // Honeypot: real users never see this field, bots fill it in.
    // Pretend it worked so the bot doesn't retry.
    if (body.website) {
      return NextResponse.json({ message: 'Email sent successfully!' });
    }

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const phone = typeof body.phone === 'string' ? body.phone.replace(/[\s-]/g, '') : '';
    const services = Array.isArray(body.services)
      ? body.services.filter((s) => typeof s === 'string' && s.length <= 50).slice(0, 10)
      : [];

    if (!email || !phone) {
      return NextResponse.json({ error: 'Phone number and email are required' }, { status: 400 });
    }
    if (name.length > 100) {
      return NextResponse.json({ error: 'Name is too long' }, { status: 400 });
    }
    if (email.length > 254 || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 });
    }
    if (!PHONE_RE.test(phone)) {
      return NextResponse.json({ error: 'Please enter a valid phone number' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_SERVER_USER,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: 'New Contact Form Submission!',
      text: `New contact form submission:

Name: ${name || 'Not provided'}
Email: ${email}
Phone: ${phone}
Services: ${services.join(', ') || 'Not specified'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #EB6E00; border-bottom: 2px solid #EB6E00; padding-bottom: 10px;">New Contact Form Submission</h2>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Name:</strong> ${escapeHtml(name || 'Not provided')}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
            <p><strong>Services:</strong> ${escapeHtml(services.join(', ') || 'Not specified')}</p>
          </div>
          <p style="color: #666; font-size: 12px;">This message was sent from the PACO Studios contact form.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
