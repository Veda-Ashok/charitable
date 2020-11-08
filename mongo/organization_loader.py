import pymongo
import xml.etree.ElementTree as DataTree
import os

env = os.environ["MONGODB_PY_URI"]

tree = DataTree.parse('organizations.xml')
root = tree.getroot()

db = client["charitable"]

organization_collection = db["organization"]


def getAttributeText(n, s):
    checkattribute = n.find(s)
    attributetext = 'Not Specified.' if checkattribute is None else checkattribute.text
    return attributetext


def getAllElements(m, s1, s2, s3, s4):
    results = []
    for s1 in m.iter(s1):
        for x in s1.findall(s2):
            #element_id = getAttributeText(x, s3)
            attribute = getAttributeText(x, s4)
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
        i, 'countries', 'country', 'iso3166CountryCode', 'name')
    themes = getAttributeText(i, 'themes')
    all_themes = getAllElements(i, 'themes', 'theme', 'id', 'name')


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
    
    for country in all_countries:
        if country not in super_duper_all_countries:
            country_obj = {
                "country_code":country[0],
                "name": country[1]
            }
            country_collection.insert_one(country_obj)
            print(f'Country {country_obj["name"]} added with country code {country_obj["country_code"]}.')
            super_duper_all_countries.add(country)
        organization_country_obj ={
            "organization_id":gg_id,
            "country_code":country[0]
        }
        organization_country_collection.insert_one(organization_country_obj)
        print(f'Organization Country “{organization_country_obj["organization_id"]}”, Country Code "{organization_country_obj["country_code"]}"')
    
    # for theme in all_themes:
    #     if theme not in super_duper_all_themes:
    #         theme_obj={
    #             "id":theme[0],
    #             "name":theme[1]
    #         }
    #         theme_collection.insert_one(theme_obj)
    #         print(f'Theme {theme_obj["name"]} added with id {theme_obj["id"]}.')
    #         super_duper_all_themes.add(theme)
    #     organization_theme_obj={
    #         "organization_id":gg_id,
    #         "theme_id":theme[0]
    #     }
    #     organization_theme_collection.insert_one(organization_theme_obj)
    #     print(f'Organization Theme “{organization_theme_obj["organization_id"]}”, Theme ID "{organization_theme_obj["theme_id"]}"')
        
    # COUNTRY ROAAAAAAAAAADS, TAKE ME HOOOOOOOOOOOOME TO THE PLAAAAAAACE, I BELOOOOOOOOOOOOONG
    # WEST VIRGINIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    # MOUNTAIN MOMMMMAAAAAAAAAAAAAAAAAA
    # TAKE ME HOOOOOOOOOME
    # COUNTRY ROADS



# import xml.etree.ElementTree as DataTree
# import os
# import json

# # python3 organization_loader.py | mongoimport --db charitable --collection organization --drop --host=localhost

# tree = DataTree.parse('organizations.xml')
# root = tree.getroot()


# def getAttributeText(n, s):
#     checkattribute = n.find(s)
#     attributetext = 'Not Specified.' if checkattribute is None else checkattribute.text
#     return attributetext


# def getAllElements(m, s1, s2, s3, s4):
#     results = []
#     for s1 in m.iter(s1):
#         for x in s1.findall(s2):
#             #element_id = getAttributeText(x, s3)
#             attribute = getAttributeText(x, s4)
#             results.append(attribute)
#     return results


# super_duper_all_countries = set()
# super_duper_all_themes = set()

# for i in root.findall('organization'):
#     gg_id = getAttributeText(i, 'id')
#     name = getAttributeText(i, 'name')
#     mission = getAttributeText(i, 'mission')
#     logo_url = getAttributeText(i, 'logoUrl')
#     url = getAttributeText(i, 'url')
#     countries = getAttributeText(i, 'countries')
#     all_countries = getAllElements(
#         i, 'countries', 'country', 'iso3166CountryCode', 'name')
#     themes = getAttributeText(i, 'themes')
#     all_themes = getAllElements(i, 'themes', 'theme', 'id', 'name')

#     # print('gg_organization_id: ', gg_organization_id, '\n',
#     # 'name: ', name, '\n',
#     # 'mission: ', mission, '\n',
#     # 'logo_url: ', logo_url, '\n',
#     # 'url: ', url, '\n',
#     # 'all_countries: ', all_countries, '\n',
#     # 'all_themes: ', all_themes, '\n')
#     # organization_obj = {
#     #     'name': name,
#     #     'mission': mission,
#     #     'logo_url': logo_url,
#     #     'url': url,
#     #     'gg_id': gg_id,
#     #     'countries': all_countries,
#     #     'themes': all_themes
#     # }
#     # print(
#     #     f'Organization “{organization_obj["name"]}” ({organization_obj["url"]}) added with ID {organization_obj["gg_id"]}.')

# # Helper function for sending movie updates.
#     # def print_organization(name, mission, logo_url, url, gg_id, countries, themes):
#     #     print(json.dumps({
#     #         'name': name,
#     #         'mission': mission,
#     #         'logo_url': logo_url,
#     #         'url': url,
#     #         'gg_id': gg_id,
#     #         'countries': all_countries,
#     #         'themes': all_themes
#     #     }))

#     # print_organization(name, mission, logo_url, url, gg_id, countries, themes)
#     # for country in all_countries:
#     #     if country not in super_duper_all_countries:
#     #         country_obj = {
#     #             "country_code":country[0],
#     #             "name": country[1]
#     #         }
#     #         country_collection.insert_one(country_obj)
#     #         print(f'Country {country_obj["name"]} added with country code {country_obj["country_code"]}.')
#     #         super_duper_all_countries.add(country)
#     #     organization_country_obj ={
#     #         "organization_id":gg_id,
#     #         "country_code":country[0]
#     #     }
#     #     organization_country_collection.insert_one(organization_country_obj)
#     #     print(f'Organization Country “{organization_country_obj["organization_id"]}”, Country Code "{organization_country_obj["country_code"]}"')

#     # for theme in all_themes:
#     #     if theme not in super_duper_all_themes:
#     #         theme_obj={
#     #             "id":theme[0],
#     #             "name":theme[1]
#     #         }
#     #         theme_collection.insert_one(theme_obj)
#     #         print(f'Theme {theme_obj["name"]} added with id {theme_obj["id"]}.')
#     #         super_duper_all_themes.add(theme)
#     #     organization_theme_obj={
#     #         "organization_id":gg_id,
#     #         "theme_id":theme[0]
#     #     }
#     #     organization_theme_collection.insert_one(organization_theme_obj)
#     #     print(f'Organization Theme “{organization_theme_obj["organization_id"]}”, Theme ID "{organization_theme_obj["theme_id"]}"')

#     # COUNTRY ROAAAAAAAAAADS, TAKE ME HOOOOOOOOOOOOME TO THE PLAAAAAAACE, I BELOOOOOOOOOOOOONG
#     # WEST VIRGINIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
#     # MOUNTAIN MOMMMMAAAAAAAAAAAAAAAAAA
#     # TAKE ME HOOOOOOOOOME
#     # COUNTRY ROADS
