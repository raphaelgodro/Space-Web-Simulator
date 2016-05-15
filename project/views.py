import cgi
import re
import json
import utils
import style
from docutils.core import publish_parts

from pyramid.httpexceptions import (
    HTTPFound,
    HTTPNotFound,
    )

from pyramid.view import view_config

from .models import (
    DBSession,
    SolarSystem,
    Corp,
    CorpType
    )
import json

@view_config(route_name='home')
def root(request):
    return HTTPFound(location = request.route_url('view_system',
                                                  pagename='TestSolarSystem'))

@view_config(route_name='view_system', renderer='templates/main.pt')
def view_system(request):
    pagename = request.matchdict['pagename']
    page = DBSession.query(SolarSystem).filter_by(name=pagename).first()
    if page is None:
        return HTTPNotFound('No such Solar System in da Galaxy')

    content = publish_parts(page.name, writer_name='html')['html_body']
    request.context = build_renderer_context(pagename)
    return dict(page=page, content=content)


@view_config(
    route_name='corps',
    renderer='json'
    )
def api_solar_system(request):
    response = {}
    try:
        get = request.GET
    except:
        response['error'] = 'Missing data.'
        return reponse

    if 'solarsystem' in get:
        solarsystem_match = re.match('^[a-zA-Z0-9_%]+$', get['solarsystem'])
        if solarsystem_match is None:
            response['error'] = 'Invalid characters. Only alphanumerical values + "_" are allowed.'
            return response
        else:
            solar_system_name = solarsystem_match.group(0)
    else:
        response['error'] = 'Must define a solar system name.'
        return response

    context = build_renderer_context(solar_system_name)
    print(context)

def build_renderer_context(solar_system_name):
    context = {
        'solar_system': get_solar_system_information(solar_system_name),
        'corp_type': get_corp_type()
    }
    return context


def get_solar_system_information(solar_system_name):
    solar_system = DBSession.query(SolarSystem).filter_by(
        name=solar_system_name).first()
    if solar_system is None:
        context['error'] = 'Solar System do not exist. Even if the universe has no limit theoretically.'
        return context
    solar_system = utils.row2dict(solar_system)
    corps = DBSession.query(Corp).filter_by(
        solar_system_id=solar_system['id'])
    corps_array = []
    for corp in corps:
        corps_array.append(get_corp_context_from_db(
            utils.row2dict(corp)))

    solar_system['corps'] = corps_array
    return solar_system

def get_corp_context_from_db(db_corp_dict):
    context = {}
    context['texture_path'] = db_corp_dict['texture_path']
    context['name'] = db_corp_dict['name']
    context['mass'] = float(db_corp_dict['mass'])
    context['initial_speed'] = json.loads(db_corp_dict['initial_speed'])
    context['initial_position'] = json.loads(db_corp_dict['initial_position'])
    print('name', context['name'])
    radiusPixel = style.radius_meter_to_pixel(
        db_corp_dict['radius'])
    context['radius'] = radiusPixel
    print('radius', radiusPixel)

    context['rotation'] = json.loads(db_corp_dict['rotation'])

    if db_corp_dict['orbit_coordinate'] is not None:
        try:
            context['orbit_coordinates'] = json.loads(db_corp_dict['orbit_coordinate'])
        except: pass

    ring_context = {}

    if db_corp_dict['ring_path'] is not None:
        ring_context['ring_path'] = db_corp_dict['ring_path']

    if db_corp_dict['ring_size'] is not None:
        try:
            ring_context['ring_size'] = style.ring_dimension(
                radiusPixel, int(db_corp_dict['ring_size']))
        except: pass

    if db_corp_dict['ring_rotation'] is not None:
        try:
            ring_context['ring_rotation'] = json.loads(
                db_corp_dict['ring_rotation'])
        except: pass

    if len(ring_context) == 3:
        context['ring_context'] = ring_context

    if db_corp_dict['media_en'] is not None:
        try:
            media = json.loads(
                db_corp_dict['media_en'])
            media = utils.byteify(media)
            context['media'] = media
        except: pass

    if db_corp_dict['parent_corp_key'] is not None:
        try:
            context['parent_corp_key'] = db_corp_dict['parent_corp_key']
        except: pass

    atmosphere_size = style.atmosphere_thickness(
        radiusPixel, int(db_corp_dict['atmosphere_size']))
    context['atmosphere_context'] = {
        'color': json.loads(db_corp_dict['atmosphere_color']),
        'texture_path': db_corp_dict['atmosphere_path'],
        'size': atmosphere_size
    }
    return context

def get_corp_type():
    corp_type = DBSession.query(CorpType)
    corps_type_array = []
    for type in corp_type:
        print(type)

    return corps_type_array




