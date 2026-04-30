from langchain.tools import tool
from langchain.agents import initialize_agent, AgentType
from langchain_openai import ChatOpenAI
import joblib, pandas as pd

model = joblib.load('models/best_travel_model.joblib')
llm = ChatOpenAI(model='gpt-4o-mini', temperature=0)

@tool
def classify_destination(destination:str)->str:
    """Classify a destination into travel style."""
    sample = pd.DataFrame([{
        'destination': destination,
        'avg_temp': 26,
        'hotel_price': 150,
        'unesco_sites': 2,
        'beach': 0,
        'hiking_score': 5,
        'museum_score': 3,
        'kid_friendly': 1,
        'luxury_hotels': 0,
    }])
    pred = model.predict(sample)[0]
    return f'{destination} style: {pred}'

@tool
def weather_lookup(city:str)->str:
    """Return simplified live weather placeholder."""
    return f'{city}: Warm, 27C, clear skies.'

@tool
def budget_match(amount:str)->str:
    """Suggest budget tier from amount in USD."""
    val=int(''.join(ch for ch in amount if ch.isdigit()) or 0)
    if val < 1000:
        return 'Budget traveler profile.'
    elif val < 2500:
        return 'Mid-range traveler profile.'
    return 'Luxury traveler profile.'

tools=[classify_destination, weather_lookup, budget_match]
agent = initialize_agent(tools,llm,agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,verbose=True)

if __name__ == '__main__':
    q='I have two weeks in July and $1500. Warm place, hiking, not touristy.'
    print(agent.run(q))