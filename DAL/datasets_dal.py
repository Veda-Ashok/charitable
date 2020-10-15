import os
from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String, Date, ForeignKey, Sequence
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import select, func
from sqlalchemy.orm import sessionmaker, relationship

db = create_engine(os.environ[process.env.DB_URL])
metadata = MetaData(db)
organization_table = Table('organization', metadata, autoload=True)
organization_theme_table = Table('organization_theme', metadata, autoload=True)
theme_table = Table('theme', metadata, autoload=True)
activity_theme = Table('activity_theme', metadata, autoload=True)
organization_country = Table('organization_country', metadata, autoload=True)
activity_country = Table('activity_country', metadata, autoload=True)
user_organization = Table('user_organization', metadata, autoload=True)
user_user = Table('user_user', metadata, autoload=True)
activity_table = Table('activity', metadata, autoload=True)
country_table = Table('country', metadata, autoload=True)
post_table = Table('post', metadata, autoload=True)
user_table = Table('user', metadata, autoload=True)


# Raw SQL-style implementation of a movie query.
# def select_movie_by_title(query, limit=100):
#     with db.connect() as connection:
#         # We want actual %'s so need to escape them in the string.
#         result_set = connection.execute(f"""
#             SELECT * FROM movie WHERE title ILIKE '%%{query}%%' ORDER BY title LIMIT {limit}
#         """)
#         result = result_set.fetchall()
#         return list(result)


# SQL builder-style implementation of an aggregate query.
# def get_average_rating_of_movie(movie_id):
#     with db.connect() as connection:
#         statement = select([func.avg(rating_table.c.rating)]).where(rating_table.c.movie_id == movie_id)
#         result_set = connection.execute(statement)

#         # We know in advance that this will be a single row with a single column so we feel safe about hardcoding this.
#         # A non-existent movie will yield `None` for this expression.
#         return result_set.fetchone()[0]


# For ORM-style implementations, we need to define a few things first.
ORM_Base = declarative_base()


class Organization(ORM_Base):
    __tablename__ = 'organization'
    id = Column(Integer, Sequence('organization_id_seq'), primary_key=True)
    name = Column(String)
    mission = Column(String)
    logo_url = Column(String)
    url = Column(String)
    
# class Movie(ORM_Base):
#     __tablename__ = 'movie'
#     id = Column(Integer, Sequence('movie_id_seq'), primary_key=True)
#     title = Column(String)
#     year = Column(Integer)

# class Rating(ORM_Base):
#     __tablename__ = 'rating'

#     # ORM requires some way to guarantee the uniqueness of a row, even if the table itself doesn’t have an official
#     # primary key. By marking multiple columns as a “primary_key,” we’re telling ORM that the _combination_ of these
#     # values can uniquely identify a row.
#     #
#     # In our case, we are making the explicit choice that no viewer can rate the same movie more than once.
#     # Fortunately, this appears to be true for the given dataset.
#     movie_id = Column(Integer, ForeignKey('movie.id'), primary_key=True) # ForeignKey takes table properties…
#     viewer_id = Column(Integer, primary_key=True)
#     rating = Column(Integer)
#     date_rated = Column(Date)
#     movie = relationship('Movie') # …but relationship takes the mapped class

class Activity(ORM_Base):
    __tablename__ = 'activity'

    id = Column(Integer, primary_key=True)
    organization_id = Column(Integer, ForeignKey('organization.id'), primary_key=True) # ForeignKey takes table properties…
    street_address = Column(String)
    user_id = Column(Integer, ForeignKey('user.id'), primary_key=True) # ForeignKey takes table properties…
    description = Column(String)
    city = Column(String)
    url = Column(String)
    zipcode = Column(String)
    organization = relationship('Organization') # …but relationship takes the mapped class
    user = relationship('User') # …but relationship takes the mapped class

class Country(ORM_BASE):
    __tablename__ = 'country'
    country_code = Column(String, primary_key=True) #this is the id
    name = Column(String)

class OrganizationCountry(ORM_Base):
    __tablename__ = 'organization_country'
    organization_id = Column(Integer, ForeignKey('organization.id'), primary_key=True) 
    country_code = Column(Integer, ForeignKey('country.country_code'), primary_key=True)
    organization = relationship('Organization')
    country = relationship('Country')

class UserOrganization(ORM_Base):
    __tablename__ = 'user_organization'
    user_id = Column(Integer, ForeignKey('user.id'), primary_key=True) 
    organization_id = Column(Integer, ForeignKey('organization.id'), primary_key=True)
    organization = relationship('Organization')
    user = relationship('User')
    
class User(ORM_Base):
    __tablename__ = 'user' 
    id = Column(Integer, Sequence('post_id_seq'), primary_key=True)
    organization_id = Column(Integer, ForeignKey('organization.id'), primary_key=True) 
    user_id = Column(Integer, ForeignKey('user.id'), primary_key=True) # this can be null and normally should be null
    city = Column(String)
    url = Column(String)
    zipcode = Column(Integer)
    user = relationship('User')

class UserUser(ORM_Base):
    __tablename__ = 'user_user'
    # do we need two users here??? 
    # Dondi please help
    user1_id = Column(Integer, ForeignKey('user.id'), primary_key=True)
    user2_id = Column(Integer, ForeignKey('user.id'), primary_key=True)
    user = relationship('User')
    
class Post(ORM_Base):
    __tablename__ = 'post'
    id = Column(Integer, Sequence('post_id_seq'), primary_key=True)
    user_id = Column(Integer, ForeignKey('user.id'), primary_key=True) 
    time = Column(DateTime)
    typed_content = Column(String)
    # attached_image = Column(String)
    organization_id = Column(Integer, ForeignKey('organization.id'), primary_key=True) 
    activity_id = Column(Integer, ForeignKey('activity.id'), primary_key=True)
    organization = relationship('Organization')
    activity = relationship('Activity')
    user = relationship('User')
    
class Theme(ORM_Base):
    __tablename__ = 'theme'
    id = Column(Integer, Sequence('post_id_seq'), primary_key=True)
    name = Column(String)
    
class ActivityTheme(ORM_Base):
    __tablename__ = 'activity_theme'
    activity_id = Column(Integer, ForeignKey('activity.id'), primary_key=True) 
    theme_id = Column(Integer, ForeignKey('organization.id'), primary_key=True) 
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
    theme_id = Column(Integer, ForeignKey('theme.id'), primary_key=True)
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


# ORM-style implementation of a rating query.
def get_ratings_by_viewer(viewer_id, limit=100):
    query = current_session.query(Rating).\
        join(Movie).\
        filter(Rating.viewer_id == viewer_id).\
        order_by(Rating.date_rated, Movie.title).\
        limit(limit)

    return query.all()


# # ORM-style implementation of a movie inserter.
# def insert_movie(title, year):
#     movie = Movie(title=title, year=year)
#     current_session.add(movie)
#     current_session.commit() # Make the change permanent.
#     return movie


# ORM-style implementation of a movie inserter.
def insert_organization(name, mission, logo_url, url):
    organization = Organization(name=name, mission=mission, logo_url=logo_url, url=url)
    current_session.add(organization)
    current_session.commit() # Make the change permanent.
    return organization

def insert_country(country_code, name):
    # do we want to overwrite id with country code here?
    country = Country(country_code=country_code, name = name)
    current_session.add(country)
    current_session.commit()
    return country

def insert_user(id, username, nickname, profile_picture, banner_picture, bio):
    # do we want to use auth0's idas input here
    user = User(id=id, username=username, nickname=nickname, profile_picture=profile_picture, banner_picture=banner_picture, bio)
    current_session.add(user)
    current_session.commit()
    return user

def insert_post(user_id, time, typed_content, attached_image, organization_id, activity_id):
    post = Post(user_id=user_id, time=time, typed_content=typed_content attached_image=attached_image, organization_id=organization_id, activity_id=activity_id)
    current_session.add(post)
    current_session.commit()
    return post

def insert_theme(name):
    theme = Theme(name=name)
    current_session.add(theme)
    current_session.commit()
    return theme

def insert_activity(organization_id, street_address, user_id, description, city, url, zipcode ):
    activity = Activity(organization_id=organization_id, street_address=street_address, user_id=user_id, description=description, city=city, url=url, zipcode=zipcode)
    current_session.add(activity)
    current_session.commit()
    return activity

def insert_organization_country(organization_id, courtry_code):
    organization_country = OrganizationCountry(organization_id=organization_id, country_code=country_code)
    current_session.add(organization_country)
    current_session.commit() # Make the change permanent.
    return organization_country

def insert_activity_theme(id, theme_id):
    activity_theme = ActivityTheme(activity_id=activity_id, theme_id=theme_id)
    current_session.add(activity_theme)
    current_session.commit()
    return activity_theme

def insert_organization_theme(organization_id, theme_id):
    organization_theme = OrganizationTheme(organization_id=organization_id, theme_id=theme_id)
    current_session.add(organization_theme)
    current_session.commit()
    return organization_theme

def insert_user_organization(user_id, organization_id):
    user_organization = UserOrganization(user_id=user_id, organization_id=organization_id)
    current_session.add(user_organization)
    current_session.commit()
    return user_organization

def insert_user_user(user1_id, user2_id):
    user_user = UserUSer(user1_id=user_id, user2_id=user2_id)
    current_session.add(user_user)
    current_session.commit()
    return user_user

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
    