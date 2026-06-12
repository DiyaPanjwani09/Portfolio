import httpx
from config import settings

async def send_contact_email(name: str, email: str, message: str) -> bool:
    if not settings.RESEND_API_KEY:
        print("WARNING: RESEND_API_KEY is not set. Email not sent.")
        return False
        
    url = "https://api.resend.com/emails"
    headers = {
        "Authorization": f"Bearer {settings.RESEND_API_KEY}",
        "Content-Type": "application/json"
    }
    
    # Standard Resend sandboxes require sending from onboarding@resend.dev
    payload = {
        "from": "Portfolio Contact <onboarding@resend.dev>",
        "to": [settings.CONTACT_TO_EMAIL],
        "subject": f"📋 New Portfolio Message from {name}",
        "html": f"""
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="background: #f4f4f4; padding: 10px; border-left: 4px solid #ccc;">
            {message.replace(chr(10), '<br>')}
        </blockquote>
        <hr>
        <p>Sent from Diya Panjwani's Portfolio Site</p>
        """
    }
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(url, json=payload, headers=headers, timeout=10.0)
            if response.status_code in (200, 201):
                return True
            else:
                print(f"Resend API error: {response.status_code} - {response.text}")
                return False
    except Exception as e:
        print(f"Exception while sending email: {str(e)}")
        return False
