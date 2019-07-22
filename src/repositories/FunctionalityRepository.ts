import { EntityRepository, Repository } from "typeorm";
import Functionality from "../entities/Functionality";

@EntityRepository(Functionality)
export default class FunctionalityRepository extends Repository<Functionality> {

}
