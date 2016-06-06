import sqlite_handler
import sqlite3
import json


def get_selected_column_list(column_string):
    column_list = column_string.split(',')
    return column_list


def create_column_field_map(column_list, field_list):
    cf_map = dict(zip(column_list, field_list))
    return cf_map


class CommonVariables():
    def __init__(self, serial_number):
        self.db_name = "test.db"
        self.table_project_setups = "project_setups"
        self.table_hardware = "hardware"
        self.serial_number = serial_number
        self.sqlite_object = sqlite_handler.CreateSQLiteConnection(self.db_name)


class ProjectSetup(CommonVariables):
    def __init__(self, serial_number):
        CommonVariables.__init__(self, serial_number)
        try:
            print self.get_selected_hardware_details()
            print self.get_project_setup_details()
            self.sqlite_object.close_connection()
        except sqlite3.Error as er:
            print er.message

    def get_selected_hardware_details(self):
        selected_columns = "make,management_ip,profile_name,project,primary_owner,secondary_owner,tertiary_owner"
        selected_columns_list = get_selected_column_list(selected_columns)
        result = self.sqlite_object.execute_select_query("select %s from %s where serial_number='%s'" % (selected_columns, self.table_hardware, self.serial_number))
        return_list = []
        if len(result) == 0:
            return "There is no machine with this serial number."
        elif len(result) == 1:
            return_list.append(create_column_field_map(selected_columns_list, result[0]))
            return return_list
        else:
            for row in result:
                return_list.append(create_column_field_map(selected_columns_list, row))
            return return_list

    def get_project_setup_details(self):
        selected_columns = "Bare_Metal_IP,Project,Setup_Name,Setup_IP,VM,Role,VIP,Storage_Size,Storage_IP,Storage_initiator_name,Storage_target_ip"
        selected_columns_list = get_selected_column_list(selected_columns)
        result = self.sqlite_object.execute_select_query("select %s from %s where serial_number='%s'" % (selected_columns, self.table_project_setups, self.serial_number))
        if len(result) == 0:
            return "No setup specific entry corresponding to this serial number."
        else:
            return_list = []
            for row in result:
                return_list.append(create_column_field_map(selected_columns_list, row))
            return json.dumps(return_list)


class ProjectSetupUpdate(CommonVariables):
    def __init__(self, serial_number):
        CommonVariables.__init__(self, serial_number)
        try:
            print self.create_new_entry()
            self.sqlite_object.close_connection()
        except sqlite3.Error as er:
            print er.message

    def create_new_entry(self, values):
        columns = ",".join(self.sqlite_object.get_column_names(self.table_project_setups))
        self.sqlite_object.execute_insert_query("insert into %s (%s) values (%s)" % (columns, self.table_project_setups, values))
        self.sqlite_object.commit_transaction()






ProjectSetup('FCH16387B1L')