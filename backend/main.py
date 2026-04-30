from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from agent.langchain_agent import agent

app = FastAPI(title='Smart Travel Planner API')
app.add_middleware(CORSMiddleware, allow_origins=['*'], allow_credentials=True, allow_methods=['*'], allow_headers=['*'])

class Query(BaseModel):
    message:str

@app.get('/')
async def root():
    return {'status':'ok'}

@app.post('/chat')
async def chat(q: Query):
    response = agent.run(q.message)
    return {'reply': response}