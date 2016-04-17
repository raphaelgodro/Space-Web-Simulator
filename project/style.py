def radius_meter_to_pixel(radius):
    radius = int(radius)
    return ((4*10**(-8))*radius + 6)/2

def atmosphere_thickness(radius, atmosphere_level):
    #max on %100 of the radius which is the max value
    initRadius = 2 * radius
    maxAtmLevel = 6.40
    return float(initRadius + initRadius * maxAtmLevel * (0.01*atmosphere_level))

def ring_dimension(radius, ring_dimension):
    #max on %100 of the radius which is the max value
    initRadius = 2 * radius
    maxRingLevel = 1.8
    return float(initRadius + initRadius * maxRingLevel * (0.01*ring_dimension))

