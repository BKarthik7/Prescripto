from flask import Flask, request, jsonify
from flask_cors import CORS
import uuid

app = Flask(__name__)
CORS(app)  # Allow all domains by default

# Mock database
patients = []
doctors = []

# Helper function to validate patient/doctor data
def validate_patient_data(data):
    required_fields = ['name', 'date_of_birth', 'contact_info']
    return all(field in data for field in required_fields)

def validate_doctor_data(data):
    required_fields = ['name', 'specialization', 'contact_info']
    return all(field in data for field in required_fields)

# Patient CRUD operations

@app.route('/patients', methods=['GET', 'POST'])
def manage_patients():
    if request.method == 'GET':
        return jsonify(patients)
    elif request.method == 'POST':
        data = request.get_json()
        if not validate_patient_data(data):
            return jsonify({"message": "Invalid patient data, missing required fields"}), 400
        data['_id'] = str(uuid.uuid4())  # Add a unique ID to the patient
        patients.append(data)
        return jsonify({"message": "Patient added successfully", "patient": data}), 201

@app.route('/patients/<string:patient_id>', methods=['GET', 'PUT', 'DELETE'])
def patient_detail(patient_id):
    patient = next((p for p in patients if p['_id'] == patient_id), None)
    if patient is None:
        return jsonify({"message": "Patient not found"}), 404
    if request.method == 'GET':
        return jsonify(patient)
    elif request.method == 'PUT':
        data = request.get_json()
        if not validate_patient_data(data):
            return jsonify({"message": "Invalid patient data"}), 400
        patient.update(data)
        return jsonify({"message": "Patient updated successfully", "patient": patient})
    elif request.method == 'DELETE':
        patients.remove(patient)
        return jsonify({"message": "Patient deleted successfully"})

# Doctor CRUD operations

@app.route('/doctors', methods=['GET', 'POST'])
def manage_doctors():
    if request.method == 'GET':
        return jsonify(doctors)
    elif request.method == 'POST':
        data = request.get_json()
        if not validate_doctor_data(data):
            return jsonify({"message": "Invalid doctor data, missing required fields"}), 400
        data['_id'] = str(uuid.uuid4())  # Add a unique ID to the doctor
        doctors.append(data)
        return jsonify({"message": "Doctor added successfully", "doctor": data}), 201

@app.route('/doctors/<string:doctor_id>', methods=['GET', 'PUT', 'DELETE'])
def doctor_detail(doctor_id):
    doctor = next((d for d in doctors if d['_id'] == doctor_id), None)
    if doctor is None:
        return jsonify({"message": "Doctor not found"}), 404
    if request.method == 'GET':
        return jsonify(doctor)
    elif request.method == 'PUT':
        data = request.get_json()
        if not validate_doctor_data(data):
            return jsonify({"message": "Invalid doctor data"}), 400
        doctor.update(data)
        return jsonify({"message": "Doctor updated successfully", "doctor": doctor})
    elif request.method == 'DELETE':
        doctors.remove(doctor)
        return jsonify({"message": "Doctor deleted successfully"})

# Start the Flask app
if __name__ == '__main__':
    app.run(debug=True)
