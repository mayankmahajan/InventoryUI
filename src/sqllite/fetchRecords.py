import sqlite3
conn = sqlite3.connect('example.db')
c =conn.cursor()
c.execute('''SELECT * FROM STOCKS WHERE ''')
print c.fetchall()
conn.commit()
conn.close()
