from ..solarsystems.solarsystem import SolarSystem

from ..models import Corp
from ..models import SolarSystem as SolarSystemTable

import math
import json

class TestSolarSystem(SolarSystem):
    def __init__(self, db_session):
        super(self.__class__, self).__init__(db_session)

    def generate_corps(self):
        self.solar_system_id = 3
        corp_array = []
        corp_array.extend(self.sun())
        corp_array.extend(self.alpha())
        corp_array.extend(self.eartha())
        corp_array.extend(self.beta())
        corp_array.extend(self.planetC())
        corp_array.extend(self.planetD())
        print(corp_array)
        self.corp_array = corp_array

    def generate_solar_system(self):
            self.solar_system = SolarSystemTable(
                name = 'TestSolarSystem',
                galaxy_coordinate  =  json.dumps([666,666,666]),
                manually_generated = True
            )
    def sun(self):
        sun = Corp(
            solar_system_id = self.id,
            name = "X Alpha Centaur",
            corp_type_id = 1,
            mass = 1.98855*10**31,
            initial_speed = json.dumps([0,0,0]),
            rotation =  json.dumps([ 0, 0, 0]),
            radius = 696342000,
            initial_position = json.dumps([ 0, 0, 0]),
            texture_path = "../../static/img/sun3.jpg",
            atmosphere_path = "../../static/img/star_png_1.png",
            atmosphere_color = json.dumps([245, 126, 47]),
            atmosphere_size = 70,
            manually_generated = True
        )
        return [sun]


    def alpha(self):
        alpha = Corp(
            solar_system_id = self.id,
            name = "Alpha",
            corp_type_id = 2,
            mass = 4.8685*10**26,
            initial_speed = json.dumps([65020, 0, 0]),
            rotation =  json.dumps([ 0, -0.001, 0]),
            radius = 7868,
            initial_position = json.dumps([ 0, 0, 0.7233]),
            texture_path = "../../static/img/rocky/10.png",
            atmosphere_path = "../../static/img/atm1.png",
            atmosphere_color = json.dumps([247, 209, 119]),
            atmosphere_size = 2,
            manually_generated = True
        )
        return [alpha]

    def eartha(self):
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
        eartha_system = []
        eartha_system.append(Corp(
            solar_system_id = self.id,
            name = "Eartha",
            corp_type_id = 2,
            mass = 5.97237*10**26,
            initial_speed = json.dumps([60287, 0, 0]),
            rotation =  json.dumps([ 0, -0.01, 0]),
            radius = 6371,
            initial_position = json.dumps([0, 0, 1]),
            texture_path = "../../static/img/life/tos6.jpg",
            atmosphere_path = "../../static/img/atm1.png",
            atmosphere_color = json.dumps([250, 62, 66]),
            atmosphere_size = 3,
            media_en = json.dumps(media).encode('utf8'),
            media_fr = json.dumps(media).encode('utf8'),
            manually_generated = True
         ))
        return eartha_system

    def beta(self):
        beta = Corp(
            solar_system_id = self.id,
            name = "Beta",
            corp_type_id = 2,
            mass = 568.46*10**26,
            initial_speed = json.dumps([15644.6, 0, 0]),
            rotation =  json.dumps([ 0, -0.001, 0]),
            radius = 543590,
            initial_position = json.dumps([ 0, 0, 5.537]),
            texture_path = "../../static/img/life/4.jpg",
            atmosphere_path = "../../static/img/atm1.png",
            atmosphere_color = json.dumps([138, 135, 132]),
            atmosphere_size = 2,
            manually_generated = True,
            ring_path = "../../static/img/saturnring.png",
            ring_size = 75,
            ring_rotation = json.dumps([9*math.pi/16, 0, 0])
        )
        return [beta]
    def planetC(self):
        media = [{
            'title': 'La planete de M-Sophie',
            'credits': {
                'name': 'Unicorn',
                'href': 'http://wlp.ninja/wallpaper/Alien-Isolation-Wallpaper-10-840x474.jpg'
            },
            'image_path': 'http://wlp.ninja/wallpaper/Alien-Isolation-Wallpaper-10-840x474.jpg',
            'text': 'Puisses la lumiere te guider sur la planete des licornes...'
        },{
            'title': 'Planete Marie-S 12312312312312321323213324',
            'credits': {
                'name': 'Earth (Wikipedia)',
                'href': 'https://en.wikipedia.org/wiki/Earth'
            },
            'image_path': 'http://static.planetminecraft.com/files/resource_media/screenshot/1202/FatUnicorn_1225588.jpg',
            'text': 'Marie-Sophie est dans la lune.'
        }]
        c = Corp(
            solar_system_id = self.id,
            name = "Planet C",
            corp_type_id = 2,
            mass = 5.0*10**27,
            initial_speed = json.dumps([15000, 0, 0]),
            rotation =  json.dumps([ 0, -0.001, 0]),
            radius = 696342,
            initial_position = json.dumps([ 0, 0, 6.537]),
            texture_path = "../../static/img/sophie.jpg",
            atmosphere_path = "../../static/img/atm1.png",
            atmosphere_color = json.dumps([255, 143,127])
            ,
            atmosphere_size = 3,
            manually_generated = True,
            media_en = json.dumps(media).encode('utf8'),
            media_fr = json.dumps(media).encode('utf8')
        )
        return [c]

    def planetD(self):
        media = [{
            'title': 'Cmon son',
            'credits': {
                'name': 'Earth (Wikipedia)',
                'href': 'http://wlp.ninja/wallpaper/Alien-Isolation-Wallpaper-10-840x474.jpg'
            },
            'image_path': 'http://sf.co.ua/14/05/wallpaper-1189678.jpg',
            'text': 'There will be sacrifice if you go there son...'
        },{
            'title': 'wtf is the problem',
            'credits': {
                'name': 'Earth (Wikipedia)',
                'href': 'https://en.wikipedia.org/wiki/Earth'
            },
            'image_path': 'http://www.ahdwallpaperstab.com/wp-content/uploads/2015/03/earth_wallpaper_widescreen.jpg',
            'text': 'Just wanna'
        }]
        d = Corp(
            solar_system_id = self.id,
            name = "Planet D",
            corp_type_id = 2,
            mass = 5.0*10**27,
            initial_speed = json.dumps([14000, 0, 0]),
            rotation =  json.dumps([ 0, -0.001, 0]),
            radius = 69634200,
            initial_position = json.dumps([ 0, 0, 7]),
            texture_path = "../../static/img/life/7.jpg",
            atmosphere_path = "../../static/img/atm1.png",
            atmosphere_color = json.dumps([149, 227,252]),
            atmosphere_size = 3,
            manually_generated = True,
            media_en = json.dumps(media).encode('utf8'),
            media_fr = json.dumps(media).encode('utf8')
        )
        return [d]
    def planetE(self):
        media = [{
            'title': 'Cmon son',
            'credits': {
                'name': 'Earth (Wikipedia)',
                'href': 'http://wlp.ninja/wallpaper/Alien-Isolation-Wallpaper-10-840x474.jpg'
            },
            'image_path': 'http://sf.co.ua/14/05/wallpaper-1189678.jpg',
            'text': 'There will be sacrifice if you go there son...'
        },{
            'title': 'wtf is the problem',
            'credits': {
                'name': 'Earth (Wikipedia)',
                'href': 'https://en.wikipedia.org/wiki/Earth'
            },
            'image_path': 'http://www.ahdwallpaperstab.com/wp-content/uploads/2015/03/earth_wallpaper_widescreen.jpg',
            'text': 'Just wanna'
        }]
        e = Corp(
            solar_system_id = self.id,
            name = "Planet E",
            corp_type_id = 2,
            mass = 4.8685*10**26,
            initial_speed = json.dumps([35020, 0, 0]),
            rotation =  json.dumps([ 0, -0.001, 0]),
            radius = 69634200,
            initial_position = json.dumps([ 0, 0, 1]),
            texture_path = "../../static/img/rocky/11.png",
            atmosphere_path = "../../static/img/atm1.png",
            atmosphere_color = json.dumps([180, 201,88]),
            atmosphere_size = 2,
            manually_generated = True,
            media_en = json.dumps(media).encode('utf8'),
            media_fr = json.dumps(media).encode('utf8')
        )
        return [e]

    def planetF(self):
        media = [{
            'title': 'Cmon son',
            'credits': {
                'name': 'Earth (Wikipedia)',
                'href': 'http://wlp.ninja/wallpaper/Alien-Isolation-Wallpaper-10-840x474.jpg'
            },
            'image_path': 'http://sf.co.ua/14/05/wallpaper-1189678.jpg',
            'text': 'There will be sacrifice if you go there son...'
        },{
            'title': 'wtf is the problem',
            'credits': {
                'name': 'Earth (Wikipedia)',
                'href': 'https://en.wikipedia.org/wiki/Earth'
            },
            'image_path': 'http://www.ahdwallpaperstab.com/wp-content/uploads/2015/03/earth_wallpaper_widescreen.jpg',
            'text': 'Just wanna'
        }]
        f = Corp(
            mass = 3.3011*10**23,
            initial_speed = json.dumps([47362, 0, 0]),
            rotation =  json.dumps([ 0, -0.001, 0]),
            radius = 2439,
            initial_position = json.dumps([ 0, 0, 0.3837]),
            solar_system_id = self.id,
            name = "Planet F",
            corp_type_id = 2,
            texture_path = "../../static/img/rocky/17.png",
            atmosphere_path = "../../static/img/atm1.png",
            atmosphere_color = json.dumps([180, 201,88]),
            atmosphere_size = 2,
            manually_generated = True,
            media_en = json.dumps(media).encode('utf8'),
            media_fr = json.dumps(media).encode('utf8')
        )
        return [f]