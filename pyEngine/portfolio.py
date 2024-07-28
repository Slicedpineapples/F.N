from server import connect

def portfolioINPUT(portfolio_Image, portfolio_Title, portfolio_Long_Description, Client, Client_URL, Category):
    print("portfolioINPUT")

    portfolio = connect()  
    cursor = portfolio.cursor()

    sql = "INSERT INTO Portfolio (Portfolio_Image, Portfolio_Title, Portfolio_Long_Description, Client, Client_URL, Category) VALUES (%s, %s, %s, %s, %s, %s)"
    Values = (portfolio_Image, portfolio_Title, portfolio_Long_Description, Client, Client_URL, Category)
    cursor.execute(sql, Values)
    portfolio.commit()
    print("Portfolio details inserted successfully")
    cursor.close()

# portfolioINPUT(
#     "test.jpg",
#     "Portfolio Title",
#     "Portfolio Long Description",
#     "Client",
#     "https://www.google.com",
#     "Category"
# )
def portfolioUPDATE(portfolio_ID, portfolio_Title, portfolio_Long_Description, Client, Client_URL, Category):
    print("portfolioUPDATE")

    portfolio = connect()  
    cursor = portfolio.cursor()

    sql = "UPDATE Portfolio SET Portfolio_Title = %s, Portfolio_Long_Description = %s, Client = %s, Client_URL = %s, Category = %s WHERE Portfolio_ID = %s"
    Values = (portfolio_Title, portfolio_Long_Description, Client, Client_URL, Category, portfolio_ID)
    cursor.execute(sql, Values)
    portfolio.commit()
    print("Portfolio details updated successfully")
    cursor.close()

def portfolioDELETE(portfolio_ID):
    print("portfolioDELETE")

    portfolio = connect()  
    cursor = portfolio.cursor()

    sql = "DELETE FROM Portfolio WHERE Portfolio_ID = %s"
    Values = (portfolio_ID,)
    cursor.execute(sql, Values)
    portfolio.commit()
    print("Portfolio details deleted successfully")
    cursor.close()

def portfolioOUTPUT():
    print("portfolioOUTPUT")

    portfolio = connect()  
    cursor = portfolio.cursor()

    sql = "SELECT * FROM Portfolio"
    cursor.execute(sql)
    result = cursor.fetchall()
    cursor.close()
    return result