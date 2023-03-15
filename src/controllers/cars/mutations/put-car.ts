import { RequestHandler } from 'express';
import ServerSetupError from 'errors/server-setup-error';
import handleRequestError from 'helpers/handle-request-error';
import CarNotFoundError from 'controllers/cars/car-not-found-error';
import { CarViewModel, CarDataBody } from 'controllers/cars/types';
import carDataValidationSchema from 'controllers/cars/validation-schemas/car-data-validation-schema';

const putCar: RequestHandler<
  { id?: string },
  CarViewModel | ErrorResponse,
  CarDataBody,
  {}
> = (req, res) => {
  const { id } = req.params;

  try {
    if (id === undefined) throw new ServerSetupError();
    const carsData = carDataValidationSchema.validateSync(req.body);

    const foundCarIndex = cars.findIndex((car) => String(car.id) === id);

    if (foundCarIndex === -1) throw new CarNotFoundError(id);

    const updateCar = { id: cars[foundCarIndex].id, ...carsData };

    cars.splice(foundCarIndex, 1, updateCar);

    res.status(200).json(updateCar);
  } catch (err) {
    handleRequestError(err, res);
  }
};

export default putCar;