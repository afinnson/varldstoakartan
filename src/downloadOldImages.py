import requests
import numpy as np
import sys
from devKey import DEVELOPER_KEY
from generatePinData import getSheetsData

SPREADSHEET_ID = '1T1AFJ1kQPjp2BAxSrQyyr78ZogArOz6Q3IgqhNF4drI'
RANGE_NAME = 'NewFormat!A1:G'
OUTPUT_ROOT = r"C:\Users\anton\Documents\TUG\Toilet images"
FILE_EXTENSION = ".jpg"

def imageToFile(url, filePath):
    response = requests.get(url)

    with open(filePath, 'wb') as f:
        f.write(response.content)

def allImagesToFiles(sheetsData):
    fieldNames = sheetsData[0]
    sheetsData = sheetsData[1:]
    keyIndex = fieldNames.index('Code')
    urlIndex = fieldNames.index('ImageSource')

    # check that keys are unique
    keys = list(np.array(sheetsData)[:, keyIndex])
    assert len(keys) == len(set(keys)), "duplicates keys detected"

    numRows = len(sheetsData)
    for rowInd, row in enumerate(sheetsData):
        sys.stdout.write("Downloading image: {} / {} \r".format(rowInd+1, numRows))
        sys.stdout.flush()
        url = row[urlIndex]
        if str(url) != "0":
            fileName = row[keyIndex]
            imageToFile(url, OUTPUT_ROOT + "\\" + fileName + FILE_EXTENSION)

def main():
    sheetsData = getSheetsData(SPREADSHEET_ID, RANGE_NAME, DEVELOPER_KEY)
    
    allImagesToFiles(sheetsData)

if __name__ == '__main__':
    main()