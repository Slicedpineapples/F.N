from server import connect

def profileINPUT(profile_Intro1, profile_Intro2, profile_Continua):
    print("profileINPUT")

    profile = connect()  
    cursor = profile.cursor()

    sql = "INSERT INTO profile (profile_Intro1, profile_Intro2, profile_Continua) VALUES (%s, %s, %s)"
    Values = (profile_Intro1, profile_Intro2, profile_Continua)
    cursor.execute(sql, Values)
    profile.commit()
    message = "Profile details inserted successfully"
    cursor.close()
    return message

# profileINPUT(
#     "Profile Intro 1",
#     "Profile Intro 2",
#     "Profile Continua"
# )

def profileUPDATE(profile_ID, profile_Intro1, profile_Intro2, profile_Continua):
    print("profileUPDATE")

    profile = connect()  
    cursor = profile.cursor()

    sql = "UPDATE profile SET profile_Intro1 = %s, profile_Intro2 = %s, profile_Continua = %s WHERE profile_ID = %s"
    Values = (profile_Intro1, profile_Intro2, profile_Continua, profile_ID)
    cursor.execute(sql, Values)
    profile.commit()
    print("Profile details updated successfully")
    cursor.close()

def profileDELETE(profile_ID):
    print("profileDELETE")

    profile = connect()  
    cursor = profile.cursor()

    sql = "DELETE FROM profile WHERE profile_ID = %s"
    Values = (profile_ID,)
    cursor.execute(sql, Values)
    profile.commit()
    print("Profile details deleted successfully")
    cursor.close()

def profileOUTPUT():
    print("profileOUTPUT")

    profile = connect()  
    cursor = profile.cursor()

    sql = "SELECT * FROM profile"
    cursor.execute(sql)
    result = cursor.fetchall()
    return result

# print(profileOUTPUT())