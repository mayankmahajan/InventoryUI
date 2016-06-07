import sqlite_handler
import sqlite3
import json
import time
import sys
import re

'''
Schema structures:

CREATE TABLE hardware(serial_number text not null, manufacturer text not null, product_name text not null, management_ip text not null, profile_name text, cores int not null, ram text not null, hard_disk text not null, primary_owner text not null, secondary_owner text, tertiary_owner text, project_id int not null, base_os_ip text, base_os_username text, base_os_password text, vm text not null, setup_name text, created_by text not null, comments text, current_version text not null, deleted text not null, creation_time text not null);

CREATE TABLE projects(project_id int primary key not null, project_name text not null);

CREATE TABLE setups(serial_number text not null, project_id int not null, setup_ip text not null, cores int not null, ram text not null, role text not null, vip text, storage_size text, storage_ip text, storage_initiator_name text, storage_target_ip text, current_version text not null, deleted text not null, created_by text not null, creation_time text not null, comments text);

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


def create_select_arguments(args):
    obj = CommonVariables()
    condition = []
    for arg in args:
        arg_column = arg.split('=')[0]
        arg_value = arg.split('=')[1]
        if arg_value != "":
            if arg_column == "project_id":
                arg_column = "hardware.%s" % arg_column
                arg_value = obj.get_project_id(arg_value)
                condition.append("%s=%s" % (arg_column, arg_value))
            else:
                condition.append("%s like %s" % (arg_column, re.sub("^'", "'%", re.sub("'$", "%'", arg_value))))
    condition = " and ".join(condition)
    return condition


def create_insert_arguments(args, columns):
    obj = CommonVariables()
    condition = []
    for column in columns.split(','):
        for arg in args:
            if column in arg:
                arg_value = arg.split('=')[1]
                if column == "project_id":
                    arg_value = obj.get_project_id(arg_value)
                    if arg_value == "''":
                        sys.exit("Wrong project name.")
                condition.append("%s" % arg_value)
                break
    condition = ",".join(condition)
    return condition


def get_param(args, search_param):
    for arg in args:
        if search_param in arg:
            return arg.split('=')[1]
        else:
            return ""


class CommonVariables:
    def __init__(self):
        self.db_name = "inventory_management.db"
        self.table_setups = "setups"
        self.table_hardware = "hardware"
        self.table_projects = "projects"
        self.sqlite_object = sqlite_handler.CreateSQLiteConnection(self.db_name)
        self.current_time = time.strftime("%Y-%m-%d %H:%M:%S", time.gmtime())

    def get_project_id(self, project_name):
        try:
            return "'%s'" % self.sqlite_object.execute_select_query("select project_id from %s where project_name=%s" % (self.table_projects, project_name))[0][0]
        except IndexError:
            return "''"


class HardwareInventory(CommonVariables):
    def __init__(self):
        CommonVariables.__init__(self)

    def get_hardware_details(self, args):
        condition = create_select_arguments(args)
        selected_columns = "serial_number,manufacturer,product_name,management_ip,profile_name,cores,ram,hard_disk,primary_owner,secondary_owner,tertiary_owner,project_name,base_os_ip,base_os_username,base_os_password,setup_name,vm,comments"
        selected_columns_list = get_selected_column_list(selected_columns)
        if condition == "":
            result = self.sqlite_object.execute_select_query("select %s from %s,%s where %s.project_id=%s.project_id and deleted='n' and current_version='y'" % (selected_columns, self.table_hardware, self.table_projects, self.table_hardware, self.table_projects))
        else:
            result = self.sqlite_object.execute_select_query("select %s from %s,%s where %s.project_id=%s.project_id and deleted='n' and current_version='y' and %s" % (selected_columns, self.table_hardware, self.table_projects, self.table_hardware, self.table_projects, condition))
        return create_result_map(selected_columns_list, result)

    def add_new_hardware(self, args):
        columns = self.sqlite_object.get_column_names(self.table_hardware)
        #print columns
        values = create_insert_arguments(args, columns)
        values += ",'y','n','%s'" % self.current_time
        if len(columns.split(',')) == len(values.split(',')):
            self.sqlite_object.execute_insert_query("insert into %s (%s) values (%s)" % (self.table_hardware, columns, values))
            self.sqlite_object.commit_transaction()
            return "Success"
        else:
            return "Please check the arguments."

    def update_hardware_details(self, args):
        serial_number = get_param(args, "serial_number")
        self.sqlite_object.execute_update_query("update %s set current_version='n' where serial_number=%s" % (self.table_hardware, serial_number))
        self.sqlite_object.commit_transaction()
        return self.add_new_hardware(args)

    def delete_hardware(self, args):
        serial_number = get_param(args, "serial_number")
        self.sqlite_object.execute_update_query("update %s set current_version='n',deleted='y' where serial_number=%s" % (self.table_hardware, serial_number))
        self.sqlite_object.commit_transaction()
        return "Success"


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
    args = sys.argv[2:]
    hwi = HardwareInventory()

    try:
        if sys.argv[1] == "api='select'":
            print json.dumps(hwi.get_hardware_details(args))
        elif sys.argv[1] == "api='update'":
            #print json.dumps((args))
            print json.dumps(hwi.update_hardware_details(args))
        elif sys.argv[1] == "api='insert'":
            #print args
            print json.dumps(hwi.add_new_hardware(args))
        elif sys.argv[1] == "api='delete'":
            print json.dumps(hwi.delete_hardware(args[0:1]))
    except sqlite3.Error as er:
        print json.dumps(er.message)