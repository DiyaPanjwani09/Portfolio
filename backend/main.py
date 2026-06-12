import io
from fastapi import FastAPI, Depends, HTTPException, Header, UploadFile, File, Response, status
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional

from config import settings
from models import MessageCreate, AdminLogin, StatUpdate
from database import (
    save_message,
    get_all_messages,
    delete_message,
    save_resume,
    get_resume,
    increment_stat,
    get_stat
)
from email_service import send_contact_email

app = FastAPI(
    title="Diya Panjwani Portfolio Backend",
    description="FastAPI + MongoDB backend for Diya's skeuomorphic portfolio website",
    version="1.0.0"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify actual domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to verify Admin Token
def verify_admin_token(authorization: Optional[str] = Header(None)) -> bool:
    if not authorization:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization header missing"
        )
    # Check Bearer format or raw format
    token = authorization.replace("Bearer ", "").strip()
    if token != settings.ADMIN_TOKEN:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Admin Token"
        )
    return True

@app.get("/")
async def root():
    return {
        "message": "Diya Panjwani's Portfolio API is online!",
        "version": "1.0.1",
        "db_timeout_configured": True
    }

@app.get("/api/admin/db-check")
async def db_check():
    import re
    from motor.motor_asyncio import AsyncIOMotorClient
    uri = settings.MONGODB_URI
    masked_uri = re.sub(r":([^@/]+)@", ":****@", uri)
    try:
        client = AsyncIOMotorClient(uri, serverSelectionTimeoutMS=3000)
        db_name = uri.split("/")[-1].split("?")[0] or "diya_portfolio"
        db = client[db_name]
        ping_res = await db.command("ping")
        collections = await db.list_collection_names()
        return {
            "status": "success",
            "db_name": db_name,
            "ping": ping_res,
            "collections": collections,
            "uri_configured": masked_uri
        }
    except Exception as e:
        import traceback
        return {
            "status": "error",
            "message": str(e),
            "traceback": traceback.format_exc(),
            "uri_configured": masked_uri
        }

# --- Stats Endpoints ---
@app.get("/api/stats/{key}")
async def get_stat_value(key: str):
    if key not in ("views", "stars"):
        raise HTTPException(status_code=400, detail="Invalid stat key")
    val = await get_stat(key)
    return {key: val}

@app.post("/api/stats/{key}")
async def increment_stat_value(key: str):
    if key not in ("views", "stars"):
        raise HTTPException(status_code=400, detail="Invalid stat key")
    val = await increment_stat(key)
    return {key: val}

# --- Contact Endpoint ---
@app.post("/api/contact")
async def contact_submit(msg: MessageCreate):
    # Save message in MongoDB
    saved = await save_message(msg.name, msg.email, msg.message)
    
    # Try sending email notification via Resend
    email_sent = await send_contact_email(msg.name, msg.email, msg.message)
    
    return {
        "status": "success",
        "message": "Your inquiry was received successfully!",
        "id": saved["_id"],
        "email_notified": email_sent
    }



# --- Resume Download Endpoint ---
@app.get("/api/resume/download")
async def download_resume_pdf():
    resume = await get_resume()
    if not resume:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resume PDF not found or has not been uploaded by admin."
        )
    
    return Response(
        content=resume["bytes"],
        media_type="application/pdf",
        headers={
            "Content-Disposition": f"inline; filename={resume['filename']}"
        }
    )

@app.get("/api/resume/info")
async def get_resume_info():
    resume = await get_resume()
    if resume:
        return {
            "uploaded": True,
            "filename": resume["filename"],
            "uploaded_at": resume["uploaded_at"].isoformat() if "uploaded_at" in resume else None
        }
    return {"uploaded": False}

# --- Admin Endpoints ---
@app.post("/api/admin/login")
async def admin_login(payload: AdminLogin):
    if payload.token == settings.ADMIN_TOKEN:
        return {"status": "success", "token": settings.ADMIN_TOKEN}
    raise HTTPException(status_code=400, detail="Incorrect admin token")

@app.get("/api/admin/messages")
async def get_admin_messages(admin_valid: bool = Depends(verify_admin_token)):
    messages = await get_all_messages()
    return messages

@app.delete("/api/admin/messages/{msg_id}")
async def delete_admin_message(msg_id: str, admin_valid: bool = Depends(verify_admin_token)):
    deleted = await delete_message(msg_id)
    if deleted:
        return {"status": "success", "message": "Message deleted."}
    raise HTTPException(status_code=404, detail="Message not found")

@app.post("/api/admin/resume")
async def upload_admin_resume(
    file: UploadFile = File(...),
    admin_valid: bool = Depends(verify_admin_token)
):
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Invalid file format. Only PDF files are allowed."
        )
        
    file_bytes = await file.read()
    success = await save_resume(file.filename, file.content_type, file_bytes)
    
    if success:
        return {
            "status": "success",
            "message": f"Resume '{file.filename}' uploaded successfully to MongoDB."
        }
    raise HTTPException(status_code=500, detail="Failed to save resume to database")
