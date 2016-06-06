import sqlite3


class CreateSQLiteConnection():
    def __init__(self, db_file):
        self.db_file = db_file
        self.conn, self.cur = self.get_connection_object(self.db_file)

    def get_connection_object(self, db_file):
        # Create and return the connection object
        conn = sqlite3.connect(db_file)
        conn.text_factory = str
        cur = conn.cursor()
        return conn, cur

    def get_column_names(self, table_name):
        # Get column names of any given table
        rows = self.cur.execute("PRAGMA table_info(%s)" % table_name).fetchall()
        columns = set()
        for row in rows:
            columns.add(row[1])
        return columns

    def get_column_modifiers(self, columns):
        # Get a list of column modifiers which are required when updating a table as these are more secure than normal string substitution
        column_modifiers = ""
        for i in range(len(columns)):
            column_modifiers += " ?,"
        column_modifiers = column_modifiers[:-1]
        return column_modifiers

    def execute_select_query(self, query):
        # Execute and returns the results of a select query
        results = self.cur.execute(query).fetchall()
        return results

    def execute_insert_query(self, query):
        # Execute an insert query
        self.cur.execute(query)

    def execute_update_query(self, query):
        # Execute an update query
        self.cur.execute(query)

    def commit_transaction(self):
        # Commit the transaction to the database
        self.conn.commit()

    def close_connection(self):
        # Close the connection
        self.conn.close()


if __name__ == "__main__":
    obj = CreateSQLiteConnection("/Users/samarth.goel/Downloads/test.db")
    columns = obj.get_column_names("hardware")
    print obj.get_column_modifiers(columns)