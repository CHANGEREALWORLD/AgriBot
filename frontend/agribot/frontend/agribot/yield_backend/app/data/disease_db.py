DISEASES = [
    {
        "name": "Leaf Blight",
        "crops": ["rice", "wheat", "maize"],
        "core_symptoms": ["leaf_spots", "yellowing"],
        "symptoms": {
            "leaf_spots": 30,
            "yellowing": 20,
            "dry_edges": 10,
            "wilting": 10,
        },
        "treatment": [
            "Apply fungicides like Mancozeb",
            "Remove infected leaves"
        ],
        "prevention": [
            "Use resistant varieties",
            "Avoid overhead irrigation"
        ],
    },
    {
        "name": "Powdery Mildew",
        "crops": ["wheat", "barley", "grape"],
        "core_symptoms": ["white_powder"],
        "symptoms": {
            "white_powder": 40,
            "leaf_spots": 10,
            "stunted_growth": 10,
        },
        "treatment": [
            "Use sulfur-based fungicide",
            "Remove affected plant parts"
        ],
        "prevention": [
            "Ensure good air circulation",
            "Avoid overcrowding"
        ],
    },
    {
        "name": "Root Rot",
        "crops": [],
        "core_symptoms": ["root_decay"],
        "symptoms": {
            "root_decay": 45,
            "wilting": 15,
            "yellowing": 10,
        },
        "treatment": [
            "Improve soil drainage",
            "Apply appropriate fungicide"
        ],
        "prevention": [
            "Avoid overwatering",
            "Use well-drained soil"
        ],
    },
    {
        "name": "Bacterial Wilt",
        "crops": ["tomato", "potato", "pepper"],
        "core_symptoms": ["wilting"],
        "symptoms": {
            "wilting": 35,
            "yellowing": 10,
            "stem_darkening": 15,
        },
        "treatment": [
            "Remove infected plants",
            "Use disease-free seeds"
        ],
        "prevention": [
            "Practice crop rotation",
            "Improve soil sanitation"
        ],
    },
    {
        "name": "Late Blight",
        "crops": ["potato", "tomato"],
        "core_symptoms": ["leaf_spots"],
        "symptoms": {
            "leaf_spots": 30,
            "wilting": 15,
            "brown_patches": 20,
        },
        "treatment": [
            "Apply copper-based fungicide",
            "Remove infected plants"
        ],
        "prevention": [
            "Avoid wet foliage",
            "Use resistant varieties"
        ],
    },
]
