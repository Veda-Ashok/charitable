import xml.etree.ElementTree as DataTree

tree = DataTree.parse('organizations.xml')
root = tree.getroot()
print(root)

def getAttributeText(n, s):
        checkattribute= n.find(s)
        attributetext = 'Not Specified.' if checkattribute is None else checkattribute.text
        return attributetext

for i in root.findall('organization'):
    name = getAttributeText(i, 'name')
    mission = getAttributeText(i, 'mission')
    logoUrl = getAttributeText(i, 'logoUrl')
    country = getAttributeText(i, 'country')
    themes = getAttributeText(i, 'themes')
   
    print('name: ', name, '\n', 'mission:', mission, '\n', 
    'logoUrl: ', logoUrl, '\n', 'country: ', country, '\n',
    'themes: ', themes, '\n', '\n')


    
   