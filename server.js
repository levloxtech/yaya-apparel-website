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

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY)

// ─────────────────────────────────────────
// YAYA KNOWLEDGE BASE (UNCHANGED)
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
                model: 'llama-3.1-8b-instant', // ✅ CURRENT WORKING MODEL
                messages: [
                    {
                        role: 'system',
                        content: yayaApparelKnowledge,
                    },
                    {
                        role: 'user',
                        content: userMessage,
                    },
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

        // ✅ fallback so frontend NEVER breaks
        return "Hey 👗 I’d love to help you pick the perfect outfit! Could you tell me the occasion and your preferred style?"
    }
}

// ─────────────────────────────────────────
// EMAIL FUNCTION (FIXED)
// ─────────────────────────────────────────

async function sendEmailWithResend(name, email, phone, message) {
    try {
        const response = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: ['yayaapparel05@gmail.com'],
            subject: `New Contact from ${name}`,
            html: `
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4; padding:20px; font-family: Arial, sans-serif;">
  <tr>
    <td align="center">
      
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; overflow:hidden;">
        
        <!-- Header -->
        <tr>
          <td style="background:#6b21a8; padding:20px; text-align:center;">
            <h2 style="color:#ffffff; margin:0;">YAYA Apparel</h2>
            <p style="color:#e9d5ff; margin:5px 0 0;">New Contact Inquiry</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:20px; color:#333;">
            
            <p style="font-size:14px;">You have received a new message from your website:</p>

            <table width="100%" cellpadding="8" cellspacing="0" style="margin-top:10px;">
              
              <tr>
                <td style="font-weight:bold;">Name:</td>
                <td>${name}</td>
              </tr>

              <tr>
                <td style="font-weight:bold;">Email:</td>
                <td>
                  <a href="mailto:${email}" style="color:#6b21a8;">${email}</a>
                </td>
              </tr>

              <tr>
                <td style="font-weight:bold;">Phone:</td>
                <td>
                  <a href="tel:${phone}" style="color:#6b21a8;">
                    ${phone || 'Not provided'}
                  </a>
                </td>
              </tr>

              <tr>
                <td style="font-weight:bold;">Message:</td>
                <td style="background:#fafafa; border-radius:6px;">
                  ${message}
                </td>
              </tr>

              <tr>
                <td style="font-weight:bold;">Time:</td>
                <td>${new Date().toLocaleString()}</td>
              </tr>

            </table>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9fafb; text-align:center; padding:15px; font-size:12px; color:#888;">
            YAYA Apparel • Premium Fashion Brand
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>
`,
        })

        console.log("EMAIL RESPONSE:", response)

        // ✅ IMPORTANT check
        if (!response || response.error) {
            return false
        }

        return true

    } catch (error) {
        console.error("EMAIL FAILED:", error)
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

        // ✅ improved detection (more natural)
        const fashionKeywords = [
            'dress', 'wear', 'outfit', 'clothes', 'style', 'look', 'fashion',
            'wedding', 'party', 'function', 'casual', 'formal', 'office',
            'traditional', 'modern', 'kurta', 'lehenga', 'saree', 'jeans',
            'top', 'shirt', 'pant', 'skirt', 'color', 'fabric', 'collection'
        ]

        const isFashion = fashionKeywords.some(word =>
            userMsg.includes(word)
        )

        // ✅ if not fashion → guide user
        if (!isFashion) {
            return res.json({
                success: true,
                reply: "I'm your YAYA fashion expert 👗 Ask me things like 'outfit for wedding', 'modern dress ideas', or 'casual wear suggestions'."
            })
        }

        // ✅ get AI response safely
        const reply = await getGroqResponse(message)

        // ✅ fallback if AI fails or returns empty
        if (!reply) {
            return res.json({
                success: true,
                reply: "For your occasion 👗 I recommend something elegant like a co-ord set or a kurta set. What style do you prefer — modern or traditional?"
            })
        }

        res.json({
            success: true,
            reply
        })

    } catch (error) {
        console.error('Chat Error:', error)

        // ✅ NEVER send 500 to frontend
        res.json({
            success: true,
            reply: "I'm here to help you find the perfect outfit 👗 Tell me the occasion and style you prefer!"
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

        const result = await sendEmailWithResend(name, email, phone, message)

        // ✅ check if email really sent
        if (!result) {
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
        console.error('Contact Error FULL:', error)

        // ✅ NEVER crash frontend
        res.json({
            success: false,
            message: 'Email service is not working right now'
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