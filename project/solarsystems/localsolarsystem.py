#!/usr/bin/env python
# -*- coding: utf-8 -*-

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
        corp_array.extend(self.pluto())
        self.corp_array = corp_array

    def generate_solar_system(self):
            self.solar_system = SolarSystemTable(
                name = 'LocalSolarSystem',
                galaxy_coordinate  =  json.dumps([0,0,0]),
                manually_generated = True
            )

    def earth(self):
        media = [{
            'title': 'The Blue dot',
            'credits': {
                'name': 'Earth (Wikipedia)',
                'href': 'https://en.wikipedia.org/wiki/Earth'
            },
            'image_path': 'https://images.unsplash.com/photo-1446776858070-70c3d5ed6758?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=deb97ae31a798491f0cfd1afda07e6be',
            'text': u"""
                Earth (otherwise known as the world,[n 5] in Greek: Γαῖα Gaia,[n 6] or in Latin: Terra[26]) is the third planet from the Sun, the densest planet in the Solar System, the largest of the Solar System's four terrestrial planets, and the only astronomical object known to harbor life.
                According to radiometric dating and other sources of evidence, Earth formed about 4.54 billion years ago.[27][28][29] Earth gravitationally interacts with other objects in space, especially the Sun and the Moon. During one orbit around the Sun, Earth rotates about its own axis 366.26 times, creating 365.26 solar days or one sidereal year.[n 7] Earth's axis of rotation is tilted 23.4° away from the perpendicular of its orbital plane, producing seasonal variations on the planet's surface within a period of one tropical year (365.24 solar days).[30] The Moon, Earth's only permanent natural satellite, by its gravitational relationship with Earth, causes ocean tides, stabilizes the orientation of Earth's rotational axis, and gradually slows Earth's rotational rate.[31]
                Source : Wikipedia
             """
        },{
            'title': 'The living planet',
            'credits': {
                'name': 'Earth (Wikipedia)',
                'href': 'https://en.wikipedia.org/wiki/Earth'
            },
            'image_path': 'http://www.forlifeonearth.org/wp-content/uploads/2014/08/slide-2.jpg',
            'text': """
                Highly energetic chemical reactions are thought to have produced self–replicating molecules around four billion years ago. This was followed a half billion years later by the last common ancestor of all life.[75] The development of photosynthesis allowed the Sun's energy to be harvested directly by life forms; the resultant molecular oxygen (O2) accumulated in the atmosphere and due to interaction with ultraviolet solar radiation, formed a protective ozone layer (O3) in the upper atmosphere.[76] The incorporation of smaller cells within larger ones resulted in the development of complex cells called eukaryotes.[77] True multicellular organisms formed as cells within colonies became increasingly specialized. Aided by the absorption of harmful ultraviolet radiation by the ozone layer, life colonized Earth's surface.
                Source : Wikipedia
            """
        }]
        earth = Corp(
            solar_system_id = self.id,
            name = "Earth",
            corp_type_id = 2,
            mass = 5.97237*10**24,
            initial_speed = json.dumps([29780, 0, 0]),
            rotation_period = 24,
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
        db_session = self.db_session
        db_session.add(earth)

        earth_id = db_session.query(Corp.id).filter(
            Corp.name == "Earth").one()[0]
        moon = Corp(
            solar_system_id = self.id,
            name = "Moon",
            parent_corp_id = earth_id,
            corp_type_id = 4,
            mass = 7.342*10**22,
            initial_speed = json.dumps([29780+1022, 0, 0]),
            rotation_period = 27*24,
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
        db_session.add(moon)
        return [earth, moon]

    def sun(self):
        media = [{
            'title': 'Our favourite star',
            'credits': {
                'name': 'Sun (Wikipedia)',
                'href': 'https://en.wikipedia.org/wiki/Sun'
            },
            'image_path': 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Sun_-_August_1,_2010.jpg',
            'text': """
                The Sun is the star at the center of the Solar System and is by far the most important source of energy for life on Earth. It is a nearly perfect sphere of hot plasma,[13][14] with internal convective motion that generates a magnetic field via a dynamo process.[15] Its diameter is about 109 times that of Earth, and its mass is about 330,000 times that of Earth, accounting for about 99.86% of the total mass of the Solar System.[16] About three quarters of the Sun's mass consists of hydrogen; the rest is mostly helium, with much smaller quantities of heavier elements, including oxygen, carbon, neon, and iron.[17]
                """
        }]
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
            manually_generated = True,
            media_en = json.dumps(media).encode('utf8'),
            media_fr = json.dumps(media).encode('utf8')
        )

        self.db_session.add(sun)

        return [sun]

    def mars(self):
        media = [{
            'title': 'Mars (Humanity next destination)',
            'credits': {
                'name': 'Mars (Wikipedia)',
                'href': 'https://en.wikipedia.org/wiki/Mars'
            },
            'image_path': 'http://www.roadtovr.com/wp-content/uploads/2015/12/MarsScreenshot3.jpg',
            'text': """
                Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System, after Mercury. Named after the Roman god of war, it is often referred to as the "Red Planet"[13][14] because the iron oxide prevalent on its surface gives it a reddish appearance.[15] Mars is a terrestrial planet with a thin atmosphere, having surface features reminiscent both of the impact craters of the Moon and the valleys, deserts, and polar ice caps of Earth.
                """
        }]
        mars = Corp(
            solar_system_id = self.id,
            corp_type_id = 2,
            name = "Mars",
            mass = 641.85*10**21,
            initial_speed = json.dumps([29499, 0, 0]),
            rotation =  json.dumps([ 0, -0.001, 0]),
            rotation_period = 24.6,
            radius = 3396,
            initial_position = json.dumps([ 0, 0, 1.5236]),
            texture_path = "../../static/img/mars2.jpg",
            atmosphere_path = "../../static/img/atm1.png",
            atmosphere_color = json.dumps([232, 97, 58]),
            atmosphere_size = 3,
            media_en = json.dumps(media).encode('utf8'),
            media_fr = json.dumps(media).encode('utf8'),
            manually_generated = True
        )
        self.db_session.add(mars)
        return [mars]

    def venus(self):
        media = [{
            'title': 'The hell world',
            'credits': {
                'name': 'Venus (Wikipedia)',
                'href': 'https://en.wikipedia.org/wiki/Sun'
            },
            'image_path': 'http://www.thetimenow.com/img/astronomy/all/atmosphere-of-venus.png',
            'text': """
                Venus is the second planet from the Sun, orbiting it every 224.7 Earth days.[14] It has the longest rotation period (243 days) of any planet in the Solar System and rotates in the opposite direction to most other planets. It has no natural satellite. It is named after the Roman goddess of love and beauty. It is the second-brightest natural object in the night sky after the Moon, reaching an apparent magnitude of −4.6, bright enough to cast shadows.[15] Because Venus is an inferior planet from Earth, it never appears to venture far from the Sun; its elongation reaches a maximum of 47.8°.
                """
        }]
        venus = Corp(
            solar_system_id = self.id,
            name = "Venus",
            corp_type_id = 2,
            mass = 4.8685*10**24,
            initial_speed = json.dumps([35020, 0, 0]),
            rotation =  json.dumps([ 0, -0.001, 0]),
            rotation_period = 243*24,
            radius = 4868,
            initial_position = json.dumps([ 0, 0, 0.7233]),
            texture_path = "../../static/img/venus3.jpg",
            atmosphere_path = "../../static/img/atm1.png",
            atmosphere_color = json.dumps([247, 209, 119]),
            atmosphere_size = 3,
            media_en = json.dumps(media).encode('utf8'),
            media_fr = json.dumps(media).encode('utf8'),
            manually_generated = True
        )
        self.db_session.add(venus)
        return [venus]

    def mercury(self):
        media = [{
            'title': 'Mercury',
            'credits': {
                'name': 'Venus (Wikipedia)',
                'href': 'https://en.wikipedia.org/wiki/Sun'
            },
            'image_path': 'http://www.skymarvels.com/infopages/images/Mercury%20Surface.jpg',
            'text': """
                Mercury is the smallest planet in the Solar System and the one closest to the Sun,[a] with an orbital period of about 88 Earth days, which is much faster than any other planet in the Solar System. Seen from Earth, it appears to move around its orbit in about 116 days. It has no known natural satellites. It is named after the Roman deity Mercury, the messenger to the gods.
            """
        }]
        mercury = Corp(
            solar_system_id = self.id,
            name = "Mercury",
            corp_type_id = 2,
            mass = 3.3011*10**23,
            initial_speed = json.dumps([47362, 0, 0]),
            rotation =  json.dumps([ 0, -0.001, 0]),
            rotation_period = 59*24,
            radius = 2439,
            initial_position = json.dumps([ 0, 0, 0.3837]),
            texture_path = "../../static/img/mercury.jpg",
            atmosphere_path = "../../static/img/atm1.png",
            atmosphere_color = json.dumps([250, 221, 152]),
            atmosphere_size = 3,
            media_en = json.dumps(media).encode('utf8'),
            media_fr = json.dumps(media).encode('utf8'),
            manually_generated = True
        )
        self.db_session.add(mercury)
        return [mercury]

    def jupiter(self):
        media = [{
            'title': 'Jupiter',
            'credits': {
                'name': 'Venus (Wikipedia)',
                'href': 'https://en.wikipedia.org/wiki/Sun'
            },
            'image_path': 'http://fr.cdn.v5.futura-sciences.com/builds/images/thumbs/4/497c5a7fa8_tache_rouge_jupiter_1_nasa.jpg',
            'text': """
                Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a giant planet with a mass one-thousandth that of the Sun, but two and a half times that of all the other planets in the Solar System combined. Jupiter is a gas giant, along with Saturn, with the other two giant planets, Uranus and Neptune, being ice giants. Jupiter was known to astronomers of ancient times.[11] The Romans named it after their god Jupiter.[12] When viewed from Earth, Jupiter can reach an apparent magnitude of −2.94, bright enough for its reflected light to cast shadows,[13] and making it on average the third-brightest object in the night sky after the Moon and Venus.
                """
        }]
        jupiter = Corp(
            solar_system_id = self.id,
            name = "Jupiter",
            corp_type_id = 2,
            mass = 1.8986*10**27,
            initial_speed = json.dumps([13057.2, 0, 0]),
            rotation =  json.dumps([ 0, -0.001, 0]),
            rotation_period = 9.9,
            radius = 69911000,
            initial_position = json.dumps([ 0, 0, 5.2033]),
            texture_path = "../../static/img/jupiter.jpg",
            atmosphere_path = "../../static/img/atm1.png",
            atmosphere_color = json.dumps([245, 222, 171]),
            atmosphere_size = 3,
            media_en = json.dumps(media).encode('utf8'),
            media_fr = json.dumps(media).encode('utf8'),
            manually_generated = True
        )
        self.db_session.add(jupiter)
        jupiter_id = self.db_session.query(Corp.id).filter(
            Corp.name == "Jupiter").one()[0]
        media = [{
            'title': 'The icy world',
            'credits': {
                'name': 'Venus (Wikipedia)',
                'href': 'https://en.wikipedia.org/wiki/Sun'
            },
            'image_path': 'https://dncache-mauganscorp.netdna-ssl.com/cropped-wallpapers/471/471000-1280x800-[DesktopNexus.com].jpg?st=YD4Qn9Ftvp6X9NE9UUX0pg&e=1467251390',
            'text': """
            Europa Listeni/jʊˈroʊpə/[9] (Jupiter II), is the sixth-closest moon of Jupiter, and the smallest of its four Galilean satellites, and the sixth-largest moon in the Solar System. Europa was discovered in 1610 by Galileo Galilei[1] and was named after Europa, mother of King Minos of Crete, who became one of Zeus' lovers. In addition to Earth-bound telescope observations, Europa has been examined by a succession of space probe flybys, the first occurring in the early 1970s.
                """
        }]
        europa = Corp(
            solar_system_id = self.id,
            name = "Europa",
            corp_type_id = 4,
            parent_corp_id = jupiter_id,
            mass = 4.799*10**22,
            initial_speed = json.dumps([13057.2 + 13740, 0, 0]),
            rotation =  json.dumps([ 0, 0, 0]),
            radius = 1560.8 * 1000,
            initial_position = json.dumps([ 0, 0, 5.2033 + 0.00448462566]),
            texture_path = "../../static/img/europa.jpg",
            atmosphere_path = "../../static/img/atm1.png",
            atmosphere_color = json.dumps([217, 246, 250]),
            atmosphere_size = 3,
            media_en = json.dumps(media).encode('utf8'),
            media_fr = json.dumps(media).encode('utf8'),
            manually_generated = True
        )
        self.db_session.add(europa)
        media = [{
            'title': 'The volcanic world',
            'credits': {
                'name': 'Venus (Wikipedia)',
                'href': 'https://en.wikipedia.org/wiki/Sun'
            },
            'image_path': 'http://pirlwww.lpl.arizona.edu/~perry/io_images/Jupiter_from_Gishbar3.png',
            'text': """
                Io /ˈaɪ.oʊ/[6] is the innermost of the four Galilean moons of the planet Jupiter. It is the fourth-largest moon, has the highest density of all the moons, and is the driest known object in the Solar System. It was discovered in 1610 and was named after the mythological character Io, a priestess of Hera who became one of Zeus's lovers.
                """
        }]
        io = Corp(
            solar_system_id = self.id,
            name = "Io",
            corp_type_id = 4,
            parent_corp_id = jupiter_id,
            mass = 8.931*10**22,
            initial_speed = json.dumps([13057.2 + 17339, 0, 0]),
            rotation =  json.dumps([ 0, 0, 0]),
            radius = 1821.6 * 1000,
            initial_position = json.dumps([ 0, 0, 5.2033 + 0.002819559]),
            texture_path = "../../static/img/io.jpg",
            atmosphere_path = "../../static/img/atm1.png",
            atmosphere_color = json.dumps([209, 235, 106]),
            atmosphere_size = 3,
            media_en = json.dumps(media).encode('utf8'),
            media_fr = json.dumps(media).encode('utf8'),
            manually_generated = True
        )
        self.db_session.add(io)
        media = [{
            'title': 'Ganymede',
            'credits': {
                'name': 'Venus (Wikipedia)',
                'href': 'https://en.wikipedia.org/wiki/Sun'
            },
            'image_path': 'https://ganymededreams.files.wordpress.com/2015/07/ganymede.jpg',
            'text': """
                Ganymede /ˈɡænᵻmiːd/[12] (Jupiter III) is the largest moon of Jupiter and in the Solar System, and the only moon known to have a magnetosphere. It is the seventh satellite outward from Jupiter[13] and third of the Galilean moons, the first group of objects discovered orbiting another planet. Ganymede orbits Jupiter in roughly seven days and is in a 1:2:4 orbital resonance with the moons Europa and Io, respectively. Ganymede has a diameter of 5,268 km (3,273 mi), 8 % larger than the planet Mercury, but its mass is only 45 % that of Mercury    
            """
        }]
        ganymede = Corp(
            solar_system_id = self.id,
            name = "Ganymede",
            corp_type_id = 4,
            parent_corp_id = jupiter_id,
            mass = 1.4819*10**23,
            initial_speed = json.dumps([13057.2 + 10880, 0, 0]),
            rotation =  json.dumps([ 0, 0, 0]),
            radius = 2634.1 * 1000,
            initial_position = json.dumps([ 0, 0, 5.2033 + 0.00715508021]),
            texture_path = "../../static/img/ganymede.jpg",
            atmosphere_path = "../../static/img/atm1.png",
            atmosphere_color = json.dumps([217, 221, 222]),
            atmosphere_size = 3,
            media_en = json.dumps(media).encode('utf8'),
            media_fr = json.dumps(media).encode('utf8'),
            manually_generated = True
        )
        self.db_session.add(ganymede)
        media = [{
            'title': 'Callisto',
            'credits': {
                'name': 'Venus (Wikipedia)',
                'href': 'https://en.wikipedia.org/wiki/Sun'
            },
            'image_path': 'http://www.black-cat-studios.com/sevenwonders/Ice_Spires_of_Callisto/IMAG000.JPG',
            'text': """
                Callisto /kəˈlɪstoʊ/[8] (Jupiter IV) is the second-largest moon of Jupiter, after Ganymede. It is the third-largest moon in the Solar System and the largest object in the Solar System not to be properly differentiated. Callisto was discovered in 1610 by Galileo Galilei. At 4821 km in diameter, Callisto has about 99% the diameter of the planet Mercury but only about a third of its mass. It is the fourth Galilean moon of Jupiter by distance, with an orbital radius of about 1883000 km.[2] It is not in an orbital resonance like the three other Galilean satellites—Io, Europa, and Ganymede—and is thus not appreciably tidally heated
                """
        }]
        callisto = Corp(
            solar_system_id = self.id,
            name = "Callisto",
            corp_type_id = 4,
            parent_corp_id = jupiter_id,
            mass = 1.075938*10**23,
            initial_speed = json.dumps([13057.2 + 8204, 0, 0]),
            rotation =  json.dumps([ 0, 0, 0]),
            radius = 2410.3 * 1000,
            initial_position = json.dumps([ 0, 0, 5.2033 + 0.01258489304]),
            texture_path = "../../static/img/callisto.jpg",
            atmosphere_path = "../../static/img/atm1.png",
            atmosphere_color = json.dumps([189, 199, 181]),
            atmosphere_size = 3,
            media_en = json.dumps(media).encode('utf8'),
            media_fr = json.dumps(media).encode('utf8'),
            manually_generated = True
        )
        self.db_session.add(callisto)
        return [jupiter, io, europa, ganymede, callisto]

    def saturn(self):
        media = [{
            'title': 'The solar system beauty',
            'credits': {
                'name': 'Venus (Wikipedia)',
                'href': 'https://en.wikipedia.org/wiki/Sun'
            },
            'image_path': 'http://eoimages.gsfc.nasa.gov/images/imagerecords/7000/7314/saturn_cas_lrg.jpg',
            'text': """
                Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is a gas giant with an average radius about nine times that of Earth.[10][11] Although only one-eighth the average density of Earth, with its larger volume Saturn is just over 95 times more massive.[12][13][14] Saturn is named after the Roman god of agriculture; its astronomical symbol (♄) represents the god's sickle.    
            """
        }]
        saturn = Corp(
            solar_system_id = self.id,
            name = "Saturn",
            corp_type_id = 2,
            mass = 568.46*10**24,
            initial_speed = json.dumps([9644.6, 0, 0]),
            rotation =  json.dumps([ 0, -0.001, 0]),
            rotation_period = 10.66,
            radius = 54359000,
            initial_position = json.dumps([ 0, 0, 9.537]),
            texture_path = "../../static/img/saturn3.jpg",
            atmosphere_path = "../../static/img/atm1.png",
            atmosphere_color = json.dumps([219, 212, 234]),
            atmosphere_size = 0,
            manually_generated = True,
            ring_path = "../../static/img/saturnring3.png",
            ring_size = 75,
            media_en = json.dumps(media).encode('utf8'),
            media_fr = json.dumps(media).encode('utf8'),
            ring_rotation = json.dumps([9*math.pi/16, 0, 0])
        )
        self.db_session.add(saturn)
        return [saturn]

    def uranus(self):
        media = [{
            'title': 'Uranus',
            'credits': {
                'name': 'Venus (Wikipedia)',
                'href': 'https://en.wikipedia.org/wiki/Sun'
            },
            'image_path': 'http://vignette1.wikia.nocookie.net/masseffect/images/e/ec/Uranus.png/revision/latest?cb=20140921175827',
            'text': """
                Uranus is the seventh planet from the Sun. It has the third-largest planetary radius and fourth-largest planetary mass in the Solar System. Uranus is similar in composition to Neptune, and both have different bulk chemical composition from that of the larger gas giants Jupiter and Saturn. For this reason, scientists often classify Uranus and Neptune as "ice giants" to distinguish them from the gas giants
                """
        }]
        uranus = Corp(
            solar_system_id = self.id,
            name = "Uranus",
            corp_type_id = 2,
            mass = 8.6810*10**25,
            initial_speed = json.dumps([6800, 0, 0]),
            rotation =  json.dumps([ 0, -0.001, 0]),
            rotation_period = 16.8,
            radius = 25559000,
            initial_position = json.dumps([ 0, 0, 19.19]),
            texture_path = "../../static/img/uranus3.jpg",
            atmosphere_path = "../../static/img/atm1.png",
            atmosphere_color = json.dumps([22, 191, 247]),
            atmosphere_size = 0,
            manually_generated = True,
            ring_path = "../../static/img/uranusRing.png",
            ring_size = 25,
            media_en = json.dumps(media).encode('utf8'),
            media_fr = json.dumps(media).encode('utf8'),
            ring_rotation = json.dumps([9*math.pi/16, 0, 0])
        )
        self.db_session.add(uranus)
        return [uranus]

    def neptune(self):
        media = [{
            'title': 'Neptune',
            'credits': {
                'name': 'Venus (Wikipedia)',
                'href': 'https://en.wikipedia.org/wiki/Sun'
            },
            'image_path': 'http://i.kinja-img.com/gawker-media/image/upload/s--ybSujDW7--/18lqrnoewdmztjpg.jpg',
            'text': """
                eptune is the eighth and farthest known planet from the Sun in the Solar System. It is the fourth-largest planet by diameter and the third-largest by mass. Among the giant planets in the Solar System, Neptune is the most dense. Neptune is 17 times the mass of Earth and is slightly more massive than its near-twin Uranus, which is 15 times the mass of Earth and slightly larger than Neptune.    
            """
        }]
        neptune = Corp(
            solar_system_id = self.id,
            name = "Neptune",
            corp_type_id = 2,
            mass = 102.43*10**24,
            initial_speed = json.dumps([5431.7, 0, 0]),
            rotation =  json.dumps([ 0, -0.001, 0]),
            rotation_period = 6*24 + 9.30,
            radius = 24622000,
            initial_position = json.dumps([ 0, 0, 30.104]),
            texture_path = "../../static/img/neptune.jpg",
            atmosphere_path = "../../static/img/atm1.png",
            atmosphere_color = json.dumps([98, 98, 217]),
            atmosphere_size = 2,
            media_en = json.dumps(media).encode('utf8'),
            media_fr = json.dumps(media).encode('utf8'),
            manually_generated = True
        )
        self.db_session.add(neptune)
        return [neptune]

    def pluto(self):
        media = [{
            'title': 'Pluto',
            'credits': {
                'name': 'Venus (Wikipedia)',
                'href': 'https://en.wikipedia.org/wiki/Sun'
            },
            'image_path': 'http://www.universetoday.com/wp-content/uploads/2008/05/pluto_surface2-580x311.jpg',
            'text': """
                Pluto (minor-planet designation: 134340 Pluto) is a dwarf planet in the Kuiper belt, a ring of bodies beyond Neptune. It was the first Kuiper belt object to be discovered. It is the largest and second-most-massive known dwarf planet in the Solar System and the ninth-largest and tenth-most-massive known object directly orbiting the Sun    
            """
        }]
        pluto = Corp(
            solar_system_id = self.id,
            name = "Pluto",
            corp_type_id = 3,
            mass = 1.314*10**22,
            initial_speed = json.dumps([4740, 0, 0]),
            rotation =  json.dumps([ 0, -0.001, 0]),
            rotation_period = 6.387 * 24,
            radius = 1185,
            initial_position = json.dumps([ 0, 0, 39.445]),
            texture_path = "../../static/img/pluto.png",
            atmosphere_path = "../../static/img/atm1.png",
            atmosphere_color = json.dumps([232, 227, 169]),
            atmosphere_size = 1,
            media_en = json.dumps(media).encode('utf8'),
            media_fr = json.dumps(media).encode('utf8'),
            manually_generated = True
        )
        self.db_session.add(pluto)
        return [pluto]