from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
# import google.generativeai as genai  # commented out for now
# from dotenv import load_dotenv  # commented out for now
# import os  # commented out for now

# load_dotenv()  # commented out for now
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class BusinessInfo(BaseModel):
    businessInfo: str

@app.post("/api/analyze-business")
async def analyze_business(data: BusinessInfo):
    try:
        # Simple echo response
        
        return {"message": f"{data.businessInfo.upper} hair balls"}
        
        # Original Gemini code commented out
        # prompt = f"""
        # Analyze this business information and break it down into key components:
        # {data.businessInfo}
        
        # Format the response as a JSON with these keys:
        # - industry
        # - products
        # - revenue_model
        # - goals
        # """
        
        # response = model.generate_content(prompt)
        # return {"analysis": response.text}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 