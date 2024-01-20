import { GetUserDataController } from '../controllers/GetUserDataController';

export const makeGetUserDataController = (): GetUserDataController => {
    return new GetUserDataController();
}