from flask import Flask, request, jsonify
from demo_pi_sdk import Pi

# Initialize Flask app
app = Flask(__name__)
app.config.from_object("config.Config")

# Initialize Pi SDK
pi = Pi(api_key=app.config["PI_API_KEY"], environment=app.config["PI_ENVIRONMENT"])

@app.route("/payment", methods=["POST"])
def create_payment():
    try:
        # Parse request
        data = request.json
        user_uid = data["uid"]
        amount = data["amount"]

        # Create a payment
        payment = pi.create_payment(user_uid=user_uid, amount=amount)
        return jsonify({"success": True, "payment": payment})

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 400

@app.route("/payment/verify", methods=["POST"])
def verify_payment():
    try:
        # Parse request
        data = request.json
        payment_id = data["payment_id"]

        # Verify the payment
        verification = pi.verify_payment(payment_id)
        return jsonify({"success": True, "verification": verification})

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)