import asyncio

from gather_client_ws import GatherClient
API_KEY=""
SPACE_ID=""

async def callback(client, server_response):
    for event in server_response.events:
        print(event.WhichOneof("event"))

async def producer(client):
    await asyncio.sleep(30)  # hold the connection for 30 seconds

async def main():
    client = GatherClient(api_key=API_KEY, space_id=SPACE_ID, callback=callback)
    await client.run(producer)


asyncio.run(main())
