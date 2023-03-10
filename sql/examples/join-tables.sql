select 
  cr.carId as id,
  cr.address,
    json_object(
    'id', u.userId,
    'name', u.name,
    'surname', u.surname,
    'email', u.email,
    'phone', u.phone
  )  as person, 
  json_object(
    'city', c.title,
    'country', cn.title
  ) as location,
  json_object(
    'brand', b.title,
    'model', m.title
  ) as type,
  cr.style,
  cr.year,
  if(count(i.imageId) = 0, json_array(), json_arrayagg(i.src)) as images
from car as cr
join user as u
on cr.userId = u.userId
join city as c
on cr.cityId = c.cityId
join country as cn
on c.countryId = cn.countryId 
join brand as b
on cr.brandId = b.brandId
join model as m
on b.modelId = m.modelId 
left join car_image as ci
on cr.carId = ci.carId
left join image as i
on ci.imageId = i.imageId
group by cr.carId;