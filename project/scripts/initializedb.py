import os
import sys
import transaction

from sqlalchemy import engine_from_config

from pyramid.paster import (
    get_appsettings,
    setup_logging,
    )

from ..models import (
    DBSession,
    Corp,
    SolarSystem,
    CorpType,
    Base,
    )

from ..solarsystems import localsolarsystem
from ..solarsystems import testsolarsystem
from ..corp import corptype


def usage(argv):
    cmd = os.path.basename(argv[0])
    print('usage: %s <config_uri>\n'
          '(example: "%s development.ini")' % (cmd, cmd))
    sys.exit(1)


def main(argv=sys.argv):
    if len(argv) != 2:
        usage(argv)
    config_uri = argv[1]
    setup_logging(config_uri)
    settings = get_appsettings(config_uri)
    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)
    Base.metadata.create_all(engine)

    with transaction.manager:
        delete_manually_generated_corp()
        delete_manually_generated_solar_system()
        delete_corp_type()
        add_manual_solar_system()
        add_corp_type()

def delete_manually_generated_corp():
    corp = DBSession.query(Corp)
    corp.filter(Corp.manually_generated == True).delete()

def delete_manually_generated_solar_system():
    solar_system = DBSession.query(SolarSystem)
    solar_system.filter(SolarSystem.manually_generated == True).delete()

def delete_corp_type():
    corp_type = DBSession.query(CorpType)
    corp_type.delete()

def add_manual_solar_system():
    localsolarsystem.LocalSolarSystem(DBSession)
    #testsolarsystem.TestSolarSystem(DBSession)

def add_corp_type():
    corptype.CorpType(DBSession)
