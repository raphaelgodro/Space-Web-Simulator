
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
            print('type to add', type)
            db_session.add(type)

    def generate_corp_type(self):
        corp_type = []
        corp_type.append(self.star())
        corp_type.append(self.planet())
        corp_type.append(self.dwarf())
        corp_type.append(self.satellite())
        corp_type.append(self.comet())
        corp_type.append(self.rogue())
        corp_type.append(self.blackhole())
        corp_type.append(self.spaceship())
        self.corp_type = corp_type

    def star(self):
        star = CorpTypeSA(
            id=1,
            name = "star",
            distance_friendly_crop  = 1,
            physical_machine_priority = 0
        )
        return star

    def planet(self):
        planet = CorpTypeSA(
            id=2,
            name = "planet",
            distance_friendly_crop  = 1,
            physical_machine_priority = 2
        )
        return planet

    def dwarf(self):
        dwarf = CorpTypeSA(
            id=3,
            name = "dwarf planet",
            distance_friendly_crop  = 1,
            physical_machine_priority = 2
        )
        return dwarf

    def satellite(self):
        satellite = CorpTypeSA(
            id=4,
            name = "satellite",
            distance_friendly_crop  = 0.25,
            physical_machine_priority = 4
        )
        return satellite

    def comet(self):
        comet = CorpTypeSA(
            id=5,
            name = "comet",
            distance_friendly_crop  = 1,
            physical_machine_priority = 0
        )
        return comet

    def rogue(self):
        rogue = CorpTypeSA(
            id=6,
            name = "rogue",
            distance_friendly_crop  = 1,
            physical_machine_priority = 0
        )
        return rogue

    def blackhole(self):
        bh = CorpTypeSA(
            id=7,
            name = "black_hole",
            distance_friendly_crop  = 1,
            physical_machine_priority = 0
        )
        return bh

    def spaceship(self):
        ss = CorpTypeSA(
            id=8,
            name = "engine",
            distance_friendly_crop  = 1,
            physical_machine_priority = 5
        )
        return ss
