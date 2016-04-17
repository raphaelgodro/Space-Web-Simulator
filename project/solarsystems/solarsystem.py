from sqlalchemy import (
    Table
    )

from ..models import(
    SolarSystem as SolarSystemTable
    )

import json

class SolarSystem(object):
    def __init__(self, db_session):
        self.db_session = db_session
        self.generate_solar_system()
        self.add_solar_system_to_database()
        self.generate_corps()
        self.add_corp_to_database()


    def add_solar_system_to_database(self):
        db_session = self.db_session
        db_session.add(self.solar_system)
        solar_system_row = db_session.query(SolarSystemTable).order_by(
            SolarSystemTable.id.desc()).first()
        self.id = solar_system_row.id

    def add_corp_to_database(self):
        corp_array = self.corp_array
        db_session = self.db_session
        for corp in corp_array :
            db_session.add(corp)

    def generate_solar_system(): pass

    def generate_corps(): pass
