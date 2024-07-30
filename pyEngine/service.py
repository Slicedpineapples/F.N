from server import connect


def serviceINPUT(service_Image, service_Title, service_Description):
    print("serviceINPUT")
    # service_Image = input("Name of image: ")
    # service_Title = input("Name of service: ")
    # service_Description = input("Description of service: ")

    service = connect()  
    cursor = service.cursor()

    sql = "INSERT INTO services (service_Image, service_Title, service_Description) VALUES (%s, %s, %s)"
    Values = (service_Image, service_Title, service_Description)
    cursor.execute(sql, Values)
    service.commit()
    message = "Service details inserted successfully"
    cursor.close()
    return message

def serviceUPDATE(service_ID, service_Title, service_Description):
    # print("serviceUPDATE")
    # service_ID = input("Enter the ID of the service you want to update: ")
    # service_Title = input("Name of service: ")
    # service_Description = input("Description of service: ")

    service = connect()
    cursor = service.cursor()

    sql = "UPDATE services SET service_Title = %s, service_Description = %s WHERE service_ID = %s"
    Values = (service_Title, service_Description, service_ID)
    cursor.execute(sql, Values)
    service.commit()
    print("Service details updated successfully")
    cursor.close()

def serviceDELETE(service_ID):
    # print("serviceDELETE")
    # service_ID = input("Enter the ID of the service you want to delete: ")

    service = connect()
    cursor = service.cursor()

    sql = "DELETE FROM services WHERE service_ID = %s"
    Values = (service_ID,)
    cursor.execute(sql, Values)
    service.commit()
    print("Service details deleted successfully")
    cursor.close()

def serviceOUTPUT():
    service = connect()
    cursor = service.cursor()

    sql = "SELECT service_Image, service_Title, service_Description FROM services"
    cursor.execute(sql)
    result = cursor.fetchall()

    output = []
    for row in result:
        output.append({
            "service_Image": row[0],
            "service_Title": row[1],
            "service_Description": row[2]
        })

    cursor.close()
    service.close()

    return output

