from fastapi import FastAPI, HTTPException
from redis import Redis
from huey import RedisHuey

# Initialize FastAPI app
app = FastAPI()

# Initialize Redis connection and Huey instance
redis_conn = Redis(host='redis', port=6379)
huey = RedisHuey(connection=redis_conn)

# Task to asynchronously set a key-value pair in Redis
@huey.task()
def set_key_value(key: str, value: str):
    redis_conn.set(key, value)

# FastAPI endpoint to set key-value pair
@app.post("/set/")
async def set_key(key: str, value: str):
    set_key_value(key, value)
    return {"message": "Request received, processing in background"}

# FastAPI endpoint to get value by key
@app.get("/get/{key}")
async def get_key(key: str):
    value = redis_conn.get(key)
    if value:
        return {"key": key, "value": value.decode("utf-8")}
    raise HTTPException(status_code=404, detail="Key not found")
