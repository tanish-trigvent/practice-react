import bcrypt

def hash_password(password):
    # Generate a salt
    salt = bcrypt.gensalt()
    # Hash the password
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    # Return the hashed password as a UTF-8 string
    return hashed_password.decode('utf-8')

# Function to verify the password
def check_password(plain_password, hashed_password):
    # Compare the plain password with the hashed password
     return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))
