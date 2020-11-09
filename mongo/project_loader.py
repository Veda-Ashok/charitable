#import pymongo
import xml.etree.ElementTree as DataTree
import os

# env = os.environ["MONGODB_PY_URI"]
tree = DataTree.parse('projects.xml')
root = tree.getroot()

# client =  pymongo.MongoClient(env)

# db = client["charitable"]

# activities_collection = db["activities"]

def getAttributeText(n, s):
    checkattribute = n.find(s)
    attributetext = 'Not Specified.' if checkattribute is None else checkattribute.text
    return attributetext

# def getAllElements(m, s1, s2, s3):
#      results = []
#      for s1 in m.iter(s1):
#         for x in s1.findall(s2):
#             attribute = getAttributeText(x, s3)
#             results.append(attribute)
#      return results

def getAllElements(m, s1, s2, s3):
    results = []
    for s1 in m.iter(s1):
        for x in s1.findall(s2):
            #element_id = getAttributeText(x, s3)
            attribute = getAttributeText(x, s3)
            results.append(attribute)
    return results

def getAllDonationOptions(m, s1, s2):
     results = []
     for s1 in m.iter(s1):
        for x in s1.findall(s2):
            amount = getAttributeText(x, 'amount')
            amount_description = getAttributeText(x, 'description')
            results.append((amount, amount_description))
     return results

def getOrganizationAttributes(m, s1, s2):
     results = []
     for s1 in m.iter(s1):
        attribute = getAttributeText(s1, s2)
        results.append(attribute)
     return results

super_duper_all_countries = set()
super_duper_all_themes = set()

for i in root.findall('project'):
    gg_activity_id = getAttributeText(i, 'id')
    #is_active = getAttributeText(i, 'active')
    description = getAttributeText(i, 'activities')
    # additional_documentation = getAttributeText(i, 'additionalDocumentation')
    date_approved = getAttributeText(i, 'approvedDate')
    contact_name = getAttributeText(i, 'contactName')
    contact_title = getAttributeText(i, 'contactTitle')
    contact_url = getAttributeText(i, 'contactUrl')
    contact_street_address = getAttributeText(i, 'contactAddress')
    contact_address_additional_info = getAttributeText(i, 'contactAddress2')
    contact_address_city = getAttributeText(i, 'contactCity')
    contact_address_country = getAttributeText(i, 'contactCountry')
    contact_address_postal_code = getAttributeText(i, 'contactPostal')
    contact_address_state = getAttributeText(i, 'contactState')
    #countries = getAttributeText(i, 'countries')
    country = getAttributeText(i, 'country')
    # all_countries = getAllElements(i, 'countries', 'country', 'iso3166CountryCode', 'name')
    donation_options = getAttributeText(i, 'dontationOptions')
    all_donation_options = getAllDonationOptions(i, 'donationOptions', 'donationOption')
    # current_funding = getAttributeText(i, 'funding')
    goal_funding = getAttributeText(i, 'goal')
    purpose = getAttributeText(i, 'need')
    progress_report_link = getAttributeText(i, 'progressReportLink')
    project_link = getAttributeText(i, 'projectLink')
    region = getAttributeText(i, 'region')
    status = getAttributeText(i, 'status')
    summary = getAttributeText(i, 'summary')
    organization = getAttributeText(i, 'organization')
    gg_organization_id = getOrganizationAttributes(i, 'organization', 'id')
    project_theme = getAttributeText(i, 'themeName')
    impact = getAttributeText(i, 'longTermImpact')
    title = getAttributeText(i, 'title')
    image = getAllElements(i, 'image id="0"', 'imagelink size="large"', 'url')
    
    # activity_obj = {
    #     'gg_activity_id': gg_activity_id,
    #     'purpose: ': purpose,
    #     'description: ': description,
    #     'contact_name': contact_name,
    #     'contact_title': contact_title,
    #     'contact_url': contact_url,
    #     'contact_street_address': contact_street_address,
    #     'contact_address_additional_info': contact_address_additional_info,
    #     'contact_address_city': contact_address_city,
    #     'contact_address_country': contact_address_country,
    #     'contact_address_postal_code': contact_address_postal_code,
    #     'contact_address_state': contact_address_state,
    #     'date_approved': date_approved,
    #     'country': country,
    #     'donation_options: ': all_donation_options,
    #     'goal_funding': goal_funding,
    #     'progress_report_link': progress_report_link,
    #     'project_link': project_link,
    #     'region': region,
    #     'status': status,
    #     'summary': summary,
    #     'gg_organization_id': gg_organization_id,
    #     'theme': theme,
    #     'impact':impact,
    # }
    #if activity_obj[country] != "Not Specified.":
    # activities_collection.insert_one(activity_obj)

    # print('id: ', project_id, '\n',
    # 'active: ', is_active, '\n',
    # 'purpose: ', purpose, '\n',
    # 'description: ', description, '\n',
    # 'additional documents: ', additional_documentation, '\n',
    # 'date approved: ', date_approved, '\n',
    # 'countries: ', all_countries, '\n',
    # 'donation options: ', all_donation_options, '\n',
    # 'funding goal: ', goal_funding, '\n',
    # 'current funding: ', current_funding, '\n'
    # )

    # print('gg_org_id: ', gg_organization_id, '\n', 'title: ', title, '\n', 'proj_theme: ', project_theme, '\n',  
    # 'impact: ', impact, '\n',
    # 'countries: ', all_countries, '\n',
    # 'image_url: ' , image, '\n')
    print(all_donation_options, '\n')