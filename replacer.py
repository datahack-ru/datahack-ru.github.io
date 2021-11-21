import os
for root, subdirs, files in os.walk(os.getcwd()):
    for f in files:
        if f.endswith('.scss'):
            fullname=os.path.join(root, f)
            with open(fullname,'r') as r:
                text = r.read()
                text=text.replace('../../../public/images','../../public/images')
            with open(fullname,'w') as w:
                w.write(text)

