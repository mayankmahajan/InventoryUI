import sqlite_handler
import sqlite3
import json
import sys

'''
Schema structures:

CREATE TABLE hardware(serial_number text primary key not null, manufacturer text not null, product_name text not null, management_ip text not null, profile_name text, cores int not null, ram text not null, hard_disk text not null, primary_owner text not null, secondary_owner text, tertiary_owner text, project_id int not null, base_os_ip text, base_os_username text, base_os_password text, vm text not null, setup_name text, current_version text not null, deleted text not null, created_by text not null, creation_time text not null, comments text not null);
CREATE TABLE projects(project_id int primary key not null, project_name text not null);
CREATE TABLE setups(serial_number text not null, project_id int not null, setup_ip text not null, cores int not null, ram text not null, role text not null, vip text, storage_size text, storage_ip text, storage_initiator_name text, storage_target_ip text, current_version text not null, deleted text not null, created_by text not null, creation_time text not null, comments text, primary key(serial_number, setup_ip));
CREATE TABLE users(user_email text primary key not null, user_name text not null, group_name text not null, deleted text not null);
'''


def get_selected_column_list(column_string):
    column_list = column_string.split(',')
    return column_list


def create_column_field_map(column_list, field_list):
    cf_map = dict(zip(column_list, field_list))
    return cf_map


def create_result_map(selected_columns_list, result):
    if len(result) == 0:
        return "No result match your criteria"
    else:
        return_list = []
        for row in result:
            return_list.append(create_column_field_map(selected_columns_list, row))
        return return_list


class CommonVariables():
    def __init__(self):
        self.db_name = "inventory_management.db"
        self.table_setups = "setups"
        self.table_hardware = "hardware"
        self.table_projects = "projects"
        self.sqlite_object = sqlite_handler.CreateSQLiteConnection(self.db_name)


class HardwareInventory(CommonVariables):
    def __init__(self, condition):
        CommonVariables.__init__(self)
        self.condition = condition
        try:
            print json.dumps(self.get_hardware_details())
        except sqlite3.Error as er:
            print json.dumps(er.message)

    def get_hardware_details(self):
        selected_columns = "serial_number,manufacturer,product_name,management_ip,profile_name,cores,ram,hard_disk,primary_owner,secondary_owner,tertiary_owner,project_name,base_os_ip,base_os_username,base_os_password,setup_name,vm,comments"
        selected_columns_list = get_selected_column_list(selected_columns)
        if self.condition == "":
            result = self.sqlite_object.execute_select_query("select %s from %s,%s where %s.project_id=%s.project_id and deleted='n' and current_version='y'" % (selected_columns, self.table_hardware, self.table_projects, self.table_hardware, self.table_projects))
        else:
            result = self.sqlite_object.execute_select_query("select %s from %s,%s where %s.project_id=%s.project_id and deleted='n' and current_version='y' and %s" % (selected_columns, self.table_hardware, self.table_projects, self.table_hardware, self.table_projects, self.condition))
        return create_result_map(selected_columns_list, result)

    def add_new_hardware(self, values):
        columns = self.sqlite_object.get_column_names(self.table_hardware)
        self.sqlite_object.execute_insert_query("insert into %s (%s) values (%s)" % (self.table_hardware, columns, values))
        self.sqlite_object.commit_transaction()

    def update_hardware_details(self, serial_number, values):
        self.sqlite_object.execute_update_query("update %s set current_version='n' where serial_number=%s" % (self.table_hardware, serial_number))
        self.sqlite_object.commit_transaction()
        self.add_new_hardware(values)


class ProjectSetup(CommonVariables):
    def __init__(self, serial_number):
        CommonVariables.__init__(self)
        self.serial_number = serial_number
        try:
            print json.dumps(self.get_selected_hardware_details())
            print json.dumps(self.get_project_setup_details())
            self.sqlite_object.close_connection()
        except sqlite3.Error as er:
            print json.dumps(er.message)

    def get_selected_hardware_details(self):
        selected_columns = "manufacturer,cores,product_name,ram,management_ip,hard_disk,profile_name,project_name,base_os_ip,setup_name,base_os_username,vm,base_os_password"
        selected_columns_list = get_selected_column_list(selected_columns)
        result = self.sqlite_object.execute_select_query("select %s from %s,%s where %s.project_id=%s.project_id and serial_number='%s' and deleted='n' and current_version='y'" % (selected_columns, self.table_hardware, self.table_projects, self.table_hardware, self.table_projects, self.serial_number))
        return create_result_map(selected_columns_list, result)

    def get_project_setup_details(self):
        selected_columns = "setup_ip,role,cores,ram,storage_size,storage_ip,storage_initiator_name,storage_target_ip"
        selected_columns_list = get_selected_column_list(selected_columns)
        result = self.sqlite_object.execute_select_query("select %s from %s where serial_number='%s' and current_version='y' and deleted='n'" % (selected_columns, self.table_setups, self.serial_number))
        return create_result_map(selected_columns_list, result)


class ProjectSetupUpdate(CommonVariables):
    def __init__(self, serial_number, setup_ip):
        CommonVariables.__init__(self)
        self.serial_number = serial_number
        self.setup_ip = setup_ip
        try:
            print self.create_new_entry()
            self.sqlite_object.close_connection()
        except sqlite3.Error as er:
            print er.message

    def create_new_entry(self, values):
        columns = ",".join(self.sqlite_object.get_column_names(self.table_setups))
        self.sqlite_object.execute_insert_query("insert into %s (%s) values (%s)" % (self.table_setups, columns, values))
        self.sqlite_object.commit_transaction()

    def edit_entry(self, values):
        self.sqlite_object.execute_update_query("update %s set current_version='N', lastupdate_time=%s where serial_number=%s and setup_ip=%s" % (self.table_setups, values, self.serial_number, self.setup_ip))





if __name__ == "__main__":
	conditon = ''
	i=0
    #for i in range(1,len(sys.argv)-1):
     #   conditon=conditon+sys.argv[i]+" and "
    #conditon = conditon + sys.argv[i+1]
	
	arg1 = sys.argv
	print json.dumps(arg1)
	#x = "manufacturer='HP'"
	
	#HardwareInventory(arg1[5])
	#HardwareInventory(arg1[1])
	#HardwareInventory('')
	
#	sting = "manufacturer='HP' and cores="+str(24)
#   int(sys.argv[1])
#   HardwareInventory(conditon)
