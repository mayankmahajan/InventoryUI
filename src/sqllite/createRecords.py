import sqlite3
import sys
import json
# x = 24
# conn = sqlite3.connect('example.db')
# c =conn.cursor()

# c.execute('''CREATE TABLE stocks (date text, trans text, symbol text, qty real, price real)''')
# import random
# num = random.randint(1,100000)
# c.execute("INSERT INTO stocks VALUES ("+sys.argv[1]+",'BUY1','RHAT1',"+str(num)+","+str(num)+")")
# c.execute("INSERT INTO stocks VALUES ('1234','BUY1','RHAT1','sd','1s3')")

# c.execute('''SELECT * FROM STOCKS''')
# x=  c.fetchall()

# print "%d" % sys.argv[1]
# print type(sys.argv[1])
# print type(x)
m = json.dumps([{str(sys.argv[1]): "admin", "project_name": "BizReflex", "hard_disk": "406G", "secondary_owner": "", "ram": "96G", "setup_name": "BR4.1_Rubperf", "comments": "", "vm": "N", "base_os_password": "admin@123", "tertiary_owner": "", "management_ip": "192.168.116.71", "profile_name": "", "base_os_ip": "192.168.112.56", "serial_number": "SGH311PFEA", "cores": 25, "primary_owner": "amit.saxena", "product_name": "ProLiant BL460c Gen8", "manufacturer": "HP"}])
y = json.dumps(str(sys.argv[1]))
print m



# conn.commit()
# conn.close()
