from bson import ObjectId


def serialize_data(data):
    if isinstance(data, list):
        return [serialize_document(item) for item in data]
    elif isinstance(data, dict):
        return serialize_document(data)
    return data


def serialize_document(document):
    serialized_doc = {}
    for key, value in document.items():
        if isinstance(value, ObjectId):
            serialized_doc[key] = str(value)
        elif isinstance(value, dict) and "$oid" in value:
            serialized_doc[key] = str(value["$oid"])
        elif isinstance(value, dict) and "$date" in value:
            serialized_doc[key] = value["$date"]
        else:
            serialized_doc[key] = value
    return serialized_doc