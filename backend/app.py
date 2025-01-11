from flask import Flask, request, jsonify
import os
import google.generativeai as genai
import json
from dotenv import load_dotenv
import logging

# Load environment variables
load_dotenv()

# Set up logging
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)

# Configure API key for Google Generative AI
api_key = os.getenv('API_KEY')
if not api_key:
    logging.error("API key not found!")
    raise EnvironmentError("API key not found in environment variables.")

# Configure Generative AI with the API key
genai.configure(api_key=api_key)

# Initialize the model
model = genai.GenerativeModel("gemini-1.5-flash")


@app.route('/generate-notes', methods=['POST'])
def generate_notes():
    """
    Endpoint to generate simplified notes for a given topic.
    Request should include a JSON body with the 'topic' key.
    """
    try:
        data = request.json
        topic = data.get('topic')

        if not topic:
            logging.warning("Topic is missing in the request body.")
            return jsonify({"error": "Topic is required"}), 400

        prompt = f"I am a teacher in a school who teaches students with Dyslexia, ADHD, and other learning disabilities. I am teaching computer programming for them. So avoid long blocks of text as they cannot capture it altogether. Make it into different modules, so that one module could fit into one slide. Generate in the form of a story so that they can understand well. Please generate notes accordingly on the topic: {topic}. Focus on key points and make it easy to understand."

        response = model.generate_content(prompt)  # Use the 'generate_content' method
        logging.debug(f"Response from model: {response.text}")
        return jsonify({"notes": response.text})
    
    except Exception as e:
        logging.error(f"Error generating notes: {e}")
        return jsonify({"error": f"An error occurred: {e}"}), 500


@app.route('/generate-quiz', methods=['POST'])
def generate_quiz():
    """
    Endpoint to generate a quiz based on the given topic.
    Request should include a JSON body with the 'topic' key.
    """
    try:
        data = request.json
        topic = data.get('topic')

        if not topic:
            logging.warning("Topic is missing in the request body.")
            return jsonify({"error": "Topic is required"}), 400

        quiz_prompt = f"Create a short multiple-choice quiz about the topic: {topic}. Provide 3-4 questions. Give 4 possible answers per question and specify the correct answer for each question. Give output in JSON format."

        response = model.generate_content(quiz_prompt)  # Use the 'generate_content' method
        
        logging.debug(f"Response from model: {response.text}")
        
        if not response.text:
            logging.error("Received an empty response from the model.")
            return jsonify({"error": "Empty response from model"}), 500

        # Attempt to decode the response as JSON
        try:
            quiz_data = json.loads(response.text.strip())  # Ensure no extra spaces or hidden characters
            logging.debug(f"Decoded quiz data: {quiz_data}")  # Log the decoded quiz data
            return jsonify({"quiz": quiz_data})
        except json.JSONDecodeError as json_error:
            logging.error(f"Error decoding JSON: {json_error}")
            logging.error(f"Raw response: {response.text}")
            return jsonify({"error": "Failed to decode quiz JSON"}), 500
        
    except Exception as e:
        logging.error(f"Error generating quiz: {e}")
        return jsonify({"error": f"An error occurred: {e}"}), 500


if __name__ == "__main__":
    try:
        app.run(debug=True, host='0.0.0.0', port=5000)
    except Exception as e:
        logging.error(f"Error starting the Flask application: {e}")
