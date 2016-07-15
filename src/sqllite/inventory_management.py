import sqlite_handler
import sqlite3
import json
import time
import sys
import re
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


'''
Schema structures:

CREATE TABLE hardware(serial_number text not null, manufacturer text not null, product_name text not null, management_ip text not null, profile_name text, cores int not null, ram text not null, hard_disk text not null, primary_owner text not null, secondary_owner text, tertiary_owner text, project_id int not null, base_os_ip text, base_os_username text, base_os_password text, vm text not null, setup_name text, created_by text not null, comments text, current_version text not null, deleted text not null, creation_time text not null);

CREATE TABLE projects(project_id int primary key not null, project_name text not null);

CREATE TABLE setups(serial_number text not null, project_id int not null, setup_ip text not null, cores int not null, ram text not null, hard_disk text not null, role text not null, vip text, storage_size text, storage_ip text, storage_initiator_name text, storage_target_ip text, comments text, created_by text not null, vm_id int, current_version text not null, deleted text not null, creation_time text not null);

CREATE TABLE users(user_email text primary key not null, user_name text not null, user_password text not null, group_name text not null, deleted text not null);
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
            if column == arg.split('=')[0]:
                arg_value = arg.split('=')[1]
                if column == "project_id":
                    arg_value = obj.get_project_id(arg_value)
                    if arg_value == "''":
                        return 1
                elif column == "vm_id":
                    if arg_value == "''":
                        arg_value = obj.get_next_vm_id(args)
                condition.append("%s" % arg_value)
                break
    condition = ",".join(condition)
    return condition


def get_param(args, search_param):
    for arg in args:
        if search_param in arg:
            return arg.split('=')[1]
    return "''"


class CommonVariables:
    def __init__(self):
        self.db_name = "inventory_management.db"
        self.table_setups = "setups"
        self.table_hardware = "hardware"
        self.table_projects = "projects"
        self.table_users = "users"
        self.smtp_server = "192.168.104.25"
        self.sqlite_object = sqlite_handler.CreateSQLiteConnection(self.db_name)
        self.current_time = time.strftime("%Y-%m-%d %H:%M:%S", time.gmtime())

    def get_project_id(self, project_name):
        try:
            return "'%s'" % self.sqlite_object.execute_select_query("select project_id from %s where project_name=%s" % (self.table_projects, project_name))[0][0]
        except IndexError:
            return "''"

    def get_project_name(self, project_id):
        try:
            return "'%s'" % self.sqlite_object.execute_select_query("select project_name from %s where project_id=%s" % (self.table_projects, project_id))[0][0]
        except IndexError:
            return "''"

    def get_next_vm_id(self, args):
        serial_number = get_param(args, "serial_number")
        try:
            vm_flag = self.sqlite_object.execute_select_query("select vm from %s where serial_number=%s" % (self.table_hardware, serial_number))[0][0]
        except IndexError:
            return "'0'"
        if vm_flag.lower() == "n":
            return "'0'"
        else:
            try:
                current_id = self.sqlite_object.execute_select_query("select max(vm_id) from %s where serial_number=%s" % (self.table_setups, serial_number))[0][0]
                if current_id == "" or current_id is None:
                    return "'1'"
                else:
                    return "'%s'" % (int(current_id) + 1)
            except IndexError:
                return "'1'"


    def get_project_list(self):
        selected_columns = "project_name"
        selected_columns_list = get_selected_column_list(selected_columns)
        result = self.sqlite_object.execute_select_query("select %s from %s order by project_name" % (selected_columns, self.table_projects))
        return create_result_map(selected_columns_list, result)

    def get_setup_name(self, project_name):
        project_id = self.get_project_id(project_name)
        selected_columns = "setup_name"
        selected_columns_list = get_selected_column_list(selected_columns)
        result = self.sqlite_object.execute_select_query("select distinct(%s) from %s where project_id=%s order by setup_name" % (selected_columns, self.table_hardware, project_id))
        return create_result_map(selected_columns_list, result)

    def send_mail(self, msg_from, msg_to, msg_subject, msg_contents):
        msg = MIMEMultipart()
        msg["From"] = msg_from
        msg["To"] = msg_to
        msg["Subject"] = msg_subject
        msg_body = MIMEText(msg_contents)
        msg.attach(msg_body)
        s = smtplib.SMTP(self.smtp_server)
        s.sendmail(msg["From"], msg["To"].split(','), msg.as_string())
        s.quit()


class UserManagement(CommonVariables):
    def __init__(self):
        CommonVariables.__init__(self)

    def validate_user(self, args):
        user_name = get_param(args, "user_name")
        password = get_param(args, "user_password")
        result = self.sqlite_object.execute_select_query("select * from %s where user_name=%s and user_password=%s and deleted='n'" % (self.table_users, user_name, password))
        if len(result) == 0:
            return "Wrong username/password."
        else:
            return user_name


class HardwareInventory(CommonVariables):
    def __init__(self):
        CommonVariables.__init__(self)

    def get_hardware_details(self, args):
        condition = create_select_arguments(args)
        selected_columns = "serial_number,manufacturer,product_name,management_ip,profile_name,cores,ram,hard_disk,primary_owner,secondary_owner,tertiary_owner,project_name,base_os_ip,base_os_username,base_os_password,setup_name,vm,comments"
        order_by_clause = "order by manufacturer,management_ip,profile_name"
        selected_columns_list = get_selected_column_list(selected_columns)
        if condition == "":
            result = self.sqlite_object.execute_select_query("select %s from %s,%s where %s.project_id=%s.project_id and deleted='n' and current_version='y' %s" % (selected_columns, self.table_hardware, self.table_projects, self.table_hardware, self.table_projects, order_by_clause))
        else:
            result = self.sqlite_object.execute_select_query("select %s from %s,%s where %s.project_id=%s.project_id and deleted='n' and current_version='y' and %s %s" % (selected_columns, self.table_hardware, self.table_projects, self.table_hardware, self.table_projects, condition, order_by_clause))
        return create_result_map(selected_columns_list, result)

    def add_new_hardware(self, args, columns):
        values = create_insert_arguments(args, columns)
        if values == 1:
            self.sqlite_object.rollback_transaction()
            return "Wrong project name."
        values += ",'y','n','%s'" % self.current_time
        if len(columns.split(',')) == len(values.split(',')):
            self.sqlite_object.execute_insert_query("insert into %s (%s) values (%s)" % (self.table_hardware, columns, values))
            self.sqlite_object.commit_transaction()
            recipients = []
            primary_owner = get_param(args, "primary_owner")
            if primary_owner != "''":
                recipients.append("%s@guavus.com" % primary_owner.replace("'", ""))
            secondary_owner = get_param(args, "secondary_owner")
            if secondary_owner != "''":
                recipients.append("%s@guavus.com" % secondary_owner.replace("'", ""))
            tertiary_owner = get_param(args, "tertiary_owner")
            if tertiary_owner != "''":
                recipients.append("%s@guavus.com" % tertiary_owner.replace("'", ""))
            created_by = get_param(args, "created_by")
            if created_by != "''":
                recipients.append("%s@guavus.com" % created_by.replace("'", ""))
            serial_number = get_param(args, "serial_number")
            comments = get_param(args, "comments")
            project_name = get_param(args, "project_id")
            recipients = ",".join(recipients)
            msg_contents = "\n".join(args)
            self.send_mail("amit.saxena@guavus.com", recipients, "Machine - Serial Number: %s, Project: %s, Comments: %s " % (serial_number, project_name, comments), msg_contents)
            return "Success"
        else:
            self.sqlite_object.rollback_transaction()
            return "Please check the arguments."

    def update_hardware_details(self, args):
        serial_number = get_param(args, "serial_number")
        columns = self.sqlite_object.get_column_names(self.table_hardware)
        self.sqlite_object.execute_update_query("update %s set current_version='n' where serial_number=%s" % (self.table_hardware, serial_number))
        return self.add_new_hardware(args, columns)

    def delete_hardware(self, args):
        serial_number = get_param(args, "serial_number")
        self.sqlite_object.execute_update_query("update %s set current_version='n',deleted='y' where serial_number=%s" % (self.table_hardware, serial_number))
        self.sqlite_object.commit_transaction()
        return "Success"


class ModifySetup(CommonVariables, HardwareInventory):
    def __init__(self):
        CommonVariables.__init__(self)
        HardwareInventory.__init__(self)

    def get_setup_details(self, args):
        condition = create_select_arguments(args)
        selected_columns = "serial_number,project_name,setup_ip,cores,ram,hard_disk,role,vip,storage_size,storage_ip,storage_initiator_name,storage_target_ip,comments,created_by,vm_id"
        order_by_clause = "order by vm_id"
        selected_columns_list = get_selected_column_list(selected_columns)
        if condition == "":
            result = self.sqlite_object.execute_select_query("select %s from %s,%s where %s.project_id=%s.project_id and deleted='n' and current_version='y' %s" % (selected_columns, self.table_setups, self.table_projects, self.table_setups, self.table_projects, order_by_clause))
        else:
            result = self.sqlite_object.execute_select_query("select %s from %s,%s where %s.project_id=%s.project_id and deleted='n' and current_version='y' and %s %s" % (selected_columns, self.table_setups, self.table_projects, self.table_setups, self.table_projects,condition, order_by_clause))
        return create_result_map(selected_columns_list, result)

    def add_setup_details(self, args, columns):
        values = create_insert_arguments(args, columns)
        if values == 1:
            self.sqlite_object.rollback_transaction()
            return "Wrong project name."
        values += ",'y','n','%s'" % self.current_time
        if len(columns.split(',')) == len(values.split(',')):
            self.sqlite_object.execute_insert_query("insert into %s (%s) values (%s)" % (self.table_setups, columns, values))
            self.sqlite_object.commit_transaction()
            return "Success"
        else:
            self.sqlite_object.rollback_transaction()
            return "Please check the arguments."

    def update_setup_details(self, args):
        serial_number = get_param(args, "serial_number")
        vm_id = get_param(args, "vm_id")
        columns = self.sqlite_object.get_column_names(self.table_setups)
        self.sqlite_object.execute_update_query("update %s set current_version='n' where serial_number=%s and vm_id=%s" % (self.table_setups, serial_number, vm_id))
        return self.add_setup_details(args, columns)

    def delete_setup(self, args):
        serial_number = get_param(args, "serial_number")
        vm_id = get_param(args, "vm_id")
        self.sqlite_object.execute_update_query("update %s set current_version='n',deleted='y' where serial_number=%s and vm_id=%s" % (self.table_setups, serial_number, vm_id))
        self.sqlite_object.commit_transaction()
        return "Success"


if __name__ == "__main__":
    api = sys.argv[1]
    try:
        args = sys.argv[2:]
    except IndexError:
        pass
    hwi = HardwareInventory()
    um = UserManagement()
    ms = ModifySetup()

    try:
        if api == "api='select_hardware'":
            print json.dumps(hwi.get_hardware_details(args))
        elif api == "api='update_hardware'":
            print json.dumps(hwi.update_hardware_details(args))
        elif api == "api='insert_hardware'":
            columns = hwi.sqlite_object.get_column_names(hwi.table_hardware)
            print json.dumps(hwi.add_new_hardware(args, columns))
        elif api == "api='delete_hardware'":
            print json.dumps(hwi.delete_hardware(args))
        elif api == "api='projects'":
            print json.dumps(hwi.get_project_list())
        elif api == "api='setup_name'":
            print json.dumps(hwi.get_setup_name(sys.argv[2].split('=')[1]))
        elif api == "api='validate_user'":
            print json.dumps(um.validate_user(args))
        elif api == "api='select_setup'":
            print json.dumps(ms.get_setup_details(args))
        elif api == "api='add_setup'":
            columns = ms.sqlite_object.get_column_names(ms.table_setups)
            print json.dumps(ms.add_setup_details(args, columns))
        elif api == "api='update_setup'":
            print json.dumps(ms.update_setup_details(args))
        elif api == "api='delete_setup'":
            print json.dumps(ms.delete_setup(args))
        else:
            print json.dumps("API failure")
    except sqlite3.Error as er:
        print json.dumps(er.message)

    hwi.sqlite_object.close_connection()