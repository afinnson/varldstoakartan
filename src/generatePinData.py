from __future__ import print_function
from googleapiclient.discovery import build
from devKey import DEVELOPER_KEY

SPREADSHEET_ID = '1T1AFJ1kQPjp2BAxSrQyyr78ZogArOz6Q3IgqhNF4drI'
# RANGE_NAME = 'Blad1!A2:E'
RANGE_NAME = 'NewFormat!A1:G'
OUTPUT_FILE = 'pin_data.js'
URL_BASE = r'https://irp.cdn-website.com/0aecca97/dms3rep/multi/'
FILE_EXTENSION = ".jpg"

TRANSLATIONS = {
    "Latitude": "lat",
    "Longitude" : "lng",
    "ImageSource": "img_href",
    "Code": "name"
}

def rowToString(row, fieldNames, urlFromKey=False):
    assert len(row) == len(fieldNames), "{} != {}".format(len(row), len(fieldNames))

    keyIndex = fieldNames.index('Code')
    urlIndex = fieldNames.index('ImageSource')

    out = "\t\t{\n"
    for i, v in enumerate(row):
        try:
            fieldName = TRANSLATIONS[fieldNames[i]]
            print(fieldName)
        except KeyError:
            continue
        if i == urlIndex and urlFromKey and v != '0':
            v = URL_BASE + row[keyIndex].replace(" ", "+") + FILE_EXTENSION
        out += "\t\t\t" + fieldName + ": '" + v + "',\n"
    out += "\t\t},\n"

    return out

def getSheetsData(spreadsheetId, rangeName, developerKey):
    service = build('sheets', 'v4', developerKey=developerKey)

    # Call the Sheets API
    sheet = service.spreadsheets()
    result = sheet.values().get(spreadsheetId=spreadsheetId,
                                range=rangeName).execute()
    values = result.get('values', [])

    if not values:
        print('No data found.')
        raise Exception('No data found.')

    return values

def writePinDataToFile(sheetsData, fileName):
    fieldNames = sheetsData[0]
    sheetsData = sheetsData[1:] # remove header

    outStr = "export const pinData = [\n"
    for row in sheetsData:
        outStr += rowToString(row, fieldNames, urlFromKey=True)
    outStr += "\t];"

    # print(outStr)
    with open(fileName, "w") as text_file:
        text_file.write(outStr)

def main():
    sheetsData = getSheetsData(
        spreadsheetId=SPREADSHEET_ID,
        rangeName=RANGE_NAME,
        developerKey=DEVELOPER_KEY)    

    writePinDataToFile(sheetsData, fileName=OUTPUT_FILE)

if __name__ == '__main__':
    main()