import base64
from datetime import datetime, timezone
# pyrefly: ignore [missing-import]
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from config import settings

client = None
db = None

def get_db():
    global client, db
    if db is None:
        client = AsyncIOMotorClient(settings.MONGODB_URI)
        # Extract DB name from URI or default
        db_name = settings.MONGODB_URI.split("/")[-1].split("?")[0] or "diya_portfolio"
        db = client[db_name]
    return db

async def save_message(name: str, email: str, message: str) -> dict:
    database = get_db()
    msg_doc = {
        "name": name,
        "email": email,
        "message": message,
        "created_at": datetime.now(timezone.utc)
    }
    result = await database.messages.insert_one(msg_doc)
    msg_doc["_id"] = str(result.inserted_id)
    msg_doc["created_at"] = msg_doc["created_at"].isoformat()
    return msg_doc

async def get_all_messages() -> list:
    database = get_db()
    cursor = database.messages.find().sort("created_at", -1)
    messages = []
    async for doc in cursor:
        doc["_id"] = str(doc["_id"])
        if isinstance(doc.get("created_at"), datetime):
            doc["created_at"] = doc["created_at"].isoformat()
        messages.append(doc)
    return messages

async def delete_message(message_id: str) -> bool:
    database = get_db()
    result = await database.messages.delete_one({"_id": ObjectId(message_id)})
    return result.deleted_count > 0

async def save_resume(filename: str, content_type: str, file_bytes: bytes) -> bool:
    database = get_db()
    # Base64 encode the bytes to store as a clean string in MongoDB
    encoded_data = base64.b64encode(file_bytes).decode('utf-8')
    
    # We only keep one active resume in the DB
    await database.resume.delete_many({})
    
    resume_doc = {
        "filename": filename,
        "content_type": content_type,
        "data": encoded_data,
        "uploaded_at": datetime.now(timezone.utc)
    }
    result = await database.resume.insert_one(resume_doc)
    return bool(result.inserted_id)

async def get_resume() -> dict:
    database = get_db()
    doc = await database.resume.find_one()
    if doc:
        doc["_id"] = str(doc["_id"])
        # Decode base64 back to bytes
        doc["bytes"] = base64.b64decode(doc["data"])
        return doc
    return None

async def increment_stat(key: str) -> int:
    database = get_db()
    result = await database.visitor_stats.find_one_and_update(
        {"key": key},
        {"$inc": {"value": 1}},
        upsert=True,
        return_document=True
    )
    return result["value"] if result else 1

async def get_stat(key: str) -> int:
    database = get_db()
    doc = await database.visitor_stats.find_one({"key": key})
    if doc:
        return doc.get("value", 0)
    # Initialize if doesn't exist
    await database.visitor_stats.insert_one({"key": key, "value": 0})
    return 0
