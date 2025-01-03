from flask import Flask, request, jsonify
from app.models import db, Customer, Order, OrderItem

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost/palace_of_goods'
db.init_app(app)

@app.route('/customers', methods=['GET'])
def get_customers():
    customers = Customer.query.all()
    return jsonify([c.as_dict() for c in customers])

@app.route('/orders', methods=['POST'])
def create_order():
    data = request.get_json()
    new_order = Order(
        customer_id=data['customer_id'],
        total_amount=data['total_amount'],
        payment_method=data['payment_method'],
        shipping_address=data['shipping_address']
    )
    db.session.add(new_order)
    db.session.commit()
    return jsonify(new_order.as_dict())