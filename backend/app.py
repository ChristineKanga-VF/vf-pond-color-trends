from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import numpy as np
from models import db, Pond_Color_Trends
import base64
import os
from datetime import datetime
from config import Config

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
app.config.from_object(Config)
db.init_app(app)

with app.app_context():
    db.create_all()

# Color palette
colors = [
    { "name":
 'Sea Nettle', "code": '#8A8B54' },
    { "name":
 'Emerald Delight 4', "code": '#41AA7D' },
    { "name":
 'Crushed Pine 2', "code": '#5B9A70' },
    { "name":
 'Mountain Moss', "code": '#968A3B' },
    { "name":
 'Celtic Forest 1', "code": '#817D59' },
    { "name":
 'Jungle Fever 1', "code": '#75845D' },
    { "name":
 'Parrots Plume', "code": '#71A63F' },
    { "name":
 'Guild Green', "code": '#777B5B' },
    { "name":
 'English Mist 1', "code": '#777B5B' },
    { "name":
 'Forest Falls 1', "code": '#1CAD78' },
    { "name":
 'Goosebery Fool 1', "code": '#787256' },
    { "name":
 'Rainforest Canopy', "code": '#888C29' },
    { "name":
 'Woodland Fern 3', "code": '#6D9736' },
    { "name":
 'Grecian Spa 1', "code": '#00AA8F' },
    { "name":
 'Woodland Pearl 1', "code": '#65775B' },
    { "name":
 'Minted Glory 4', "code": '#00A58D' },
    { "name":
 'Jade Cluster 4', "code": '#00AD85' },
    { "name":
 'Soft Fauna 1', "code": '#517367' },
    { "name":
 'Highland Falls 1', "code": '#57725E' },
    { "name":
 'Celtic Moor 1', "code": '#648637' },
    { "name":
 'Nordic Hills', "code": '#6C6B3E' },
    { "name":
 'Tuscan Glade 1', "code": '#536C51' },
    { "name":
 'Japanese Maze1', "code": '#527143' },
    { "name":
 'Wild Cactus', "code": '#636040' },
    { "name":
 'Moorland Magic 1', "code": '#497839' },
    { "name":
 'Crushed Pine 1', "code": '#34794D' },
    { "name":
 'Dublic Bay 3', "code": '#2E8F3D' },
    { "name":
 'Lush Grass', "code": '#2E8F3D' },
    { "name":
 'Minted Glory 3', "code": '#008571' },
    { "name":
 'Turquoise Copper', "code": '#007F74' },
    { "name":
 'Emerald Delight 2', "code": '#207856' },
    { "name":
 'LLB Perfect Peacock', "code": '#39595B' },
    { "name":
 'Jade Cluster 3', "code": '#008763' },
    { "name":
 'Peppermint Beach 1', "code": '#008466' },
    { "name":
 'Woodland Fern 2', "code": '#466A39' },
    { "name":
 'Emerald Delight 3', "code": '#008F54' },
    { "name":
 'Nina\'s Green', "code": '#524E3F' },
    { "name":
 'Jade Cluster 2', "code": '#007C5C' },
    { "name":
 'Fortune Green', "code": '#007067' },
    { "name":
 'Paradise Green 2', "code": '#1F7042' },
    { "name":
 'Vine Leaf', "code": '#3B6035' },
    { "name":
 'Amazon Jungle 1', "code": '#346437' },
    { "name":
 'Fresh Pine', "code": '#23693B' },
    { "name":
 'Minted Glory 2', "code": '#0D6456' },
    { "name":
 'Dublic Bay 2', "code": '#266A34' },
    { "name":
 'Paradise Green 1', "code": '#2B5C3D' },
    { "name":
 'Woodland Fern 1', "code": '#32523D' },
    { "name":
 'Indian Ivy 1', "code": '#3D512B' },
    { "name":
 'Forest Festival', "code": '#03664F' },
    { "name":
 'Everglade Forest', "code": '#304B38' },
    { "name":
 'Pine Needle', "code": '#2A493F' },
    { "name":
 'Palm Night', "code": '#384137' },
    { "name":
 'Dublin Bay 1', "code": '#19563E' },
    { "name":
 'Alpine View', "code": '#2D3D39' },
    { "name":
 'Emerald Delight 1', "code": '#025E42' },
    { "name":
 'Jade Cluster 1', "code": '#005345' },
    { "name":
 'Minted Glory 1', "code": '#00533F' },
    ]


def hex_to_rgb(hex_color):
    #remove the '#' symbol from the input hex_color
    hex_color = hex_color.lstrip('#')
    # generates a tuple of RGB values by converting substrings of the hex_color into integers using (hexadecimal) 
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

    """ Find closest color in palette """
def closest_color(requested_color):
    min_color = None
    min_distance = float('inf')
    requested_rgb = hex_to_rgb(requested_color)
    
    #Calculate the distance between the requested color and each color in the palette using the Euclidean distance formula
    for color in colors:
        palette_rgb = hex_to_rgb(color["code"])
        distance = np.linalg.norm(np.array(requested_rgb) - np.array(palette_rgb))
        
        if distance < min_distance:
            min_distance = distance
            min_color = color
    
    return min_color

@app.route('/match-color', methods=['POST'])
def match_color():
    if request.method == 'POST':
        data = request.get_json()
        sRGBHex = data.get('sRGBHex', None)
        
        if sRGBHex:
            closest = closest_color(sRGBHex)
            return jsonify({
                "name": closest["name"],
                "code": closest["code"]
            })
        else:
            return jsonify({"error": "could not find a match"}), 400
         
@app.route('/submit', methods=['POST'])
def submit():
    data = request.json
    try:
        # Save the image
        image_data = data['image'].split(",")[1]
        image_filename=data['imageFilename']
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_filename)
        with open(image_path, "wb") as f:
            f.write(base64.b64decode(image_data))

        # Save the record in the database
        pond_image = Pond_Color_Trends(
            image_filename=image_filename,
            closest_color_name=data['closestColor']['name'],
            closest_color_code=data['closestColor']['code'],
            category=data['category'],
            pond=data['pond'],
            date=datetime.strptime(data['date'], '%a %b %d %Y %H:%M:%S GMT%z (East Africa Time)')
        )
        db.session.add(pond_image)
        db.session.commit()
        

        return jsonify({"message": "Data saved successfully"}), 200
    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500

@app.route('/submitted-data', methods=['GET'])
def get_submitted_data():
    submitted_data = Pond_Color_Trends.query.all()
    data = [{
        'id': item.id,
      #   'image': item.image,
        'imageFilename': item.image_filename,
        'closestColor': item.closest_color_code,
        'closestColorName': item.closest_color_name,
        'category': item.category,
        'pond': item.pond,
        'date': item.date.strftime('%Y-%m-%d %H:%M:%S')  # Format date as needed
    } for item in submitted_data]

    return jsonify(data)

@app.route('/<path:filename>')
def serve_uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    app.run(debug=True)
