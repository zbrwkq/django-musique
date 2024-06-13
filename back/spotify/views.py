import json
import http.client

def get_token():
        conn = http.client.HTTPSConnection("accounts.spotify.com")

        payload = f"grant_type=client_credentials&client_id=762f28b0706a46b492b3557cefdb340f&client_secret=ba1dac5e68cb48dcac9b4e129399d932"

        headers = {
            'Content-Type': "application/x-www-form-urlencoded",
        }

        conn.request("POST", "/api/token", payload, headers)

        res = conn.getresponse()
        data = res.read()

        response_data = json.loads(data)

        token = response_data.get('access_token')

        return token
