from solarsystem import SolarSystem

from ..models import Corp
from ..models import SolarSystem as SolarSystemTable

import math
import json

class LocalSolarSystem(SolarSystem):
    def __init__(self, db_session):
        super(self.__class__, self).__init__(db_session)

    def generate_corps(self):
        self.solar_system_id = 2
        corp_array = []
        corp_array.extend(self.sun())
        corp_array.extend(self.mercury())
        corp_array.extend(self.venus())
        corp_array.extend(self.earth())
        corp_array.extend(self.mars())
        corp_array.extend(self.jupiter())
        corp_array.extend(self.saturn())
        corp_array.extend(self.uranus())
        corp_array.extend(self.neptune())
        self.corp_array = corp_array

    def generate_solar_system(self):
            self.solar_system = SolarSystemTable(
                name = 'LocalSolarSystem',
                galaxy_coordinate  =  json.dumps([0,0,0]),
                manually_generated = True
            )

    def earth(self):
        media = [{
            'title': 'Only place known to harbor life for human kind',
            'credits': {
                'name': 'Earth (Wikipedia)',
                'href': 'https://en.wikipedia.org/wiki/Earth'
            },
            'image_path': 'https://images.unsplash.com/photo-1446776858070-70c3d5ed6758?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=deb97ae31a798491f0cfd1afda07e6be',
            'text': 'Estimates on how much longer Earth will be able to continue to support life .Estimates on how much longer Earth will be able to continue to support life .Estimates on how much longer Earth will be able to continue to support life .Estimates on how much longer Earth will be able to continue to support life .Estimates on how much longer Earth will be able to continue to support life .Estimates on how much longer Earth will be able to continue to support life .',
        },{
            'title': 'wtf is the problem',
            'credits': {
                'name': 'Earth (Wikipedia)',
                'href': 'https://en.wikipedia.org/wiki/Earth'
            },
            'image_path': 'http://www.ahdwallpaperstab.com/wp-content/uploads/2015/03/earth_wallpaper_widescreen.jpg',
            'text': 'Just wanna'
        }]
        earth = Corp(
            solar_system_id = self.id,
            name = "Earth",
            corp_type_id = 2,
            mass = 5.97237*10**24,
            initial_speed = json.dumps([29780, 0, 0]),
            rotation =  json.dumps([ 0, -0.01, 0]),
            radius = 6371,
            initial_position = json.dumps([0, 0, 1]),
            texture_path = "../../static/img/earthnight2.jpg",
            atmosphere_path = "../../static/img/atm1.png",
            atmosphere_color = json.dumps([43, 75, 204]),
            atmosphere_size = 3,
            media_en = json.dumps(media).encode('utf8'),
            media_fr = json.dumps(media).encode('utf8'),
            manually_generated = True
         )
        moon = Corp(
            solar_system_id = self.id,
            name = "Moon",
            parent_corp_key = "Earth",
            corp_type_id = 3,
            mass = 7.342*10**22,
            initial_speed = json.dumps([1052, 0, 0]),
            rotation =  json.dumps([ 0, -0.01, 0]),
            radius = 1737,
            initial_position = json.dumps([0, 0, 1.0024]),
            texture_path = "../../static/img/moon.jpg",
            atmosphere_path = "../../static/img/atm1.png",
            atmosphere_color = json.dumps([255, 255, 255]),
            atmosphere_size = 1,
            media_en = json.dumps(media).encode('utf8'),
            media_fr = json.dumps(media).encode('utf8'),
            manually_generated = True
            )
        return [earth]

    def sun(self):
        sun = Corp(
            solar_system_id = self.id,
            name = "Sun",
            corp_type_id = 1,
            mass = 1.98855*10**30,
            initial_speed = json.dumps([0,0,0]),
            rotation =  json.dumps([ 0, 0, 0]),
            radius = 696342000,
            initial_position = json.dumps([ 0, 0, 0]),
            texture_path = "../../static/img/sun4.jpg",
            atmosphere_path = "../../static/img/star_png_1.png",
            atmosphere_color = json.dumps([247, 232, 114]),
            atmosphere_size = 96,
            manually_generated = True
        )
        return [sun]

    def mars(self):
        mars = Corp(
            solar_system_id = self.id,
            name = "Mars",
            mass = 641.85*10**21,
            initial_speed = json.dumps([29499, 0, 0]),
            rotation =  json.dumps([ 0, -0.001, 0]),
            radius = 3396,
            initial_position = json.dumps([ 0, 0, 1.5236]),
            texture_path = "../../static/img/mars2.jpg",
            atmosphere_path = "../../static/img/atm1.png",
            atmosphere_color = json.dumps([232, 97, 58]),
            atmosphere_size = 3,
            manually_generated = True
        )
        return [mars]

    def venus(self):
        venus = Corp(
            solar_system_id = self.id,
            name = "Venus",
            corp_type_id = 2,
            mass = 4.8685*10**24,
            initial_speed = json.dumps([35020, 0, 0]),
            rotation =  json.dumps([ 0, -0.001, 0]),
            radius = 4868,
            initial_position = json.dumps([ 0, 0, 0.7233]),
            texture_path = "../../static/img/venus3.jpg",
            atmosphere_path = "../../static/img/atm1.png",
            atmosphere_color = json.dumps([247, 209, 119]),
            atmosphere_size = 3,
            manually_generated = True
        )
        return [venus]

    def mercury(self):
        mercury = Corp(
            solar_system_id = self.id,
            name = "Mercury",
            corp_type_id = 2,
            mass = 3.3011*10**23,
            initial_speed = json.dumps([47362, 0, 0]),
            rotation =  json.dumps([ 0, -0.001, 0]),
            radius = 2439,
            initial_position = json.dumps([ 0, 0, 0.3837]),
            texture_path = "../../static/img/mercury.jpg",
            atmosphere_path = "../../static/img/atm1.png",
            atmosphere_color = json.dumps([250, 221, 152]),
            atmosphere_size = 3,
            manually_generated = True
        )
        return [mercury]

    def jupiter(self):
        jupiter = Corp(
            solar_system_id = self.id,
            name = "Jupiter",
            corp_type_id = 2,
            mass = 1.8986*10**27,
            initial_speed = json.dumps([13057.2, 0, 0]),
            rotation =  json.dumps([ 0, -0.001, 0]),
            radius = 69911000,
            initial_position = json.dumps([ 0, 0, 5.2033]),
            texture_path = "../../static/img/jupiter2.jpg",
            atmosphere_path = "../../static/img/atm1.png",
            atmosphere_color = json.dumps([245, 222, 171]),
            atmosphere_size = 3,
            manually_generated = True
        )
        return [jupiter]

    def saturn(self):
        saturn = Corp(
            solar_system_id = self.id,
            name = "Saturn",
            corp_type_id = 2,
            mass = 568.46*10**24,
            initial_speed = json.dumps([9644.6, 0, 0]),
            rotation =  json.dumps([ 0, -0.001, 0]),
            radius = 54359000,
            initial_position = json.dumps([ 0, 0, 9.537]),
            texture_path = "../../static/img/saturn2.jpg",
            atmosphere_path = "../../static/img/atm1.png",
            atmosphere_color = json.dumps([219, 212, 234]),
            atmosphere_size = 0,
            manually_generated = True,
            ring_path = "../../static/img/saturnring.png",
            ring_size = 75,
            ring_rotation = json.dumps([9*math.pi/16, 0, 0])
        )
        return [saturn]

    def uranus(self):
        saturn = Corp(
            solar_system_id = self.id,
            name = "Uranus",
            corp_type_id = 2,
            mass = 8.6810*10**25,
            initial_speed = json.dumps([6800, 0, 0]),
            rotation =  json.dumps([ 0, -0.001, 0]),
            radius = 25559000,
            initial_position = json.dumps([ 0, 0, 19.19]),
            texture_path = "../../static/img/uranus2.jpg",
            atmosphere_path = "../../static/img/atm1.png",
            atmosphere_color = json.dumps([22, 191, 247]),
            atmosphere_size = 0,
            manually_generated = True,
            ring_path = "../../static/img/uranusRing.png",
            ring_size = 25,
            ring_rotation = json.dumps([9*math.pi/16, 0, 0])
        )
        return [saturn]

    def neptune(self):
        neptune = Corp(
            solar_system_id = self.id,
            name = "Neptune",
            corp_type_id = 2,
            mass = 102.43*10**24,
            initial_speed = json.dumps([5431.7, 0, 0]),
            rotation =  json.dumps([ 0, -0.001, 0]),
            radius = 24622000,
            initial_position = json.dumps([ 0, 0, 30.104]),
            texture_path = "../../static/img/neptune.jpg",
            atmosphere_path = "../../static/img/atm1.png",
            atmosphere_color = json.dumps([98, 98, 217]),
            atmosphere_size = 2,
            manually_generated = True
        )
        return [neptune]