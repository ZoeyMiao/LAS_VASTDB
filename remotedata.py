###########################################################
# lasdata.py
#
# load movement and communication data csv files to database
# @ author: Zoey Sun
# @ last update  : April 12 2018
###########################################################
import os
import datetime
import time
import csv
import mysql.connector

 # get list of csv file and their path
comm_list = [filename for filename in os.listdir("data") if filename.startswith("comm-")]
mvmt_list = [filename for filename in os.listdir("data") if filename.startswith("park-")]
print(comm_list)
print(mvmt_list)

# connect to database
# connect to database
lasdb = mysql.connector.connect(
    #host='localhost',
    #host = 'scidb.smith.edu',
    user='hcvlab',
    passwd='J0rdansLab',
    db='hcvlab_vast')
    cursor = mydb.cursor()

# create tables
sql = """CREATE TABLE IF NOT EXISTS MOVEMENT(
         TS  datetime NOT NULL,
         ID  INT(20),
         ACTIVITY CHAR(20),
         XCOR INT(10),
         YCOR INT(10) )"""

cursor.execute(sql)
sql2 = """CREATE TABLE IF NOT EXISTS COMMUNICATION(
         TS  datetime NOT NULL,
         SENDER  INT(20),
         RECEIVER INT(20),
         LOC CHAR(20)
         )"""
cursor.execute(sql2)

# =========================
# load info from csv files
# =========================

for mvmt_file in mvmt_list:
    with open('data/'+mvmt_file) as csvfile:
      csv_data = csv.reader(csvfile,delimiter=',')
      # skip first line
      next(csv_data)
      for row in csv_data:
          #print(row)
          if len(row)<4:
            continue
          # parse datetime, id, and x,y coordinate
          curtime = datetime.datetime.strptime(row[0],'%Y-%m-%d %H:%M:%S')
          curid = int(row[1])
          curx = int(row[3])
          cury = int(row[4])
          insert_sql = "INSERT INTO MOVEMENT(TS, ID, ACTIVITY,XCOR,YCOR ) VALUES(%s,%s,%s,%s,%s)"
          cursor.execute(insert_sql,(curtime,curid,row[2],curx,cury))

# =========================
# load info from csv files
# =========================
for comm_file in comm_list:
    with open('data/'+comm_file) as csvfile:
      csv_data = csv.reader(csvfile,delimiter=',')
      # skip first line
      next(csv_data)
      for row in csv_data:
          print(row)
          # if not complete line, skip it
          if len(row)<3:
            continue
          if row[1] =='external':
             row[1] = '-1'
          if row[2] =='external':
             row[2] = '-1'
          insert_sql2 = "INSERT INTO communication(TS, sender, receiver,loc )VALUES(%s, %s, %s,%s)"
          cursor.execute(insert_sql2,  (row[0],row[1],row[2],row[3]))

# #close the connection to the database.
lasdb.commit()
cursor.close()
print("Database Creation Done")
