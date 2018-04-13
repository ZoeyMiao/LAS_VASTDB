###########################################################
# lasdata.py
# 
# load movement and communication data csv files to database
# @ author: Zoey Sun
# @ data  : April 04 2018
########################################################### 
import os 
import csv
import mysql.connector
#import MySQLdb

 
 # get list of csv file and their path
comm_list = [filename for filename in os.listdir("data") if filename.startswith("comm-")]
mvmt_list = [filename for filename in os.listdir("data") if filename.startswith("park-")]
print(comm_list)
print(mvmt_list)

# connect to database
lasdb = mysql.connector.connect(host='localhost',
    user='hcvlab',
    passwd='J0rdansLab',
    db='hcvlab_vast')
cursor = mydb.cursor()

# create tables
sql1 = "create table IF NOT EXISTS movement (timepoint timestamp,id int(20),activity varchar(10),xcor int(10),ycor int(10));"
cursor.execute(sql1)
sql2 = "create table IF NOT EXISTS communication (timepoint timestamp,sender int(20),receiver int(20),loc varchar(20));"
cursor.execute(sql2)



# load info from csv files
for mvmt_file in mvmt_list:
    csv_data = csv.reader('data/'+mvmt_file)
    for row in csv_data:
        cursor.execute('INSERT INTO movement(timepoint, \
              id, activity,xcor,ycor )' \
              'VALUES("%s", "%s", "%s")', 
              row)

# load info from csv files
for comm_file in comm_list:
    csv_data = csv.reader('data/'+comm_file)
    for row in csv_data:
        cursor.execute('INSERT INTO movement(timepoint, \
              sender, receiver,loc )' \
              'VALUES("%s", "%s", "%s")', 
              row)
# #close the connection to the database.
lasdb.commit()
cursor.close()
print("Database Creation Done")



