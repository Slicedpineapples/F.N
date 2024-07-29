from server import connect

def aboutINPUT(about_Year, about_Title, about_Description, about_Image):
    print("aboutINPUT")

    about = connect()  
    cursor = about.cursor()

    sql = "INSERT INTO About (About_Year, About_Title, About_Description, About_Image) VALUES (%s, %s, %s, %s)"
    Values = (about_Year, about_Title, about_Description, about_Image)
    cursor.execute(sql, Values)
    about.commit()
    print("About details inserted successfully")
    cursor.close()

def aboutUPDATE(about_ID, about_Year, about_Title, about_Description, about_Image):
    print("aboutUPDATE")

    about = connect()  
    cursor = about.cursor()

    sql = "UPDATE About SET About_Year = %s, About_Title = %s, About_Description = %s, About_Image = %s WHERE About_ID = %s"
    Values = (about_Year, about_Title, about_Description, about_Image, about_ID)
    cursor.execute(sql, Values)
    about.commit()
    print("About details updated successfully")
    cursor.close()

def aboutDELETE(about_ID):
    print("aboutDELETE")

    about = connect()  
    cursor = about.cursor()

    sql = "DELETE FROM About WHERE About_ID = %s"
    Values = (about_ID,)
    cursor.execute(sql, Values)
    about.commit()
    print("About details deleted successfully")
    cursor.close()

def aboutOUTPUT():
    print("aboutOUTPUT")

    about = connect()  
    cursor = about.cursor()

    sql = "SELECT * FROM About"
    cursor.execute(sql)
    result = cursor.fetchall()
    
    output = []
    for row in result:
        output.append({
            'About_ID': row[0],
            'About_Year': row[1],
            'About_Title': row[2],
            'About_Description': row[3],
            'About_Image': row[4]
        })
    cursor.close()
    return output
