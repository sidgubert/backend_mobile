import sqlite3
conn = sqlite3.connect('../db/sqlite.db', check_same_thread=False)

def make_dicts(cursor, row):
    return dict((cursor.description[idx][0], value)
                for idx, value in enumerate(row))

conn.row_factory = make_dicts