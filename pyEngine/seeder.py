import os
import mysql.connector
from dotenv import load_dotenv

def seed():
  load_dotenv()

  db_host = os.getenv('DB_HOST')
  db_user = os.getenv('DB_USER')
  db_password = os.getenv('DB_PASSWORD')
  db_name = os.getenv('DB_NAME')

  db = mysql.connector.connect(
      host=db_host,
      user=db_user,
      password=db_password
  )

  cursor = db.cursor()

  # Check if the database exists
  cursor.execute(f"SHOW DATABASES LIKE '{db_name}'")
  result = cursor.fetchone()

  if result:
      print(f"Database '{db_name}' already exists.")
  else:
      # Create the database if it doesn't exist
      cursor.execute(f"CREATE DATABASE {db_name}")
      print(f"Database '{db_name}' created.")

  # Select the newly created database
  cursor.execute(f"USE {db_name}")

  # Create the About table
  cursor.execute("""
  CREATE TABLE IF NOT EXISTS About (
    about_ID bigint UNSIGNED NOT NULL AUTO_INCREMENT,
    about_Year varchar(255) NOT NULL,
    about_Title varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
    about_Description text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
    about_Image varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
    PRIMARY KEY (about_ID)
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
  """)

  # Create the Partners table
  cursor.execute("""
  CREATE TABLE IF NOT EXISTS Partners (
    Partner_ID bigint UNSIGNED NOT NULL AUTO_INCREMENT,
    Partner_Image varchar(255) NOT NULL,
    Partner_Name varchar(255) NOT NULL,
    Partner_Role varchar(255) NOT NULL,
    Partner_Social1 varchar(255) NOT NULL,
    Partner_Social2 bigint NOT NULL,
    Partner_Social3 bigint NOT NULL,
    PRIMARY KEY (Partner_ID)
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
  """)

  # Create the Portfolio table
  cursor.execute("""
  CREATE TABLE IF NOT EXISTS Portfolio (
    portfolio_ID bigint UNSIGNED NOT NULL AUTO_INCREMENT,
    portfolio_Image varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
    portfolio_Title varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
    portfolio_Long_Description text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
    client varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
    client_URL varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
    category varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
    PRIMARY KEY (portfolio_ID)
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
  """)

  # Create the profile table
  cursor.execute("""
  CREATE TABLE IF NOT EXISTS profile (
    profile_ID int NOT NULL AUTO_INCREMENT,
    profile_Intro1 varchar(500) NOT NULL,
    profile_Intro2 varchar(500) NOT NULL,
    profile_Continua varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
    PRIMARY KEY (profile_ID)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
  """)

  # Create the services table
  cursor.execute("""
  CREATE TABLE IF NOT EXISTS services (
    service_ID bigint UNSIGNED NOT NULL AUTO_INCREMENT,
    service_Image varchar(255) NOT NULL,
    service_Title varchar(255) NOT NULL,
    service_Description text NOT NULL,
    PRIMARY KEY (service_ID)
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
  """)

  # Create the Users table
  cursor.execute("""
  CREATE TABLE IF NOT EXISTS Users (
    user_ID int NOT NULL AUTO_INCREMENT,
    user_Name varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    PRIMARY KEY (user_ID)
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
  """)

  # Close the cursor and the database connection
  cursor.close()
  db.close()

  print("Database and tables setup completed successfully!")
