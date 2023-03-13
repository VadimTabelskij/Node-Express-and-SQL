import config from 'config';
import { RequestHandler } from 'express';
import { cars } from 'cars/data';
import { CarsModel } from 'cars/types';
import mysql from 'mysql2/promise';

const getCars: RequestHandler<
{},
CarsModel[],
undefined,
{}
> = async (req, res) => {
  const connection = await mysql.createConnection(config.database);

  const [queryResult] = await connection.query(`
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
  json_arrayagg(i.src) as images
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
join car_image as ci
on cr.carId = ci.carId
join image as i
on ci.imageId = i.imageId
group by cr.carId
  `);

  console.log(queryResult);

  connection.end();

  res.json(cars);
};

export default getCars;
