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

@view_config(route_name='view_system', renderer='templates/main_prod.pt')
def view_system(request):
    pagename = request.matchdict['pagename']
    page = DBSession.query(SolarSystem).filter_by(name=pagename).first()
    pagename_match = re.match('^[a-zA-Z0-9_%]+$', pagename)
    if pagename_match is None:
        return HTTPNotFound('No such Solar System in da Galaxy')
    if page is None:
        return HTTPNotFound('No such Solar System in da Galaxy')

    content = publish_parts(page.name, writer_name='html')['html_body']
    request.context = json.dumps(build_renderer_context(pagename))
    return dict(page=page, content=content)

@view_config(route_name='view_system_selected', renderer='templates/main_prod.pt')
def view_system_selected(request):
    pagename = request.matchdict['pagename']
    corpname = request.matchdict['corpname']
    pagename_match = re.match('^[a-zA-Z0-9_%]+$', pagename)
    corpname_match = re.match('^[a-zA-Z0-9_%]+$', corpname)
    if pagename_match is None:
        return HTTPNotFound('No such Solar System in da Galaxy')
    if corpname_match is None:
        return HTTPNotFound('No such Solar System in da Galaxy')

    page = DBSession.query(SolarSystem).filter_by(name=pagename).first()
    if page is None:
        return HTTPNotFound('No such Solar System in da Galaxy')

    content = publish_parts(page.name, writer_name='html')['html_body']
    request.context = json.dumps(build_renderer_context(pagename, corpname))
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

    context = json.dumps(
        build_renderer_context(solar_system_name))

def build_renderer_context(solar_system_name, selected_corp_name=None):
    context = {
        'solar_system': get_solar_system_information(
            solar_system_name, selected_corp_name)
    }
    print('selected_corp_name', selected_corp_name)
    return context


def get_solar_system_information(solar_system_name, selected_corp_name):
    solar_system = DBSession.query(SolarSystem).filter_by(
        name=solar_system_name).first()
    if solar_system is None:
        context['error'] = 'Solar System do not exist. Even if the universe has no limit theoretically.'
        return context
    solar_system = utils.row2dict(solar_system)
    corps = DBSession.query(Corp, CorpType).join(
        CorpType,
        CorpType.id == Corp.corp_type_id
    ).filter(
        Corp.solar_system_id == solar_system['id']
    ).all()
    corps_array = []
    for corp in corps:
        corps_array.append(get_corp_context_from_db(
            corp[0], corp[1]))

    if selected_corp_name is not None:
        solar_system['selected_corp_name'] = selected_corp_name

    solar_system['corps'] = corps_array
    print('solar_system', solar_system)
    return solar_system

def get_corp_context_from_db(corp, corp_type):
    context = {}
    context['texture_path'] = corp.texture_path
    context['id'] = corp.id
    context['name'] = corp.name
    context['mass'] = corp.mass
    context['initial_speed'] = json.loads(corp.initial_speed)
    context['rotation_period'] = corp.rotation_period
    context['initial_position'] = json.loads(corp.initial_position)
    context['distance_friendly_crop'] = corp_type.distance_friendly_crop
    context['corp_type_id'] = corp.corp_type_id

    radius_pixel = style.radius_meter_to_pixel(
        corp.radius)
    context['radius'] = radius_pixel


    context['rotation'] = json.loads(corp.rotation)

    if corp.orbit_coordinate is not None:
        try:
            context['orbit_coordinates'] = json.loads(corp.orbit_coordinate)
        except: pass

    ring_context = {}

    if corp.ring_path is not None:
        ring_context['ring_path'] = corp.ring_path


    if corp.ring_size is not None:
        try:
            ring_context['ring_size'] = style.ring_dimension(
                radius_pixel, int(corp.ring_size))
        except: pass

    if corp.ring_rotation is not None:
        try:
            ring_context['ring_rotation'] = json.loads(
                corp.ring_rotation)
        except: pass

    if len(ring_context) == 3:
        context['ring_context'] = ring_context

    if corp.media_en is not None:
        try:
	    pass
            media = json.loads(
                corp.media_en)
            media = utils.byteify(media)
            #  context['media'] = media
        except: pass

    if corp.parent_corp_id is not None:
        try:
            context['parent_corp_id'] = corp.parent_corp_id
            print(context)
        except: pass

    atmosphere_size = style.atmosphere_thickness(
        radius_pixel, int(corp.atmosphere_size))
    context['atmosphere_context'] = {
        'color': json.loads(corp.atmosphere_color),
        'texture_path': corp.atmosphere_path,
        'size': atmosphere_size
    }
    return context
