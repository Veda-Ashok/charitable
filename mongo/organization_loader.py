import pymongo
import xml.etree.ElementTree as DataTree
import os

env = os.environ.get('MONGODB_PY_URI')
tree = DataTree.parse('organizations.xml')
root = tree.getroot()

client =  pymongo.MongoClient(env)

db = client["charitable"]

organization_collection = db["organizations"]

def getAttributeText(n, s):
    checkattribute = n.find(s)
    attributetext = 'Not Specified.' if checkattribute is None else checkattribute.text
    return attributetext

def getAllElements(m, s1, s2, s3):
    results = []
    for s1 in m.iter(s1):
        for x in s1.findall(s2):
            attribute = getAttributeText(x, s3)
            results.append(attribute)
    return results


for i in root.findall('organization'):
    gg_id = getAttributeText(i, 'id')
    name = getAttributeText(i, 'name')
    mission = getAttributeText(i, 'mission')
    logo_url = getAttributeText(i, 'logoUrl')
    url = getAttributeText(i, 'url')
    countries = getAttributeText(i, 'countries')
    all_countries = getAllElements(
        i, 'countries', 'country', 'name')
    themes = getAttributeText(i, 'themes')
    all_themes = getAllElements(i, 'themes', 'theme', 'name')

    organization_obj = {
        'name': name,
        'mission': mission,
        'logo_url': logo_url,
        'url': url,
        'gg_id': gg_id,
        'countries': all_countries,
        'themes': all_themes
    }
    organization_collection.insert_one(organization_obj)
    print(f'Organization “{organization_obj["name"]}” ({organization_obj["url"]}) added with ID {organization_obj["gg_id"]}.')
  
#     # COUNTRY ROAAAAAAAAAADS, TAKE ME HOOOOOOOOOOOOME TO THE PLAAAAAAACE, I BELOOOOOOOOOOOOONG
#     # WEST VIRGINIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
#     # MOUNTAIN MOMMMMAAAAAAAAAAAAAAAAAA
#     # TAKE ME HOOOOOOOOOME
#     # COUNTRY ROADS
