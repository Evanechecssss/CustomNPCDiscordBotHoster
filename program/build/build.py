import os
import zipfile

print("START BUILDING")

def BUILD(sourse, target):
    def zip(path, ziph):
        for root, dirs, files in os.walk(path):
            for file in files:
                ziph.write(os.path.join(root, file), 
                        os.path.relpath(os.path.join(root, file), 
                                        os.path.join(path, '..')))
    zipf = zipfile.ZipFile(target, 'w', zipfile.ZIP_DEFLATED)
    zip(sourse, zipf)
    zipf.close()

BUILD("program\src\\bot",'program\\build\\builded\\build.zip')   
BUILD("program\src\\bot","testToSend.zip")   

print("END BUILDING")

