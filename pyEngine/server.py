import mysql.connector

def connect():
    try:
        cnx = mysql.connector.connect(
            host="127.0.0.1",
            port=3306,
            user="root",
            password="Fwtlahapl.123",
            database="portfolio"
        )
    except Exception as e:
        # print("Error connecting to the database:", str(e)) # Debugging purpose only
        print("Oops :(\nSomethinng went wrong.")
    else:
        # print("Connection established!") # Debugging purpose only
        return cnx
    

# connect() # Debugging purpose only