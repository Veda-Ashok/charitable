import xml.etree.ElementTree as DataTree
from datasets_dal import insert_organization
from datasets_dal import insert_country
from datasets_dal import insert_theme
from datasets_dal import insert_organization_theme
from datasets_dal import insert_organization_country


tree = DataTree.parse('organizations.xml')
root = tree.getroot()
print(root)

def getAttributeText(n, s):
        checkattribute= n.find(s)
        attributetext = 'Not Specified.' if checkattribute is None else checkattribute.text
        return attributetext

def getAllElements(m, s1, s2, s3, s4):
     results = []
     for s1 in m.iter(s1):
        for x in s1.findall(s2):
            element_id = getAttributeText(x, s3)
            attribute = getAttributeText(x, s4)
            results.append((element_id, attribute))
     return results

super_duper_all_countries = set()
super_duper_all_themes = set()

for i in root.findall('organization'):
    gg_id = getAttributeText(i, 'id')
    name = getAttributeText(i, 'name')
    mission = getAttributeText(i, 'mission')
    logo_url = getAttributeText(i, 'logoUrl')
    url = getAttributeText(i, 'url')
    countries = getAttributeText(i, 'countries')
    all_countries = getAllElements(i, 'countries', 'country', 'iso3166CountryCode', 'name')
    themes = getAttributeText(i, 'themes')
    all_themes = getAllElements(i, 'themes', 'theme', 'id', 'name')

    # print('gg_organization_id: ', gg_organization_id, '\n',
    # 'name: ', name, '\n',
    # 'mission: ', mission, '\n',
    # 'logo_url: ', logo_url, '\n',
    # 'url: ', url, '\n',
    # 'all_countries: ', all_countries, '\n',
    # 'all_themes: ', all_themes, '\n')
    
    organization = insert_organization(name, mission, logo_url, url, gg_id)
    
    print(f'Organization “{organization.name}” ({organization.url}) added with ID {organization.id}.')
    
    for country in all_countries:
        if country not in super_duper_all_countries:
            inserted_country = insert_country(country[0], country[1])
            print(f'Country {inserted_country.name} added with country code {inserted_country.country_code}.')
            super_duper_all_countries.add(country)
        organization_country = insert_organization_country(organization.id, country[0])
        print(f'Organization Country “{organization_country.organization_id}”, Country Code "{organization_country.country_code}"')
    
    for theme in all_themes:
        if theme not in super_duper_all_themes:
            inserted_theme = insert_theme(theme[0], theme[1])
            print(f'Theme {inserted_theme.name} added with id {inserted_theme.id}.')
            super_duper_all_themes.add(theme)
        organization_theme = insert_organization_theme(organization.id, theme[0])
        print(f'Organization Theme “{organization_theme.organization_id}”, Theme ID "{organization_theme.theme_id}"')
        


    # COUNTRY ROAAAAAAAAAADS, TAKE ME HOOOOOOOOOOOOME TO THE PLAAAAAAACE, I BELOOOOOOOOOOOOONG
    # WEST VIRGINIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    # MOUNTAIN MOMMMMAAAAAAAAAAAAAAAAAA
    # TAKE ME HOOOOOOOOOME
    # COUNTRY ROADS



