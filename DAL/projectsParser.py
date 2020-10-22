import xml.etree.ElementTree as DataTree



tree = DataTree.parse('projects.xml')
print('hi')
root = tree.getroot()

print(root)

def getAttributeText(n, s):
        checkattribute = n.find(s)
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

def getOrganiation(m, s1, s2):
    for s1 in m.iter(s1):
        organization_id = getAttributeText(s1, s2)


super_duper_all_countries = set()
super_duper_all_themes = set()

for i in root.findall('project'):
    # project_id = getAttributeText(i, 'id')
    # is_active = getAttributeText(i, 'active')
    # description = getAttributeText(i, 'activities')
    # additional_documentation = getAttributeText(i, 'additionalDocumentation')
    # date_approved = getAttributeText(i, 'approvedDate')
    # donation_options = getAttributeText(i, 'donationOptions')
    # all_donation_options = getAllElements(i, 'donationOptions', 'donationOption', 'amount', 'description')
    # current_funding = getAttributeText(i, 'funding')
    # goal_funding = getAttributeText(i, 'goal')
    # numberOfDonations = getAttributeText(i, 'numberOfDonations')
    # purpose = getAttributeText(i, 'need')
    org = getOrganiation(i, 'organization', 'id')
    print(org)
    # if(i.find('organization')):
    #     print('it exists')
    #     if(i.get('organization').find('activeProjects')):
    #         print('yes')
    # organization = getAttributeText(i, i.get('organization').find('id').text)
    # organization_id= getAllElements(i, 'organization', 'id' )
    # themes = getAttributeText(i, 'themes')
    # all_themes = getAllElements(i, 'themes', 'theme', 'id')
    # impact = getAttributeText(i, 'longTermImpact')
    # progressLink = getAttributeText(i, 'progressReportLink')
    # projectLink = getAttributeText(i, 'projectLink')
    # region = getAttributeText(i, 'region')
    # status = getAttributeText(i, 'status')
    # summary = getAttributeText(i, 'summary')


    #contact info
    # contact_name = getAttributeText(i, 'contactName')
    # contact_title = getAttributeText(i, 'contactTitle')
    # contact_url = getAttributeText(i, 'contactUrl')
    # contact_street_address = getAttributeText(i, 'contactAddress')
    # contact_address_additional_info = getAttributeText(i, 'contactAddress2')
    # contact_address_city = getAttributeText(i, 'contactCity')
    # contact_address_country = getAttributeText(i, 'contactCountry')
    # contact_address_postal_code = getAttributeText(i, 'contactPostal')
    # contact_address_state = getAttributeText(i, 'contactState')
    # countries = getAttributeText(i, 'countries')
    # all_countries = getAllElements(i, 'countries', 'country')
    

    # print(organization)
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