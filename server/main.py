from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"], supports_credentials=True)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(50), nullable=False)
    lastname = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(50), nullable=False)

@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    existing_user = User.query.filter_by(email=data['email']).first()
    if not existing_user:
        new_user = User(firstname=data['firstname'],
                        lastname=data['lastname'],
                        email=data['email'],
                        password=data['password'])
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'id': new_user.id, 'message': 'User created successfully'}), 201
    else:
        return jsonify({'message': 'User with that email already exists'}), 404

@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    user_list = []
    for user in users:
        user_data = {'id': user.id, 'firstname': user.firstname, 'lastname': user.lastname, 'email': user.email, 'password': user.password}
        user_list.append(user_data)
    return jsonify(user_list)

@app.route('/users/<string:email>', methods=['GET'])
def get_user(email):
    user = User.query.filter_by(email=email).first()
    if user: return jsonify({'id': user.id, 'message': 'User found'}), 200
    else: return jsonify({'message': 'User with this email does not found'}), 404

@app.route('/users/<string:email>', methods=['REMOVE'])
def remove_user(email):
    user = User.query.filter_by(email=email).first()
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': 'User removed'}), 200
    else: return jsonify({'message': 'User with this email does not found'}), 404

@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    if user_id == 1: return jsonify({'message': 'You cannot remove Test User'}), 404
    user = User.query.get(user_id)
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': f'User with ID {user_id} deleted successfully'}), 200
    else: return jsonify({'message': f'User with ID {user_id} not found'}), 404

@app.route('/login', methods=["POST"])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user:
        return jsonify({
            'id': user.id,
            'firstname': user.firstname,
            'lastname': user.lastname,
            'email': user.email
        }), 200
    else:
        return jsonify({'message': 'Login failed. Invalid credentials.'}), 401

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        if not User.query.filter_by(email='student@agh.edu.pl').first():
            hashed_password = bcrypt.generate_password_hash('student').decode('utf-8')
            new_test_user = User(firstname='Test', lastname='User', email='student@agh.edu.pl', password=hashed_password, id=0)
            db.session.add(new_test_user)
            db.session.commit()
    app.run(debug=True)
