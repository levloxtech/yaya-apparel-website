import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import axios from 'axios'
import { Resend } from 'resend'

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Root route (IMPORTANT for testing)
app.get("/", (req, res) => {
  res.send("YAYA Backend Running 🚀")
})

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY)

// ─────────────────────────────────────────
// YAYA KNOWLEDGE BASE
// ─────────────────────────────────────────

const yayaApparelKnowledge = `
You are a luxury fashion consultant for YAYA Apparel.

Always:
- Recommend specific outfit types
- Suggest colors and styling tips
- Ask follow-up questions
- Sound stylish and premium
`

// ─────────────────────────────────────────
// GROQ API
// ─────────────────────────────────────────

async function getGroqResponse(userMessage) {
    try {
        const apiKey = process.env.GROQ_API_KEY

        const response = await axios.post(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                model: 'llama-3.1-8b-instant',
                messages: [
                    { role: 'system', content: yayaApparelKnowledge },
                    { role: 'user', content: userMessage },
                ],
                temperature: 0.7,
                max_tokens: 300,
            },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
            }
        )

        return response.data.choices[0].message.content

    } catch (error) {
        console.error('FULL GROQ ERROR:', error.response?.data || error.message)

        return "Hey 👗 I’d love to help you pick the perfect outfit! Tell me the occasion and your preferred style."
    }
}

// ─────────────────────────────────────────
// EMAIL FUNCTION (FIXED PRO)
// ─────────────────────────────────────────

async function sendEmailWithResend(name, email, phone, message) {
    try {
        if (!process.env.RESEND_API_KEY) {
            console.error("❌ RESEND_API_KEY missing")
            return false
        }

        const response = await resend.emails.send({
            from: 'YAYA Apparel <onboarding@resend.dev>', // change later to your domain
            to: ['yayaapparel05@gmail.com'],
            subject: `New Contact from ${name}`,
            reply_to: email,
            html: `
<h2>New Contact Inquiry</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
<p><strong>Message:</strong><br/>${message}</p>
<p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
`
        })

        console.log("✅ EMAIL RESPONSE:", response)

        // STRICT CHECK
        if (!response || response.error || !response.id) {
            console.error("❌ Email not sent properly")
            return false
        }

        return true

    } catch (error) {
        console.error("❌ EMAIL FAILED:", error)
        return false
    }
}

// ─────────────────────────────────────────
// ROUTES
// ─────────────────────────────────────────

// Health
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK' })
})

// Chat
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body

        if (!message) {
            return res.json({
                success: true,
                reply: "Tell me what you're looking for 👗"
            })
        }

        const userMsg = message.toLowerCase()

        const fashionKeywords = [
            'dress','wear','outfit','clothes','style','look','fashion',
            'wedding','party','function','casual','formal','office',
            'traditional','modern','kurta','lehenga','saree','jeans',
            'top','shirt','pant','skirt','color','fabric'
        ]

        const isFashion = fashionKeywords.some(word =>
            userMsg.includes(word)
        )

        if (!isFashion) {
            return res.json({
                success: true,
                reply: "I'm your YAYA fashion expert 👗 Ask me about outfits, styles, or occasions."
            })
        }

        const reply = await getGroqResponse(message)

        res.json({
            success: true,
            reply: reply || "Try asking about wedding, party, or casual outfits 👗"
        })

    } catch (error) {
        console.error('Chat Error:', error)

        res.json({
            success: true,
            reply: "Tell me your occasion 👗 I'll help you style it."
        })
    }
})

// Contact
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, phone, message } = req.body

        if (!name || !email || !message) {
            return res.json({
                success: false,
                message: 'Missing required fields'
            })
        }

        const sent = await sendEmailWithResend(name, email, phone, message)

        if (!sent) {
            return res.json({
                success: false,
                message: 'Email failed to send'
            })
        }

        res.json({
            success: true,
            message: 'Email sent successfully'
        })

    } catch (error) {
        console.error('Contact Error:', error)

        res.json({
            success: false,
            message: 'Email service error'
        })
    }
})

// ─────────────────────────────────────────
// START SERVER
// ─────────────────────────────────────────

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
})