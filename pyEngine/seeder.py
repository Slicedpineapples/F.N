import os
import hashlib
import mysql.connector
from dotenv import load_dotenv

def seed():
    load_dotenv()

    db_host = os.getenv('DB_HOST')
    db_user = os.getenv('DB_USER')
    db_password = os.getenv('DB_PASSWORD')
    db_name = os.getenv('DB_NAME')
    admin_name = os.getenv('ADMIN')
    admin_password = os.getenv('ADMIN_PASSWORD')

    db = mysql.connector.connect(
        host=db_host,
        user=db_user,
        password=db_password
    )

    cursor = db.cursor()

    # Check if the database exists
    cursor.execute(f"SHOW DATABASES LIKE '{db_name}'")
    result = cursor.fetchone()

    # Check if About table exists
    cursor.execute(f"SHOW TABLES FROM {db_name} LIKE 'About'")
    about_table = cursor.fetchone()

    # Check if Partners table exists
    cursor.execute(f"SHOW TABLES FROM {db_name} LIKE 'Partners'")
    partners_table = cursor.fetchone()

    # Check if Portfolio table exists
    cursor.execute(f"SHOW TABLES FROM {db_name} LIKE 'Portfolio'")
    portfolio_table = cursor.fetchone()

    # Check if profile table exists
    cursor.execute(f"SHOW TABLES FROM {db_name} LIKE 'profile'")
    profile_table = cursor.fetchone()

    # Check if services table exists
    cursor.execute(f"SHOW TABLES FROM {db_name} LIKE 'services'")
    services_table = cursor.fetchone()

    # Check if Users table exists
    cursor.execute(f"SHOW TABLES FROM {db_name} LIKE 'Users'")
    users_table = cursor.fetchone()



    if result:
        print(f"Database '{db_name}' already exists.")
    else:
        try:
            # Create the database if it doesn't exist
            cursor.execute(f"CREATE DATABASE {db_name} CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci")
            print(f"Database '{db_name}' created.")
        except Exception as e:
            print("Error creating the database:", e)

        # Select the newly created database
        cursor.execute(f"USE {db_name}")
    
    if about_table:
        print("About table already exist.")
    else:
        try:
            # Create the About table
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS About (
                about_ID bigint UNSIGNED NOT NULL AUTO_INCREMENT,
                about_Year varchar(255) NOT NULL,
                about_Title varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
                about_Description text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
                about_Image varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
                PRIMARY KEY (about_ID)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
            """)
            print("About table created.")
        except Exception as e:

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
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
        """)

        # Create the Portfolio table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS Portfolio (
            portfolio_ID bigint UNSIGNED NOT NULL AUTO_INCREMENT,
            portfolio_Image varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
            portfolio_Title varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
            portfolio_Long_Description text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
            client varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
            client_URL varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
            category varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
            PRIMARY KEY (portfolio_ID)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
        """)

        # Create the profile table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS profile (
            profile_ID int NOT NULL AUTO_INCREMENT,
            profile_Intro1 varchar(500) NOT NULL,
            profile_Intro2 varchar(500) NOT NULL,
            profile_Continua varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
            PRIMARY KEY (profile_ID)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
        """)

        # Create the services table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS services (
            service_ID bigint UNSIGNED NOT NULL AUTO_INCREMENT,
            service_Image varchar(255) NOT NULL,
            service_Title varchar(255) NOT NULL,
            service_Description text NOT NULL,
            PRIMARY KEY (service_ID)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
        """)

        # Create the Users table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS Users (
            user_ID int NOT NULL AUTO_INCREMENT,
            user_Name varchar(255) NOT NULL,
            password varchar(255) NOT NULL,
            PRIMARY KEY (user_ID)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
        """)
        # Insert a user into the Users table
        user_name= admin_name
        user_password=hashlib.sha256(admin_password.encode()).hexdigest()


        insert_user_query = f"INSERT INTO Users (user_Name, password) VALUES ('{user_name}', '{user_password}')"
        cursor.execute(insert_user_query)
        db.commit()

        print(f"User '{user_name}' inserted into the Users table.")

        # Close the cursor and the database connection
        cursor.close()
        db.close()

        print("Database and tables setup completed successfully!")

