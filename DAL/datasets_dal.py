import os
from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String, Date, ForeignKey, Sequence, LargeBinary, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import select, func
from sqlalchemy.orm import sessionmaker, relationship

db = create_engine(os.environ['DB_URL'])
metadata = MetaData(db)
organization_table = Table('organization', metadata, autoload=True)
organization_theme_table = Table('organization_theme', metadata, autoload=True)
theme_table = Table('theme', metadata, autoload=True)
activity_theme = Table('activity_theme', metadata, autoload=True)
organization_country = Table('organization_country', metadata, autoload=True)
activity_country = Table('activity_country', metadata, autoload=True)
member_organization = Table('member_organization', metadata, autoload=True)
member_member = Table('member_member', metadata, autoload=True)
activity_table = Table('activity', metadata, autoload=True)
country_table = Table('country', metadata, autoload=True)
post_table = Table('post', metadata, autoload=True)
member_table = Table('member', metadata, autoload=True)

# For ORM-style implementations, we need to define a few things first.
ORM_Base = declarative_base()


class Organization(ORM_Base):
    __tablename__ = 'organization'
    id = Column(Integer, Sequence('organization_id_seq'), primary_key=True)
    name = Column(String)
    mission = Column(String)
    logo_url = Column(String)
    url = Column(String)
    gg_id = Column(Integer)

class Activity(ORM_Base):
    __tablename__ = 'activity'
    id = Column(Integer, primary_key=True)
    organization_id = Column(Integer, ForeignKey('organization.id'), primary_key=True) # ForeignKey takes table properties…
    street_address = Column(String)
    member_id = Column(Integer, ForeignKey('member.id'), primary_key=True) # ForeignKey takes table properties…
    description = Column(String)
    city = Column(String)
    url = Column(String)
    zipcode = Column(String)
    organization = relationship('Organization') # …but relationship takes the mapped class
    member = relationship('Member') # …but relationship takes the mapped class

class Country(ORM_Base):
    __tablename__ = 'country'
    country_code = Column(String, primary_key=True) #this is the id
    name = Column(String)

class OrganizationCountry(ORM_Base):
    __tablename__ = 'organization_country'
    organization_id = Column(Integer, ForeignKey('organization.id'), primary_key=True) 
    country_code = Column(Integer, ForeignKey('country.country_code'), primary_key=True)
    organization = relationship('Organization')
    country = relationship('Country')

class MemberOrganization(ORM_Base):
    __tablename__ = 'member_organization'
    member_id = Column(Integer, ForeignKey('member.id'), primary_key=True) 
    organization_id = Column(Integer, ForeignKey('organization.id'), primary_key=True)
    organization = relationship('Organization')
    member = relationship('Member')
    
class Member(ORM_Base):
    __tablename__ = 'member' 
    id = Column(Integer, Sequence('post_id_seq'), primary_key=True)
    member_name = Column(String)
    display_name = Column(String)
    profile_picture = Column(LargeBinary)
    banner_picture = Column(LargeBinary)
    bio = Column(String)

class MemberMember(ORM_Base):
    __tablename__ = 'member_member'
    # do we need two members here??? 
    member1_id = Column(Integer, ForeignKey('member.id'), primary_key=True)
    member2_id = Column(Integer, ForeignKey('member.id'), primary_key=True)
    friend_status = Column(Integer)
    # member1 = relationship('Member', primaryjoin = "member1_id == member.id")
    # member2 = relationship('Member', primaryjoin = "member2_id == member.id")
    
class Post(ORM_Base):
    __tablename__ = 'post'
    id = Column(Integer, Sequence('post_id_seq'), primary_key=True)
    member_id = Column(Integer, ForeignKey('member.id'), primary_key=True) 
    time = Column(DateTime)
    typed_content = Column(String)
    attached_image = Column(LargeBinary)
    organization_id = Column(Integer, ForeignKey('organization.id'), primary_key=True) 
    activity_id = Column(Integer, ForeignKey('activity.id'), primary_key=True)
    organization = relationship('Organization')
    activity = relationship('Activity')
    member = relationship('Member')
    
class Theme(ORM_Base):
    __tablename__ = 'theme'
    id = Column(String, primary_key=True)
    name = Column(String)
    
class ActivityTheme(ORM_Base):
    __tablename__ = 'activity_theme'
    activity_id = Column(Integer, ForeignKey('activity.id'), primary_key=True) 
    theme_id = Column(String, ForeignKey('theme.id'), primary_key=True) 
    activity = relationship('Activity')
    theme = relationship('Theme')

class ActivityCountry(ORM_Base):
    __tablename__ = 'activity_country'
    activity_id = Column(Integer, ForeignKey('activity.id'), primary_key=True) 
    country_code = Column(Integer, ForeignKey('country.country_code'), primary_key=True)
    activity = relationship('Activity')
    country = relationship('Country')
    
class OrganizationTheme(ORM_Base):
    __tablename__ = 'organization_theme'
    organization_id = Column(Integer, ForeignKey('organization.id'), primary_key=True)
    theme_id = Column(String, ForeignKey('theme.id'), primary_key=True)
    organization = relationship('Organization')
    theme = relationship('Theme')

# The notion of a Session is a multifaceted one whose usage and implementation may change depending on the type
# of application that is using this DAL (particularly, a standalone application vs. a web service). It is implemented
# here in the simplest possible way. Note that if this DAL is to be used in other contexts, code surrounding sessions
# may have to change.
#
# At a minimum, we follow the basic SQLAlchemy rule that sessions should be external to the functions that use them.
# Thus, we define current_session at this upper level, and not within each function.
Session = sessionmaker(bind=db)
current_session = Session()

def get_countries_by_organization(org_id, limit=100):
    query = current_session.query(Country).\
        join(OrganizationCountry).\
        filter(OrganizationCountry.organization_id == org_id).\
        order_by(Country.name).\
        limit(limit)
    return query.all()

# ORM-style implementation of a rating query.
# def get_ratings_by_viewer(viewer_id, limit=100):
#     query = current_session.query(Rating).\
#         join(Movie).\
#         filter(Rating.viewer_id == viewer_id).\
#         order_by(Rating.date_rated, Movie.title).\
#         limit(limit)

#     return query.all()

# ORM-style implementation of a movie inserter.
def insert_organization(name, mission, logo_url, url, gg_id):
    organization = Organization(name=name, mission=mission, logo_url=logo_url, url=url, gg_id=gg_id)
    current_session.add(organization)
    current_session.commit() # Make the change permanent.
    return organization

def insert_country(country_code, name):
    # do we want to overwrite id with country code here?
    country = Country(country_code=country_code, name = name)
    current_session.add(country)
    current_session.commit()
    return country

def insert_member(id, membername, nickname, profile_picture, banner_picture, bio, location):
    # do we want to use auth0's idas input here
    member = Member(id=id, membername=membername, nickname=nickname, profile_picture=profile_picture, banner_picture=banner_picture, bio=bio, location=location)
    current_session.add(member)
    current_session.commit()
    return member

def insert_post(member_id, time, typed_content, attached_image, organization_id, activity_id):
    post = Post(member_id=member_id, time=time, typed_content=typed_content, attached_image=attached_image, organization_id=organization_id, activity_id=activity_id)
    current_session.add(post)
    current_session.commit()
    return post

def insert_theme(id, name):
    theme = Theme(id=id, name=name)
    current_session.add(theme)
    current_session.commit()
    return theme

def insert_activity(organization_id, street_address, member_id, description, city, url, zipcode ):
    activity = Activity(organization_id=organization_id, street_address=street_address, member_id=member_id, description=description, city=city, url=url, zipcode=zipcode)
    current_session.add(activity)
    current_session.commit()
    return activity

def insert_organization_country(organization_id, country_code):
    organization_country = OrganizationCountry(organization_id=organization_id, country_code=country_code)
    current_session.add(organization_country)
    current_session.commit() # Make the change permanent.
    return organization_country

def insert_organization_theme(organization_id, theme_id):
    organization_theme = OrganizationTheme(organization_id=organization_id, theme_id=theme_id)
    current_session.add(organization_theme)
    current_session.commit()
    return organization_theme

def insert_member_organization(member_id, organization_id):
    member_organization = MemberOrganization(member_id=member_id, organization_id=organization_id)
    current_session.add(member_organization)
    current_session.commit()
    return member_organization

def insert_member_member(member1_id, member2_id):
    member_member = MemberMember(member1_id=member1_id, member2_id=member2_id)
    current_session.add(member_member)
    current_session.commit()
    return member_member

def insert_activity_theme(activity_id, theme_id):
    activity_theme = ActivityTheme(activity_id=activity_id, theme_id=theme_id)
    current_session.add(activity_theme)
    current_session.commit()
    return activity_theme

def insert_activity_country(activity_id, country_code):
    activity_country = ActivityCountry(activity_id=activity_id, country_code=country_code)
    current_session.add(activity_country)
    current_session.commit()
    return activity_country
    