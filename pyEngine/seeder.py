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

    # Connect to MySQL server
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
        cursor.execute(f"USE {db_name}")  # Select the existing database
    else:
        try:
            # Create the database if it doesn't exist
            cursor.execute(f"CREATE DATABASE {db_name} CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci")
            print(f"Database '{db_name}' created.")
            cursor.execute(f"USE {db_name}")  # Select the newly created database
        except Exception as e:
            print("Error creating the database:", e)
            return  # Exit the function if the database couldn't be created

    # Check if the tables exist or need to be created
    tables = {
        'About': """
        CREATE TABLE IF NOT EXISTS About (
            about_ID bigint UNSIGNED NOT NULL AUTO_INCREMENT,
            about_Year varchar(255) NOT NULL,
            about_Title varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
            about_Description text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
            about_Image varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
            PRIMARY KEY (about_ID)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
        """,
        'Partners': """
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
        """,
        'Portfolio': """
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
        """,
        'Profile': """
        CREATE TABLE IF NOT EXISTS Profile (
            profile_ID int NOT NULL AUTO_INCREMENT,
            profile_Intro1 varchar(500) NOT NULL,
            profile_Intro2 varchar(500) NOT NULL,
            profile_Continua varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
            PRIMARY KEY (profile_ID)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
        """,
        'Services': """
        CREATE TABLE IF NOT EXISTS Services (
            service_ID bigint UNSIGNED NOT NULL AUTO_INCREMENT,
            service_Image varchar(255) NOT NULL,
            service_Title varchar(255) NOT NULL,
            service_Description text NOT NULL,
            PRIMARY KEY (service_ID)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
        """,
        'Users': """
        CREATE TABLE IF NOT EXISTS Users (
            user_ID int NOT NULL AUTO_INCREMENT,
            user_Name varchar(255) NOT NULL,
            password varchar(255) NOT NULL,
            PRIMARY KEY (user_ID)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
        """
    }

    for table_name, create_table_sql in tables.items():
        try:
            cursor.execute(f"SHOW TABLES LIKE '{table_name}'")
            table_exists = cursor.fetchone()

            if table_exists:
                print(f"{table_name} table already exists.")
            else:
                cursor.execute(create_table_sql)
                print(f"{table_name} table created.")
        except Exception as e:
            print(f"Error creating the {table_name} table:", e)

    # Check if the admin user exists in the Users table
    try:
        cursor.execute("SELECT * FROM Users WHERE user_Name = %s", (admin_name,))
        admin = cursor.fetchone()

        if admin:
            print(f"User '{admin_name}' already exists.")
        else:
            # Insert the admin user
            hashed_password = hashlib.sha256(admin_password.encode()).hexdigest()
            cursor.execute("INSERT INTO Users (user_Name, password) VALUES (%s, %s)", (admin_name, hashed_password))
            db.commit()
            print(f"User '{admin_name}' inserted into the Users table.")
    except Exception as e:
        print("Error inserting the admin user:", e)

    # Close the cursor and the database connection
    cursor.close()
    db.close()

    print("Database and tables setup completed successfully!")