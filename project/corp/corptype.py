
from ..models import CorpType as CorpTypeSA

class CorpType(object):
    def __init__(self, db_session):
        self.db_session = db_session
        self.generate_corp_type()
        self.add_corp_to_database()


    def add_corp_to_database(self):
        corp_type = self.corp_type
        db_session = self.db_session
        for type in corp_type :
            db_session.add(type)

    def generate_corp_type(self):
        corp_type = []
        corp_type.append(self.star())
        corp_type.append(self.planet())
        corp_type.append(self.satellite())
        corp_type.append(self.comet())
        corp_type.append(self.rogue())
        corp_type.append(self.blackhole())
        corp_type.append(self.spaceship())
        self.corp_type = corp_type

    def star(self):
        star = CorpTypeSA(
            name = "Star",
            distance_friendly_crop  = 0,
            physical_machine_priority = 0
        )
        return star

    def planet(self):
        planet = CorpTypeSA(
            name = "Planet",
            distance_friendly_crop  = 0,
            physical_machine_priority = 2
        )
        return planet

    def satellite(self):
        satellite = CorpTypeSA(
            name = "Satellite",
            distance_friendly_crop  = 0,
            physical_machine_priority = 4
        )
        return satellite

    def comet(self):
        comet = CorpTypeSA(
            name = "Comet",
            distance_friendly_crop  = 0,
            physical_machine_priority = 0
        )
        return comet

    def rogue(self):
        rogue = CorpTypeSA(
            name = "Rogue",
            distance_friendly_crop  = 0,
            physical_machine_priority = 0
        )
        return rogue

    def blackhole(self):
        bh = CorpTypeSA(
            name = "Black Hole",
            distance_friendly_crop  = 0,
            physical_machine_priority = 0
        )
        return bh

    def spaceship(self):
        ss = CorpTypeSA(
            name = "Engine",
            distance_friendly_crop  = 0,
            physical_machine_priority = 5
        )
        return ss
