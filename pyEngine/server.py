import os
import mysql.connector
from dotenv import load_dotenv


def connect():
    try:
        load_dotenv()
        
        cnx = mysql.connector.connect(
            host = os.getenv('DB_HOST'),
            user = os.getenv('DB_USER'),
            password = os.getenv('DB_PASSWORD'),
            port = os.getenv('DB_PORT')
        )
    except Exception as e:
        # print("Error connecting to the database:", str(e)) # Debugging purpose only
        print("Oops :(\nSomethinng went wrong.")
    else:
        print("Connection established!") # Debugging purpose only
        return cnx
    

# connect() # Debugging purpose only