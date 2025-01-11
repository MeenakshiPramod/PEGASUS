import os
import google.generativeai as genai
from flask import Flask, request, jsonify
from dotenv import load_dotenv
import json
from flask_cors import CORS  # Import flask-cors

load_dotenv()
genai.configure(api_key=os.getenv("API_KEY"))

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

def generate_simplified_notes(topic):
    """
    Generates simplified notes for a given topic using the Gemini API.

    Args:
      topic: The topic for which to generate notes.

    Returns:
      The generated text, or None if an error occurs.
    """
    prompt = f"I am a teacher in a school who teaches students with Dyslexia, adhd, and other learning disabilities. I am teaching computer programming for them. So avoid long block of text as they cannot capture it altogether. Make it into different modules, so that one module could fit into one slide. Generate in the form of a story so that they can understand well.Please generate notes accordingly on the topic: {topic}. Focus on key points and make it easy to understand."

    try:
        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"An error occurred during notes generation: {e}")
        return None


def generate_quiz(topic):
    """
    Generates a quiz based on the given topic using the Gemini API.

    Args:
      topic: The topic for which to generate the quiz.

    Returns:
      The generated quiz as a list of dictionaries, or None if an error occurs.
        Each dictionary represents a question and has these keys:
        - 'question': (str) the question text
        - 'options': (list) the list of options/answers
        - 'correct_answer': (str) the correct answer among the options
    """
    quiz_prompt = f"Create a short multiple-choice quiz about the topic for a student with dsylexia or learning disability: {topic}. Provide 3-4 questions. Give 4 possible answers per question.Keep in mind the student has learning disorder. Return the output as a JSON list of dictionaries. Each dictionary should contain the 'question', 'options' (as a list), and 'correct_answer' keys. Only provide the output in JSON format without any additional text or explanation."
    
    try:
        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content(quiz_prompt)
        json_text = response.text.replace("json", "").replace("", "")
        try:
            quiz_data = json.loads(json_text)
        except json.JSONDecodeError as e:
            print(f"Error decoding JSON: {e}")
            print(f"Raw response: {response.text}")  # print the raw response for debug
            return None

        if not isinstance(quiz_data, list):
             print(f"Error quiz data format: output should be a list")
             return None

        # process the quiz data
        processed_quiz = []
        for item in quiz_data:
            if not isinstance(item, dict) or 'question' not in item or 'options' not in item or 'correct_answer' not in item:
                print("Error: Question does not contains question,option, or correct_answer key")
                return None
            question = item['question']
            options = item['options']
            correct_answer = item['correct_answer']
            processed_quiz.append({"question": question, "options": options, "correct_answer": correct_answer})

        return processed_quiz

    except Exception as e:
        print(f"An error occurred during quiz generation: {e}")
        return None


@app.route('/generate-notes', methods=['POST'])
def generate_notes_route():
    """Handles the generation of notes for a given topic."""
    data = request.get_json()
    topic = data.get('topic')
    if not topic:
        return jsonify({"error": "No topic provided"}), 400

    notes = generate_simplified_notes(topic)
    if notes:
        return jsonify({'notes': notes}), 200
    else:
        return jsonify({"error": "Failed to generate notes"}), 500


@app.route('/generate-quiz', methods=['POST'])
def generate_quiz_route():
    """Handles the generation of a quiz for a given topic."""
    data = request.get_json()
    topic = data.get('topic')
    if not topic:
        return jsonify({"error": "No topic provided"}), 400
    quiz = generate_quiz(topic)
    if quiz:
        return jsonify({'quiz': quiz}), 200
    else:
        return jsonify({"error": "Failed to generate quiz"}), 500


if __name__ == '__main__':
    app.run(debug=True)
