from flask import Flask, request, jsonify
from flask_cors import CORS
import openai

app = Flask(__name__)
CORS(app)

import os
openai.api_key = os.getenv("OPENAI_API_KEY")
# 🔐 Replace with your real API key

@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        print("🔥 Incoming POST to /chat")
        print("🧠 Received data:", data)

        message = data.get("message", "")
        topic = data.get("topic", "")
        grade = data.get("grade", "")

        system_prompt = f"""
        You are MathBuddy, a friendly and patient AI study coach for middle school students.
        The student is in grade {grade}, studying {topic}.
        Be encouraging, explain with simple words and fun examples, and end with: 'Want to try one yourself?' or 'Does that make sense?'
        """

        response = openai.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": message}
            ]
        )

        reply = response.choices[0].message.content.strip()
        print("✅ Reply:", reply)
        return jsonify({"reply": reply})

    except Exception as e:
        print("❌ ERROR:", e)
        return jsonify({"reply": f"⚠️ Error: {str(e)}"}), 500
import os

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)