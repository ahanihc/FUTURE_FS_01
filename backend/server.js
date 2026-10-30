
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Resend } from 'resend';

dotenv.config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors({
  origin: 'http://localhost:5173',
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Portfolio backend is running!');
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all fields.',
      });
    }

    if (
      name.length > 100 ||
      email.length > 254 ||
      message.length > 5000 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please enter valid details.',
      });
    }

    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: [process.env.TO_EMAIL],
      replyTo: email,
      subject: `Portfolio message from ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
    });

    if (error) {
      console.error('Resend error:', error);

      return res.status(502).json({
        success: false,
        message: 'Email could not be sent. Please try again.',
      });
    }

    console.log('Email sent:', data.id);

    res.json({
      success: true,
      message: 'Your message has been sent successfully!',
    });

  } catch (error) {
    console.error('Server error:', error);

    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again.',
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
