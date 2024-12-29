from flask import Flask, request, jsonify
from services.recommendation import generate_recommendations

app = Flask(__name__)

@app.route('/recommendations', methods=['POST'])
def recommendations():
    data = request.json
    user_id = data.get('user_id')
    recommendations = generate_recommendations(user_id)
    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
