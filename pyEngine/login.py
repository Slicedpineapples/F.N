from server import connect
import hashlib

global message
message = ""

def signUp(username, password):
    username = username
    password = hashlib.sha256(password.encode()).hexdigest()
    
    # Initialize cursor and signup to None
    cursor = None
    signup = None
    
    try:
        signup = connect()
        cursor = signup.cursor()

        sql = "INSERT INTO Users (user_Name, password) VALUES (%s, %s)"
        values = (username, password)
        cursor.execute(sql, values)
        signup.commit()
        message = "User created successfully!\nProceed to login."

    except Exception as e:
        message = f"Something went wrong: {e}"
        print("Error:", e)

    finally:
        # Close cursor and signup if they are not None
        if cursor:
            cursor.close()
        if signup:
            signup.close()
    
    return message


def login(username, password):
    # Hash the password
    password = hashlib.sha256(password.encode()).hexdigest()
    connection = None
    cursor = None
    
    try:
        # Connect to the database
        connection = connect()
        cursor = connection.cursor()
        
        # Prepare and execute the SQL query
        sql = "SELECT user_Name FROM Users WHERE user_Name = %s AND password = %s"
        values = (username, password)
        cursor.execute(sql, values)
        
        result = cursor.fetchone()

        if result:
            message = "Login successful!"
            # print(message)
            return result[0], message
        else:
            message = "Invalid username or password"
            return None, message

    except Exception as e:
        print("Error:", e)
        return None, "Error during login"
        
    finally:
        # Ensure cursor and connection are closed
        if cursor:
            cursor.close()
        if connection:
            connection.close()

# print(login("helix", "helix")) #Debugging only
# signUp("slicedpineapples", "Fwtlahapl.123")
# print(login("slicedpineapples", "Fwtlahapl.123")) #Debugging only