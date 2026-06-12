import shutil
import os

src_img = r"C:\Users\ayush\.gemini\antigravity\brain\94eac4c8-eee6-420b-abb7-808650ba1ba9\.tempmediaStorage\media_94eac4c8-eee6-420b-abb7-808650ba1ba9_1781258608890.png"
src_resume = r"C:\Users\ayush\.gemini\antigravity\brain\94eac4c8-eee6-420b-abb7-808650ba1ba9\.tempmediaStorage\media_94eac4c8-eee6-420b-abb7-808650ba1ba9_1781258614082.png"

dest_dir = r"E:\portfolio\frontend\public"
os.makedirs(dest_dir, exist_ok=True)

if os.path.exists(src_img):
    shutil.copy(src_img, os.path.join(dest_dir, "diya_photo.png"))
    print("Copied photo successfully!")
else:
    print("Photo source not found.")

if os.path.exists(src_resume):
    shutil.copy(src_resume, os.path.join(dest_dir, "diya_resume_preview.png"))
    print("Copied resume preview successfully!")
else:
    print("Resume preview source not found.")
