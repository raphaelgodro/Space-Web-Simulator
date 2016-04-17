from sqlalchemy import (
    Column,
    Boolean,
    Integer,
    Text,
    Float
    )

from sqlalchemy.ext.declarative import declarative_base

from sqlalchemy.orm import (
    scoped_session,
    sessionmaker,
    )

from zope.sqlalchemy import ZopeTransactionExtension

DBSession = scoped_session(sessionmaker(extension=ZopeTransactionExtension()))
Base = declarative_base()


class SolarSystem (Base):
    """ The SolarSystem entry in the database for a solar system object """
    __tablename__ = 'solarsystem'
    id = Column(Integer, primary_key=True)
    name = Column(Text, unique=True)
    galaxy_coordinate = Column(Text)
    manually_generated = Column(Boolean)


class Corp(Base):
    """ The entry for a corp in the solar system"""
    __tablename__ = 'corps'
    id = Column(Integer, primary_key=True)
    solar_system_id = Column(Integer)
    parent_corp_key = Column(Text)
    corp_type_id = Column(Integer)
    name = Column(Text)
    mass = Column(Integer)
    initial_speed = Column(Text)
    rotation = Column(Text)
    orbit_coordinate = Column(Text)
    radius = Column(Integer)
    initial_position = Column(Text)
    texture_path = Column(Text)
    atmosphere_path = Column(Text)
    atmosphere_color = Column(Text)
    atmosphere_size = Column(Integer)
    ring_path = Column(Text)
    ring_size = Column(Integer)
    ring_rotation = Column(Text)
    media_en = Column(Text)
    media_fr = Column(Text)
    manually_generated = Column(Boolean)

class CorpType(Base):
    """ The different type and characteristics for a corp type"""
    __tablename__ = 'corp_type'
    id = Column(Integer, primary_key=True)
    name = Column(Integer)
    distance_friendly_crop = Column(Float)
    physical_machine_priority = Column(Integer)
