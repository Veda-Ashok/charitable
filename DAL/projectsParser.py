iimport xml.etree.ElementTree as DataTree

tree = DataTree.parse('projects.xml')
root = tree.getroot()
print(root)

def getAttributeText(n, s):
        checkattribute = n.find(s)
        attributetext = 'Not Specified.' if checkattribute is None else checkattribute.text
        return attributetext

def getAllElements(m, s1, s2):
     results = []
     for s1 in m.iter(s1):
        for x in s1.findall(s2):
            attribute = getAttributeText(x, 'name')
            results.append(attribute)
     return results

for i in root.findall('project'):
    project_id = getAttributeText(i, 'id')
    is_active = getAttributeText(i, 'active')
    description = getAttributeText(i, 'activities')
    additional_documentation = getAttributeText(i, 'additionalDocumentation')
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
    countries = getAttributeText(i, 'countries')
    all_countries = getAllElements(i, 'countries', 'country')
    donation_options = getAttributeText(i, 'dontationOptions')
    all_donation_options = getAllElements(i, 'donationOptions', 'donationOption')
    current_funding = getAttributeText(i, 'funding')
    goal_funding = getAttributeText(i, 'goal')
    purpose = getAttributeText(i, 'need')



    print('id: ', project_id, '\n',
    'active: ', is_active, '\n',
    'purpose: ', purpose, '\n',
    'description: ', description, '\n',
    'additional documents: ', additional_documentation, '\n',
    'date approved: ', date_approved, '\n',
    'countries: ', all_countries, '\n',
    'donation options: ', all_donation_options, '\n',
    'funding goal: ', goal_funding, '\n',
    'current funding: ', current_funding, '\n'
    )