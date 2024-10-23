from bson import ObjectId



def convert_objectid_to_str(data):
    """Recursively convert ObjectId in a dictionary to strings."""
    if isinstance(data, dict):
        return {key: convert_objectid_to_str(value) for key, value in data.items()}
    elif isinstance(data, list):
        return [convert_objectid_to_str(item) for item in data]
    elif isinstance(data, ObjectId):
        return str(data)  # Convert ObjectId to string
    return data  # Return the data as is if it's neither a dict, list, or ObjectId