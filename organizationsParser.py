import xml.etree.ElementTree as DataTree

tree = DataTree.parse('organizations.xml')
root = tree.getroot()
print(root)

def getAttributeText(n, s):
        checkattribute= n.find(s)
        attributetext = 'Not Specified.' if checkattribute is None else checkattribute.text
        return attributetext

def getAllElements(m, s1, s2):
     results = []
     for s1 in m.iter(s1):
        for x in s1.findall(s2):
            attribute = getAttributeText(x, 'name')
            results.append(attribute)
     return results

for i in root.findall('organization'):
    name = getAttributeText(i, 'name')
    mission = getAttributeText(i, 'mission')
    logo_url = getAttributeText(i, 'logoUrl')
    url = getAttributeText(i, 'url')
    countries = getAttributeText(i, 'countries')
    all_countries = getAllElements(i, 'countries', 'country')
    themes = getAttributeText(i, 'themes')
    all_themes = getAllElements(i, 'themes', 'theme')

   
    print('name: ', name, '\n', 'mission:', mission, '\n', 
    'logo_url: ', logo_url, '\n', 'url: ', url, '\n', 'countries: ', all_countries, '\n',
    'themes: ', all_themes, '\n', '\n')


